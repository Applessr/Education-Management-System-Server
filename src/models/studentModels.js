const prisma = require("../configs/prisma");

const studentModels = {};

studentModels.getCredit = async (studentId) => {
    const approvedEnrollments = await prisma.enrollment.findMany({
        where: {
            studentId: Number(studentId),
            status: 'APPROVED',
        },
        include: {
            course: {
                include: {
                    major: {
                        include: {
                            courseRecommendation: {
                                include: {
                                    course: true,  // ดึงข้อมูล course มาด้วย
                                },
                            },
                        },
                    },
                },
            },
        },
    });

    const currentCredit = approvedEnrollments.reduce((total, enrollment) => {
        if (enrollment.grade !== 'F') {
            return total + enrollment.course.credits;
        }
        return total;
    }, 0);

    const totalRequiredCredits = 72;
    const totalOptionalCredits = 48;
    const totalSelectionCredits = 24;

    const enrolledRequiredCredits = approvedEnrollments.reduce((total, enrollment) => {
        const recommendationType = enrollment.course.major.courseRecommendation?.find(rec => 
            rec.course && rec.course.some(course => course.id === enrollment.course.id)
        )?.recommendationType;

        if (enrollment.grade !== 'F' && recommendationType === 'PREREQUISITES') {
            return total + enrollment.course.credits;
        }
        return total;
    }, 0);

    const enrolledElectiveCredits = approvedEnrollments.reduce((total, enrollment) => {
        const recommendationType = enrollment.course.major.courseRecommendation?.find(rec => 
            rec.course && rec.course.some(course => course.id === enrollment.course.id)
        )?.recommendationType;

        if (enrollment.grade !== 'F' && recommendationType === 'OPTIONAL') {
            return total + enrollment.course.credits;
        }
        return total;
    }, 0);

    const enrolledSelectionCredits = approvedEnrollments.reduce((total, enrollment) => {
        const recommendationType = enrollment.course.major.courseRecommendation?.find(rec => 
            rec.course && rec.course.some(course => course.id === enrollment.course.id)
        )?.recommendationType;

        if (enrollment.grade !== 'F' && recommendationType === 'SELECTION') {
            return total + enrollment.course.credits;
        }
        return total;
    }, 0);

    const totalCredit = totalRequiredCredits + totalOptionalCredits + totalSelectionCredits;

    return {
        currentCredit,
        totalRequiredCredits,
        totalOptionalCredits,
        totalSelectionCredits,
        totalCredit,
        enrolledRequiredCredits,
        enrolledElectiveCredits,
        enrolledSelectionCredits,
    };
};

studentModels.studentProfile = async (userId) => {
    return await prisma.student.findUnique({
        where: {
            id: Number(userId)
        },
        include: {
            adviser: {
                select: {
                    firstName: true,
                    lastName: true,
                    email: true,
                    phone: true
                }
            },
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
studentModels.getExamDate = async (userId) => {
    return await prisma.examSchedule.findMany({
        where: {
            course: {
                enrollments: {
                    some: {
                        studentId: userId,
                        status: 'APPROVED',
                    },
                },
            },
        },
        include: {
            course: true,
        },
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
studentModels.sendRequestSection = async (userId, courseId, currentSection, newSection, teacherId) => {
    return prisma.sectionChangeRequest.create({
        data: {
            studentId: userId,
            courseId: courseId,
            currentSection: currentSection,
            newSection: newSection || null,
            teacherId: teacherId || null
        }
    });
};

module.exports = studentModels;