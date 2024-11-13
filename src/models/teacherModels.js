const prisma = require("../configs/prisma");
const createError = require("../utils/create-error");
const gradeModels = require("./gradeModels");

const teacherModels = {};

teacherModels.teacherProfile = async (teacherId) => {
    return await prisma.employee.findUnique({
        where: {
            id: Number(teacherId)
        },
        include: {
            major: {
                include: {
                    faculty: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    });
};
teacherModels.changePassword = async (teacherId, newPassword) => {
    return await prisma.employee.update({
        where: {
            id: Number(teacherId)
        },
        data: {
            password: newPassword.password,
        },
    });
};
teacherModels.getStudentInCourse = async (teacherId) => {
    return await prisma.employee.findUnique({
        where: {
            id: Number(teacherId),
        },
        select: {
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
            courses: {
                select: {
                    courseCode: true,
                    courseName: true,
                    enrollments: {
                        where: {
                            status: 'APPROVED'
                        },
                        select: {
                            student: {
                                select: {
                                    studentId: true,
                                    email: true,
                                    firstName: true,
                                    lastName: true,
                                    phone: true,
                                    major: {
                                        select: {
                                            name: true,
                                            faculty: {
                                                select: {
                                                    name: true
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    });
};
teacherModels.getStudentInCourseById = async (teacherId, courseId) => {
    return await prisma.course.findUnique({
        where: {
            id: Number(courseId),
        },
        select: {
            id: true,
            courseCode: true,
            courseName: true,
            section: true,
            teacher: {
                where: {
                    id: Number(teacherId),
                },
                select: {
                    firstName: true,
                    lastName: true
                }
            },
            classSchedules: {
                select: {
                    day: true,
                    startTime: true,
                    endTime: true,
                    room: true,
                },
            },
            enrollments: {
                where: {
                    status: "APPROVED",
                },
                select: {
                    student: {
                        select: {
                            studentId: true,
                            email: true,
                            firstName: true,
                            lastName: true,
                            phone: true,
                            grades: {
                                select: {
                                    totalPoint: true,
                                },
                            },
                            major: {
                                select: {
                                    name: true,
                                    faculty: {
                                        select: {
                                            name: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    });
};
teacherModels.getConsultedStudent = async (teacherId) => {
    const students = await prisma.employee.findMany({
        where: {
            id: Number(teacherId)
        },
        select: {
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
            student: {
                select: {
                    id: true,
                    studentId: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                    phone: true,
                    gender: true,
                    status: true,
                    enrollments: {
                        where: {
                            status: "APPROVED",
                        },
                        select: {
                            id: true,
                            semester: true,
                        },
                        distinct: ['semester'],
                    },
                    major: {
                        select: {
                            name: true,
                            faculty: {
                                select: {
                                    name: true
                                },
                            },
                        },
                    },
                },
            },
        },
    });

    let totalGradePoints = 0;
    let totalCredits = 0;

    const genderCount = {
        male: 0,
        female: 0
    };

    let totalStudents = 0;

    const statusCount = {
        active: 0,
        inactive: 0,
        graduated: 0
    };

    for (const teacher of students) {
        for (const student of teacher.student) {
            try {
                const averageGPA = await gradeModels.studentGetAllGPA(student.id);
                student.averageGPA = averageGPA;
                console.log('averageGPA :>> ', averageGPA);

                if (student.gender === 'MALE') {
                    genderCount.male += 1;
                } else if (student.gender === 'FEMALE') {
                    genderCount.female += 1;
                }

                if (student.status === 'ACTIVE') {
                    statusCount.active += 1;
                } else if (student.status === 'INACTIVE') {
                    statusCount.inactive += 1;
                } else {
                    statusCount.graduated += 1;
                }

                totalStudents++;
            } catch (error) {
                console.error('Error fetching GPA for student', student.studentId, error);
            }
        }
    }

    return {
        students,
        genderCount,
        totalStudents,
        statusCount,
    };
};
teacherModels.getEnrollRequest = async (teacherId) => {
    return await prisma.course.findMany({
        where: {
            teacherId: teacherId
        },
        select: {
            id: true,
            section: true,
            courseCode: true,
            courseName: true,
            section: true,
            enrollments: {
                where: {
                    status: 'PENDING'
                },
                select: {
                    id: true,
                    status: true,
                    registrationDate: true,
                    semester: true,
                    student: {
                        select: {
                            id: true,
                            studentId: true,
                            email: true,
                            firstName: true,
                            lastName: true,
                            phone: true,
                            major: {
                                select: {
                                    name: true,
                                    faculty: {
                                        select: {
                                            name: true
                                        }
                                    }
                                }
                            }
                        },
                    },
                },
            },
        },
    });
};
teacherModels.getSectionRequest = async (teacherId) => {
    return await prisma.employee.findMany({
        where: {
            id: Number(teacherId)
        },
        select: {
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
            sectionChangeRequest: {
                select: {
                    id: true,
                    requestedAt: true,
                    status: true,
                    currentSection: true,
                    newSection: true,
                    student: {
                        select: {
                            id: true,
                            studentId: true,
                            email: true,
                            firstName: true,
                            lastName: true,
                            phone: true,
                            major: {
                                select: {
                                    name: true,
                                    faculty: {
                                        select: {
                                            name: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    course: {
                        select: {
                            courseCode: true,
                            courseName: true,
                            credits: true,
                            seat: true,
                            section: true,
                            major: {
                                select: {
                                    name: true,
                                    faculty: {
                                        select: {
                                            name: true
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    });
};
teacherModels.sendRequestChange = async (teacherId, fieldToChange, newValue) => {
    return prisma.infoChangeRequest.create({
        data: {
            employeeId: Number(teacherId),
            fieldToChange,
            newValue
        }
    });
};
teacherModels.sendAnnounce = async (teacherId, title, content, courseId) => {
    const announcement = await prisma.announcement.create({
        data: {
            teacherId: Number(teacherId),
            title,
            content,
            courseId: courseId,
        },
    });

    if (!announcement) {
        throw createError(400, 'Failed to create announcement');
    }

    return announcement;
};
teacherModels.checkAnnouncementSent = async (courseId) => {
    return await prisma.announcement.findMany({
        where: {
            courseId: courseId
        }
    });
};
teacherModels.editEnrollStatus = async (enrollmentId, status) => {
    return await prisma.enrollment.update({
        where: {
            id: Number(enrollmentId)
        },
        data: {
            status,
        },
    });
};
teacherModels.editRequestSection = async (requestId, status) => {
    return await prisma.sectionChangeRequest.update({
        where: {
            id: Number(requestId)
        },
        data: {
            status,
        },
    });
};
teacherModels.findEnroll = async (enrollmentId) => {
    return await prisma.enrollment.findUnique({
        where: {
            id: Number(enrollmentId),
        },
        include: {
            course: true,
            student: true,
        },
    });
};
teacherModels.editStudentSection = async (enrollmentId, courseId) => {
    return await prisma.enrollment.update({
        where: {
            id: Number(enrollmentId)
        },
        data: {
            courseId: Number(courseId),
        },
    });
};
module.exports = teacherModels;