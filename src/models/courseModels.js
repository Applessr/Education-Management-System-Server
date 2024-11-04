const prisma = require("../configs/prisma");
const createError = require("../utils/create-error");


const courseModels = {};
courseModels.getAllCourse = async (searchTerm, semester) => {
    const isNumericSearchTerm = !isNaN(parseInt(searchTerm));
    const query = searchTerm ? {
        where: {
            OR: [
                {
                    courseName: {
                        contains: searchTerm,
                    }
                },
                ...(isNumericSearchTerm ? [{
                    courseCode: {
                        equals: parseInt(searchTerm)
                    }
                }] : [])
            ]
        }
    } : {};

    return await prisma.course.findMany({
        ...query,
        select: {
            id: true,
            courseCode: true,
            courseName: true,
            credits: true,
            section: true,
            status: true,
            seat: true,
            teacher: {
                select: {
                    firstName: true,
                    lastName: true,
                    email: true,
                    phone: true
                }
            },
            major: {
                select: {
                    name: true,
                    faculty: {
                        select: {
                            name: true
                        }
                    }
                }
            },
            classSchedules: {
                select: {
                    day: true,
                    startTime: true,
                    endTime: true,
                    room: true
                }
            },
            _count: {
                select: {
                    enrollments: {
                        where: {
                            status: {
                                not: 'CANCELLED'
                            },
                            ...(semester ? { semester: semester } : {})
                        }
                    }
                }
            },
            enrollments: {
                where: {
                    status: 'APPROVED',
                    ...(semester ? { semester: semester } : {})
                },
                select: {
                    id: true,
                    status: true
                }
            }
        }
    });
};
courseModels.getCourseById = async (courseId) => {
    return await prisma.course.findMany({
        where: {
            id: Number(courseId),
        },
        select: {
            id: true,
            courseCode: true,
            courseName: true,
            credits: true,
            section: true,
            status: true,
            teacher: {
                select: {
                    firstName: true,
                    lastName: true,
                    email: true,
                    phone: true
                }
            },
            major: {
                select: {
                    name: true,
                    faculty: {
                        select: {
                            name: true
                        }
                    }
                }
            },
            classSchedules: {
                select: {
                    day: true,
                    startTime: true,
                    endTime: true,
                    room: true
                }
            }
        }
    });
};
courseModels.getCourseByCode = async (courseCode) => {
    return await prisma.course.getCourseByCode({
        where: {
            courseCode: Number(courseCode),
        },
    });
};
courseModels.findCourseByCode = async (courseCode, section) => {
    return await prisma.course.findFirst({
        where: {
            courseCode,
            section
        },
    });
};
courseModels.createCourse = async (courseCode, courseName, credits, seat, section, teacherId, courseSyllabusId, majorId) => {
    return await prisma.course.create({
        data: {
            courseCode,
            courseName,
            credits,
            seat,
            section,
            teacherId,
            courseSyllabusId,
            majorId
        },
    });
};
courseModels.editCourse = async (courseId, updateCourseInfo) => {
    return await prisma.course.update({
        where: {
            id: Number(courseId)
        },
        data: {
            courseCode: updateCourseInfo.courseCode,
            courseName: updateCourseInfo.courseName,
            credits: updateCourseInfo.credits,
            seat: updateCourseInfo.seat,
            section: updateCourseInfo.section,
            teacherId: updateCourseInfo.teacherId,
            courseSyllabusId: updateCourseInfo.courseSyllabusId,
        },
    });
};
courseModels.inactiveCourse = async (courseId) => {
    return await prisma.course.update({
        where: {
            id: Number(courseId)
        },
        data: {
            status: false
        },
    });
};
courseModels.activeCourse = async (courseId) => {
    return await prisma.course.update({
        where: {
            id: Number(courseId)
        },
        data: {
            status: true
        },
    });
};
courseModels.studentGetCourseSyllabus = async (studentId) => {
    return await prisma.student.findUnique({
        where: {
            id: studentId
        },
        select: {
            id: true,
            studentId: true,
            email: true,
            firstName: true,
            lastName: true,
            major: {
                select: {
                    id: true,
                    name: true,
                    faculty: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    courseRecommendation: {
                        select: {
                            id: true,
                            year: true,
                            recommendationType: true,
                            course: {
                                select: {
                                    id: true,
                                    courseCode: true,
                                    courseName: true,
                                    credits: true,
                                }
                            }
                        }
                    }
                }
            }
        }
    });
};
courseModels.studentGetEnrollCourse = async (studentId) => {
    return await prisma.student.findUnique({
        where: {
            id: Number(studentId)
        },
        select: {
            id: true,
            studentId: true,
            email: true,
            firstName: true,
            lastName: true,
            enrollments: {
                select: {
                    id: true,
                    status: true,
                    registrationDate: true,
                    semester: true,
                    course: {
                        select: {
                            id: true,
                            courseCode: true,
                            courseName: true,
                            credits: true,
                            section: true
                        }
                    }
                }
            }
        }
    });
};
courseModels.studentGetEnrollCourseBySemester = async (studentId, semester) => {
    return await prisma.student.findUnique({
        where: {
            id: Number(studentId)
        },
        select: {
            id: true,
            studentId: true,
            email: true,
            firstName: true,
            lastName: true,
            enrollments: {
                where: {
                    semester: semester
                },
                select: {
                    id: true,
                    status: true,
                    registrationDate: true,
                    course: {
                        select: {
                            id: true,
                            courseCode: true,
                            courseName: true,
                            credits: true,
                            section: true
                        }
                    }
                }
            }
        }
    });
};
courseModels.studentGetClassScheduleBySemester = async (studentId, semester) => {
    return await prisma.enrollment.findMany({
        where: {
            studentId: studentId,
            semester: semester,
            status: 'APPROVED',
        },
        include: {
            course: {
                include: {
                    classSchedules: true,
                },
            },
        },
    });
};
courseModels.studentCreateEnroll = async (studentId, semester, courseId) => {

    const prerequisites = await prisma.conditionCourse.findMany({
        where: { courseId },
        select: { courses: true },
    });

    if (prerequisites.length > 0) {

        const prerequisiteCourseIds = prerequisites.map((prerequisite) => prerequisite.courses.id);
        const completedPrerequisites = await prisma.grade.findMany({
            where: {
                studentId: Number(studentId),
                courseId: { in: prerequisiteCourseIds },
                letterGrade: { not: 'F' },
            },
        });

        if (completedPrerequisites.length !== prerequisites.length) {
            return createError(400, 'Prerequisite courses have not been completed, or a prerequisite course has a grade of F. ')
        }
    }


    return await prisma.enrollment.create({
        data: {
            studentId: Number(studentId),
            semester,
            courseId: Number(courseId),
        },
    });
};
courseModels.studentCancelEnroll = async (enrollmentId) => {
    return await prisma.enrollment.update({
        where: {
            id: Number(enrollmentId),
        },
        data: {
            status: "CANCELLED"
        }
    });
};

module.exports = courseModels;