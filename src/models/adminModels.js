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
            studentId: studentId
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

module.exports = adminModels;