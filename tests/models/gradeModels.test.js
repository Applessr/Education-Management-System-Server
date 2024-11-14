const prisma = require("../../src/configs/prisma");
const gradeModels = require("../../src/models/gradeModels");

jest.mock("../../src/configs/prisma", () => {
    return {
        grade: {
            findMany: jest.fn(),
            findFirst: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            aggregate: jest.fn(),
        },
        enrollment: {
            findMany: jest.fn(),
        },
        gradeComponent: {
            create: jest.fn(),
            update: jest.fn(),
            findUnique: jest.fn(),
        },
    };
});

describe('gradeModels', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.resetModules();
    });
    describe('studentGetGrade', () => {
        it('should return grades grouped by semester', async () => {
            const studentId = 1;
            const mockGrades = [
                {
                    id: 1,
                    totalPoint: 80,
                    semester: '2024-1',
                    letterGrade: 'A',
                    course: {
                        id: 1,
                        courseCode: 'CS101',
                        courseName: 'Computer Science 101',
                        section: 'A',
                        credits: 3,
                    },
                },
                {
                    id: 2,
                    totalPoint: 70,
                    semester: '2024-1',
                    letterGrade: 'B',
                    course: {
                        id: 2,
                        courseCode: 'MATH101',
                        courseName: 'Mathematics 101',
                        section: 'B',
                        credits: 3,
                    },
                },
                {
                    id: 3,
                    totalPoint: 90,
                    semester: '2024-2',
                    letterGrade: 'A',
                    course: {
                        id: 3,
                        courseCode: 'CS102',
                        courseName: 'Computer Science 102',
                        section: 'A',
                        credits: 3,
                    },
                },
            ];

            prisma.grade.findMany.mockResolvedValue(mockGrades);

            const result = await gradeModels.studentGetGrade(studentId);

            expect(result).toEqual([
                {
                    semester: '2024-1',
                    courses: [
                        {
                            courseId: 1,
                            courseCode: 'CS101',
                            courseName: 'Computer Science 101',
                            section: 'A',
                            credits: 3,
                            letterGrade: 'A',
                            totalPoint: 80,
                        },
                        {
                            courseId: 2,
                            courseCode: 'MATH101',
                            courseName: 'Mathematics 101',
                            section: 'B',
                            credits: 3,
                            letterGrade: 'B',
                            totalPoint: 70,
                        },
                    ],
                },
                {
                    semester: '2024-2',
                    courses: [
                        {
                            courseId: 3,
                            courseCode: 'CS102',
                            courseName: 'Computer Science 102',
                            section: 'A',
                            credits: 3,
                            letterGrade: 'A',
                            totalPoint: 90,
                        },
                    ],
                },
            ]);
        });
    });

    describe('studentGetGPABySemesterForAll', () => {
        it('should return GPA and credits for the given semester', async () => {
            const studentId = 1;
            const semester = '2024-1';
            const mockEnrollments = [
                {
                    course: {
                        credits: 3,
                        grades: [
                            {
                                letterGrade: 'A',
                            },
                        ],
                    },
                },
                {
                    course: {
                        credits: 3,
                        grades: [
                            {
                                letterGrade: 'B+',
                            },
                        ],
                    },
                },
            ];

            prisma.enrollment.findMany.mockResolvedValue(mockEnrollments);

            const result = await gradeModels.studentGetGPABySemesterForAll(studentId, semester);

            expect(result.semesterGPA).toBeCloseTo(3.75, 2);
            expect(result.semesterCredits).toBe(6);
        });
    });

    describe('teacherAddScore', () => {
        it('should add a grade component and update the total score', async () => {
            const studentId = 1;
            const courseId = 101;
            const semester = '2024-1';
            const type = 'Assignment';
            const point = 25;

            gradeModels.findOrCreateGrade = jest.fn().mockResolvedValue(1);

            prisma.gradeComponent.create.mockResolvedValue({
                id: 1,
                type: 'Assignment',
                point: 25,
            });

            gradeModels.updateTotalScore = jest.fn().mockResolvedValue(25);

            prisma.grade.update.mockResolvedValue({
                totalPoint: 25,
                letterGrade: 'A',
            });

            const result = await gradeModels.teacherAddScore(studentId, courseId, semester, type, point);

            expect(result).toBe(25);

            expect(gradeModels.findOrCreateGrade).toHaveBeenCalledWith(studentId, courseId, semester);
            expect(prisma.gradeComponent.create).toHaveBeenCalledWith({
                data: {
                    type: type,
                    point: point,
                    gradeId: 1,
                },
            });
            expect(gradeModels.updateTotalScore).toHaveBeenCalledWith(1);
        });
    });

    describe('studentGetAllGPA', () => {
        it('should calculate the average GPA across semesters', async () => {
            const studentId = 1;
            const mockEnrollments = [
                {
                    semester: '2024-1',
                    course: {
                        credits: 3,
                        grades: [
                            {
                                letterGrade: 'A',
                            },
                        ],
                    },
                },
                {
                    semester: '2024-2',
                    course: {
                        credits: 3,
                        grades: [
                            {
                                letterGrade: 'B',
                            },
                        ],
                    },
                },
            ];

            prisma.enrollment.findMany.mockResolvedValue(mockEnrollments);

            const result = await gradeModels.studentGetAllGPA(studentId);

            expect(result).toBeCloseTo(3.5, 2);
        });
    });

    describe('findOrCreateGrade', () => {
        it('should find an existing grade if it exists', async () => {
            const studentId = 1;
            const courseId = 101;
            const semester = '2024-1';

            prisma.grade.findFirst.mockResolvedValue({
                id: 1,
            });

            const result = await gradeModels.findOrCreateGrade(studentId, courseId, semester);

            expect(result).toBe(1);
        });

    });
});