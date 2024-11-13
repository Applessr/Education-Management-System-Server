const prisma = require("../configs/prisma");


const gradeModels = {};
gradeModels.studentGetGrade = async (studentId) => {
    const grades = await prisma.grade.findMany({
        where: {
            studentId: Number(studentId),
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
                    section: true,
                    credits: true,
                },
            },
        },
    });

    const groupedGrades = grades.reduce((acc, grade) => {
        if (!acc[grade.semester]) {
            acc[grade.semester] = {
                semester: grade.semester,
                courses: [],
            };
        }
        acc[grade.semester].courses.push({
            courseId: grade.course.id,
            courseCode: grade.course.courseCode,
            courseName: grade.course.courseName,
            section: grade.course.section,
            credits: grade.course.credits,
            letterGrade: grade.letterGrade,
            totalPoint: grade.totalPoint,
        });

        return acc;
    }, {});

    return Object.values(groupedGrades);
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
            studentId: Number(studentId),
            status: "APPROVED",
        },
        select: {
            id: true,
            semester: true,
        },
        distinct: ['semester'],
    });

    let totalGradePoints = 0;
    let totalCredits = 0;

    if (semesters.length === 0) {
        console.log(`No approved enrollments found for student ${studentId}`);
        return 0;
    }

    for (const semester of semesters) {
        try {
            const { semesterGPA, semesterCredits } = await gradeModels.studentGetGPABySemesterForAll(studentId, semester.semester);

            if (semesterGPA == null || semesterCredits == null) {
                console.log(`No GPA or credits found for semester ${semester.semester} for student ${studentId}`);
                continue;
            }

            console.log(`Semester: ${semester.semester}, GPA: ${semesterGPA}, Credits: ${semesterCredits}`);

            totalGradePoints += semesterGPA * semesterCredits;
            totalCredits += semesterCredits;
        } catch (error) {
            console.error(`Error fetching GPA for semester ${semester.semester} for student ${studentId}:`, error);
        }
    }

    const averageGPA = totalCredits > 0 ? totalGradePoints / totalCredits : 0;

    console.log(`Student ID: ${studentId}, Average GPA: ${averageGPA}`);

    return averageGPA;
};
gradeModels.studentGetGPABySemesterForAll = async (studentId, semester) => {
    const enrollments = await prisma.enrollment.findMany({
        where: {
            studentId: Number(studentId),
            semester: semester,
            status: 'APPROVED',
        },
        include: {
            course: {
                include: {
                    grades: {
                        where: {
                            studentId: Number(studentId),
                        },
                    },
                },
            },
        },
    });

    let totalGradePoints = 0;
    let totalCredits = 0;

    const gradePointMap = {
        'A': 4.0,
        'B+': 3.5,
        'B': 3.0,
        'C+': 2.5,
        'C': 2.0,
        'D+': 1.5,
        'D': 1.0,
        'F': 0.0
    };

    console.log(`Enrollments for Semester ${semester}:`, enrollments);

    for (const enrollment of enrollments) {
        const grade = enrollment.course.grades[0];
        const credits = enrollment.course.credits;

        console.log(`Grades for Course ID: ${enrollment.courseId}`, enrollment.course.grades); // Debugging

        if (grade && grade.letterGrade !== null) {
            const letterGrade = grade.letterGrade
            const gradePoint = gradePointMap[letterGrade];

            if (gradePoint !== undefined) {
                totalGradePoints += gradePoint * credits;
                console.log(`Course ID: ${enrollment.courseId}, Letter Grade: ${letterGrade}, Grade Points: ${gradePoint}, Credits: ${credits}`);
            } else {
                console.log(`Invalid letter grade for Course ID: ${enrollment.courseId}`);
            }
        } else {
            console.log(`No valid grade found for Course ID: ${enrollment.courseId}`);
        }

        totalCredits += credits;
    }

    const semesterGPA = totalCredits > 0 ? totalGradePoints / totalCredits : 0;

    console.log(`Total Grade Points: ${totalGradePoints}, Total Credits: ${totalCredits}, Semester GPA: ${semesterGPA}`);

    return { semesterGPA, semesterCredits: totalCredits };
};
gradeModels.studentGetGPABySemester = async (studentId) => {

    const enrollments = await prisma.enrollment.findMany({
        where: {
            studentId: Number(studentId),
            status: 'APPROVED',
        },
        include: {
            course: {
                include: {
                    grades: {
                        where: {
                            studentId: Number(studentId),
                        },
                    },
                },
            },
        },
    });
    console.log('enrollments', enrollments);
    const gradePointMap = {
        'A': 4.0,
        'B+': 3.5,
        'B': 3.0,
        'C+': 2.5,
        'C': 2.0,
        'D+': 1.5,
        'D': 1.0,
        'F': 0.0,
    };

    const semesterData = {};

    for (const enrollment of enrollments) {
        const semester = enrollment.semester;
        const grade = enrollment.course.grades[0];
        const credits = enrollment.course.credits;

        if (!semesterData[semester]) {
            semesterData[semester] = {
                totalGradePoints: 0,
                totalCredits: 0,
            };
        }

        console.log('grade :>> ', grade);

        if (grade && grade.letterGrade !== null) {
            const letterGrade = grade.letterGrade;
            const gradePoint = gradePointMap[letterGrade];

            if (gradePoint !== undefined) {
                semesterData[semester].totalGradePoints += gradePoint * credits;
                semesterData[semester].totalCredits += credits;

            }
        }

    }

    const result = Object.keys(semesterData).map((semester) => {
        const { totalGradePoints, totalCredits } = semesterData[semester];
        const semesterGPA = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0;

        return {
            semester,
            gpa: parseFloat(semesterGPA),
            credits: totalCredits,
        };
    });

    return result;
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