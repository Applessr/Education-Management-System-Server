const prisma = require("../configs/prisma");

const studentModels = {};

studentModels.getProgress = async (studentId) => {
    const student = await prisma.student.findUnique({
        where: {
            id: Number(studentId),
        },
        select: {
            firstName: true,
            lastName: true,
            major: {
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
                                    courseName: true,
                                    grades: {
                                        select: {
                                            totalPoint: true,
                                            letterGrade: true,
                                        },
                                    },
                                    enrollments: {
                                        select: {
                                            status: true,
                                            registrationDate: true,
                                            semester: true,
                                            studentId: true,
                                            courseId: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                    faculty: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
        },
    });

    if (!student || !student.major || !student.major.courseRecommendation) {
        throw new Error('Student or major not found');
    }

    let totalCourses = 0;
    let completedCourses = 0;

    for (const recommendation of student.major.courseRecommendation) {
        const course = recommendation.course;
        if (course) {
            totalCourses++;

            const enrollment = course.enrollments.find(en => en.status === 'APPROVED');
            if (enrollment && enrollment.grade !== 'F') {
                completedCourses++;
            }
        }
    }

    const progressPercentage = totalCourses > 0 ? (completedCourses / totalCourses) * 100 : 0;

    return {
        firstName: student.firstName,
        lastName: student.lastName,
        progress: progressPercentage
    };
};
studentModels.getCredit = async (studentId) => {
    const approvedEnrollments = await prisma.enrollment.findMany({
        where: {
            studentId: Number(studentId),
            status: 'APPROVED',
        },
        include: {
            course: true,
        },
    });

    const currentCredit = approvedEnrollments.reduce((total, enrollment) => {
        return total + enrollment.course.credits;
    }, 0);

    const student = await prisma.student.findUnique({
        where: {
            id: Number(studentId),
        },
        include: {
            major: {
                include: {
                    courseRecommendation: {
                        include: {
                            course: true,
                        },
                    },
                },
            },
        },
    });

    const totalRequiredCredits = student.major.courseRecommendation.reduce(
        (total, courseSyllabus) => {
            return total + courseSyllabus.course.reduce((subTotal, course) => {
                return subTotal + course.credits;
            }, 0);
        },
        0
    );

    const totalRequiredCourses = student.major.courseRecommendation.filter(
        (courseSyllabus) => courseSyllabus.recommendationType === 'REQUIRED'
    ).length;

    const totalElectiveCourses = student.major.courseRecommendation.filter(
        (courseSyllabus) => courseSyllabus.recommendationType === 'ELECTIVE'
    ).length;

    const enrolledRequiredCourses = approvedEnrollments.filter(
        (enrollment) => enrollment.course.recommendationType === 'REQUIRED'
    ).length;

    const enrolledElectiveCourses = approvedEnrollments.filter(
        (enrollment) => enrollment.course.recommendationType === 'ELECTIVE'
    ).length;

    return {
        currentCredit,
        totalRequiredCredits,
        totalRequiredCourses,
        totalElectiveCourses,
        enrolledRequiredCourses,
        enrolledElectiveCourses,
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