const prisma = require("../configs/prisma");


const courseModels = {};
courseModels.getAllCourse = async (searchTerm) => {

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
            }
        }
    });
};
courseModels.getCourseById = async (courseId) => {
    return await prisma.course.findMany({
        where: {
            id: Number(courseId),
        },
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
            studentId: true,
            email: true,
            firstName: true,
            lastName: true,
            major: {
                select: {
                    name: true,
                    faculty: {
                        select: {
                            name: true
                        }
                    },
                    courseRecommendation: {
                        select: {
                            year: true,
                            recommendationType: true,
                            course: {
                                select: {
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



module.exports = courseModels;