const prisma = require("../configs/prisma");

const adminModels = {};

adminModels.findEmail = async (email) => {
    return await prisma.employee.findUnique({
        where: {
            email: email,
        },
    });
};
adminModels.findEmployeeByID = async (userId) => {
    return await prisma.employee.findUnique({
        where: {
            id: Number(userId),
        },
    });
};
adminModels.overAll = async () => {
    const teacher = await prisma.employee.count({
        where: {
            employeeRole: 'TEACHER'
        }
    });

    const faculty = await prisma.faculty.count({});

    const teacherFaculty = await prisma.faculty.findMany({
        select: {
            id: true,
            name: true,
            majors: {
                select: {
                    employee: {
                        where: {
                            employeeRole: "TEACHER"
                        },
                        select: {
                            id: true
                        }
                    }
                }
            }
        }
    });

    const facultyTeacherCount = teacherFaculty.map(faculty => ({
        facultyId: faculty.id,
        facultyName: faculty.name,
        teacherCount: faculty.majors.reduce((sum, major) => sum + (major.employee ? major.employee.length : 0), 0)
    }));

    const major = await prisma.major.count({});

    const uniqueCourses = await prisma.course.findMany({
        distinct: ['courseCode'],
        select: {
            courseCode: true
        }
    });

    const subject = uniqueCourses.length;

    const student = await prisma.student.count({
        where: {
            status: 'ACTIVE'
        }
    });

    const maleStudent = await prisma.student.count({
        where: {
            gender: 'MALE'
        }
    });

    const femaleStudent = await prisma.student.count({
        where: {
            gender: 'FEMALE'
        }
    });

    return {
        teacher,
        faculty,
        major,
        subject,
        student,
        maleStudent,
        femaleStudent,
        facultyTeacherCount,
    };
};
adminModels.courseSyllabus = async (majorId) => {
    const courseSyllabus = await prisma.major.findUnique({
        where: {
            id: Number(majorId),
        },
        select: {
            id: true,
            name: true,
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
    });

    if (!courseSyllabus || !courseSyllabus.courseRecommendation) {
        return null;
    }

    const sortedRecommendations = courseSyllabus.courseRecommendation.sort((a, b) => a.id - b.id);
    const coursesGroupedByYear = {};
    const uniqueCourses = new Map();

    sortedRecommendations.forEach(rec => {
        rec.course.forEach(course => {
            if (!uniqueCourses.has(course.courseCode)) {
                uniqueCourses.set(course.courseCode, {
                    ...course,
                    recommendationType: rec.recommendationType
                });

                if (!coursesGroupedByYear[rec.year]) {
                    coursesGroupedByYear[rec.year] = {
                        PREREQUISITES: [],
                        OPTIONAL: [],
                        SELECTION: []
                    };
                }

                if (rec.recommendationType === 'PREREQUISITES') {
                    coursesGroupedByYear[rec.year].PREREQUISITES.push(uniqueCourses.get(course.courseCode));
                } else if (rec.recommendationType === 'OPTIONAL') {
                    coursesGroupedByYear[rec.year].OPTIONAL.push(uniqueCourses.get(course.courseCode));
                } else if (rec.recommendationType === 'SELECTION') {
                    coursesGroupedByYear[rec.year].SELECTION.push(uniqueCourses.get(course.courseCode));
                }
            }
        });
    });

    return {
        major: {
            id: courseSyllabus.id,
            name: courseSyllabus.name,
            courseRecommendation: coursesGroupedByYear
        }
    };
};
adminModels.findPhone = async (phone) => {
    return await prisma.employee.findUnique({
        where: {
            phone: phone,
        },
    });
};
adminModels.createEmployee = async (data) => {
    return await prisma.employee.create({
        data,
    });
};

adminModels.findStudentId = async (studentId) => {
    return await prisma.student.findUnique({
        where: {
            id: Number(studentId)
        }
    })
};
adminModels.findStudentCode = async (studentCode) => {
    return await prisma.student.findUnique({
        where: {
            studentId: studentCode
        }
    })
};
adminModels.findStudentEmail = async (email) => {
    return await prisma.student.findUnique({
        where: {
            email: email
        }
    })
};
adminModels.findStudentPhone = async (phone) => {
    return await prisma.student.findUnique({
        where: {
            phone: phone
        }
    })
};
adminModels.createStudent = async (data) => {
    return await prisma.student.create({
        data,
    });
};
adminModels.getAllStudent = async () => {
    return await prisma.student.findMany({
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
adminModels.getAllEmployee = async () => {
    return await prisma.employee.findMany({});
};
adminModels.getRequestInfo = async () => {
    return await prisma.infoChangeRequest.findMany({
        include: {
            student: {
                select: {
                    firstName: true,
                    lastName: true,
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
            employee: {
                select: {
                    email: true,
                    firstName: true,
                    lastName: true,
                    employeeRole: true
                }
            }
        }
    });
};
adminModels.getRequestInfoById = async (requestId) => {
    return await prisma.infoChangeRequest.findUnique({
        where: {
            id: Number(requestId)
        }, include: {
            student: {
                select: {
                    firstName: true,
                    lastName: true,
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
            employee: {
                select: {
                    email: true,
                    firstName: true,
                    lastName: true,
                    employeeRole: true
                }
            }
        }
    });
};
adminModels.changeStudentStatus = async (studentId, status) => {
    return await prisma.student.update({
        where: {
            id: Number(studentId),
        },
        data: {
            status: status
        }
    });
};
adminModels.changeStudentInfo = async (studentId, updatedData) => {
    return await prisma.student.update({
        where: {
            id: Number(studentId)
        },
        data: {
            firstName: updatedData.firstName,
            lastName: updatedData.lastName,
            phone: updatedData.phone,
            address: updatedData.address,
        },
    });
};
adminModels.changeEmployeeInfo = async (employeeId, updatedData) => {
    return await prisma.employee.update({
        where: {
            id: Number(employeeId)
        },
        data: {
            firstName: updatedData.firstName,
            lastName: updatedData.lastName,
            phone: updatedData.phone
        },
    });
};
adminModels.inactiveEmployee = async (employeeId) => {
    return await prisma.employee.update({
        where: {
            id: employeeId,
        },
        data: {
            active: false
        }
    });
};
adminModels.activeEmployee = async (employeeId) => {
    return await prisma.employee.update({
        where: {
            id: employeeId,
        },
        data: {
            active: true
        }
    });
};

module.exports = adminModels;