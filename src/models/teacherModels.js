const prisma = require("../configs/prisma");

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
                    studentId: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                    phone: true,
                    gender: true,
                    status: true,
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

    const genderCount = {
        male: 0,
        female: 0
    };

    let totalStudents = 0;

    students.forEach(teacher => {
        totalStudents += teacher.student.length;
        teacher.student.forEach(student => {
            if (student.gender === 'MALE') {
                genderCount.male += 1;
            } else if (student.gender === 'FEMALE') {
                genderCount.female += 1;
            }
        });
    });

    const statusCount = {
        active: 0,
        inactive: 0,
        graduated: 0
    };


    students.forEach(teacher => {
        teacher.student.forEach(student => {
            if (student.status === 'ACTIVE') {
                statusCount.active += 1;
            } else if (student.gender === 'INACTIVE') {
                statusCount.inactive += 1;
            } else {
                statusCount.graduated += 1;
            }
        });
    });

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
            courseCode: true,
            courseName: true,
            section: true,
            enrollments: {
                select: {
                    id: true,
                    status: true,
                    registrationDate: true,
                    semester: true,
                    student: {
                        select: {
                            studentId: true,
                            email: true,
                            firstName: true,
                            lastName: true,
                            phone: true
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
    return prisma.announcement.create({
        data: {
            teacherId: Number(teacherId),
            title,
            content,
            courseId: Number(courseId)
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