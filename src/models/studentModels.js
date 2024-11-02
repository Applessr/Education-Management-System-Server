const prisma = require("../configs/prisma");

const studentModels = {};

studentModels.studentProfile = async (userId) => {
    return await prisma.student.findUnique({
        where: {
            id: Number(userId)
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
studentModels.getNotification = async (userId) => {
    return await prisma.enrollment.findMany({
        where: {
            studentId: Number(userId),
            status: 'APPROVED' 
        },
        select: {
            course: {
                select: {
                    courseCode: true,
                    courseName: true,
                    teacher: {
                        select: {
                            email: true,
                            firstName: true,
                            lastName: true
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
                    announcements: { 
                        select: {
                            title: true,
                            content: true,
                            createdAt: true
                        }
                    }
                }
            }
        }
    });
};
studentModels.changePassword = async (userId, newPassword) => {
    return await prisma.student.update({
        where: { id: userId },
        data: {
            password: newPassword.password,
        },
    });
};
studentModels.sendRequestChange = async (userId, fieldToChange, newValue) => {
    return prisma.infoChangeRequest.create({
        data: {
            studentId: Number(userId),
            fieldToChange,
            newValue
        }
    })
};

module.exports = studentModels;