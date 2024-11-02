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
    return await prisma.employee.findMany({
        where: {
            id: Number(teacherId)
        },
        select: {
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
            courses: {
                select: {
                    enrollments: {
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
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },

                }
            }
        }
    });
};
teacherModels.getConsultedStudent = async (teacherId) => {
    return await prisma.employee.findMany({
        where: {
            id: Number(teacherId)
        },
        select: {
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
            Student: {
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
                                }
                            }
                        }
                    }
                }
            }
        }
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
            SectionChangeRequest: {
                select: {
                    requestedAt: true,
                    status: true,
                    currentSection: true,
                    newSection: true,
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
                                        }
                                    }
                                }
                            }
                        },
                    }
                }
            }
        }
    });
};
teacherModels.sendRequestChange = async (teacherId, fieldToChange, newValue) => {
    return prisma.infoChangeRequest.create({
        data: {
            employeeId: Number(teacherId),
            fieldToChange,
            newValue
        }
    })
}
teacherModels.sendAnnounce = async (teacherId, title, content, courseId) => {
    return prisma.announcement.create({
        data: {
            teacherId: Number(teacherId),
            title,
            content,
            courseId: Number(courseId)
        }
    })
}
module.exports = teacherModels;