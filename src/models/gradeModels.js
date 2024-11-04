const prisma = require("../configs/prisma");


const gradeModels = {};

gradeModels.studentGetGrade = async (studentId) => {
    return await prisma.grade.findMany({
        where: {
            studentId: Number(studentId)
        },
        select: {
            id: true,
            totalPoint: true,
            semester: true,
            letterGrade: true,
            course: {
                select: {
                    id: true,
                    courseCode: true,
                    courseName: true,
                    section: true
                }
            }
        }
    });
};

gradeModels.studentGetGradeBySemester = async (studentId, semester) => {
    return await prisma.grade.findMany({
        where: {
            studentId: Number(studentId),
            semester: semester,
        },
        select: {
            id: true,
            totalPoint: true,
            letterGrade: true,
            course: {
                select: {
                    id: true,
                    courseCode: true,
                    courseName: true,
                    section: true
                }
            }
        }
    });
};

gradeModels.studentGetScore = async (studentId, courseId) => {
    return await prisma.grade.findMany({
        where: {
            studentId: Number(studentId),
            courseId: Number(courseId)
        },
        select: {
            id: true,
            totalPoint: true,
            letterGrade: true,
            credit: true,
            course: {
                select: {
                    id: true,
                    courseCode: true,
                    courseName: true,
                    section: true
                }
            },
            components: {
                select: {
                    id: true,
                    type: true,
                    point: true,
                }
            }
        }
    });
};
gradeModels.studentGetAllGPA = async (studentId) => {
    const semesters = await prisma.enrollment.findMany({
        where: {
            studentId: studentId,
            status: "APPROVED",
        },
        select: {
            id: true,
            semester: true,
        },
        distinct: ['semester'],
    });

    let gpaSum = 0;
    let totalSemesters = 0;

    for (const semester of semesters) {
        const semesterGPA = await gradeModels.studentGetGPABySemester(studentId, semester.semester);
        gpaSum += semesterGPA;
        totalSemesters++;
    }

    const averageGPA = totalSemesters > 0 ? gpaSum / totalSemesters : 0;
    return averageGPA;
};
gradeModels.studentGetGPABySemester = async (studentId, semester) => {
    const enrollments = await prisma.enrollment.findMany({
        where: {
            semester: semester,
            status: "APPROVED",
            studentId: studentId,
        },
        include: {
            course: true,
        },
    });

    let totalPoints = 0;
    let totalCredits = 0;

    for (const enrollment of enrollments) {
        const grade = await prisma.grade.findFirst({
            where: {
                studentId: enrollment.studentId,
                courseId: enrollment.courseId,
            },
        });

        if (grade) {
            totalPoints += 4 * enrollment.course.credits;
            totalCredits += enrollment.course.credits;
        }
    }

    const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
    return gpa;
};
gradeModels.teacherAddScore = async (studentId, courseId, semester, type, point) => {
    const gradeId = await gradeModels.findOrCreateGrade(studentId, courseId, semester);


    await prisma.gradeComponent.create({
        data: {
            type: type,
            point: point,
            gradeId: gradeId,
        },
    });

    const updatedTotal = await gradeModels.updateTotalScore(gradeId);

    return updatedTotal;
};
gradeModels.teacherEditScore = async (componentId, updatedData) => {
    const gradeComponent = await prisma.gradeComponent.findUnique({

        where: { id: Number(componentId) },
    });

    if (!gradeComponent) {
        throw new Error("Grade component not found");
    }

    const updatedComponent = await prisma.gradeComponent.update({
        where: { id: Number(componentId) },
        data: {
            point: updatedData.point,
            type: updatedData.type,
        },
    });

    const updatedTotal = await gradeModels.updateTotalScore(gradeComponent.gradeId);

    return updatedTotal;
};

gradeModels.findOrCreateGrade = async (studentId, courseId, semester) => {
    let grade = await prisma.grade.findFirst({
        where: {
            studentId: Number(studentId),
            courseId: Number(courseId),
            semester: semester,
        },
    });

    if (!grade) {
        grade = await prisma.grade.create({
            data: {
                studentId: Number(studentId),
                courseId: Number(courseId),
                semester: semester,
                totalPoint: 0,
                credit: 3
            },
        });
    }

    return grade.id;
};

const calculateLetterGrade = (totalScore) => {
    if (totalScore >= 80) return 'A';
    if (totalScore >= 75) return 'B+';
    if (totalScore >= 70) return 'B';
    if (totalScore >= 65) return 'C+';
    if (totalScore >= 60) return 'C';
    if (totalScore >= 55) return 'D+';
    if (totalScore >= 50) return 'D';
    return 'F';
};

gradeModels.updateTotalScore = async (gradeId) => {
    const totalScore = await prisma.gradeComponent.aggregate({
        _sum: {
            point: true,
        },
        where: {
            gradeId: gradeId,
        },
    });

    const total = totalScore._sum.point || 0;
    const letterGrade = calculateLetterGrade(total);

    await prisma.grade.update({
        where: { id: gradeId },
        data: {
            totalPoint: total,
            letterGrade: letterGrade,
        },
    });

    return total;
};

module.exports = gradeModels;