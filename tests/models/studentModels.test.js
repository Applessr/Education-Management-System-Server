const prisma = require("../../src/configs/prisma");
const studentModels = require("../../src/models/studentModels");

jest.mock("../../src/configs/prisma", () => {
    return {
        enrollment: {
            findMany: jest.fn().mockResolvedValue([
                {
                    grade: 'A',
                    course: { credits: 3, major: { courseRecommendation: [{ recommendationType: 'PREREQUISITES' }] } }
                },
                {
                    grade: 'B',
                    course: { credits: 4, major: { courseRecommendation: [{ recommendationType: 'OPTIONAL' }] } }
                }
            ]),
        },
        student: {
            findUnique: jest.fn().mockResolvedValue({
                id: 1,
                adviser: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '1234567890' },
                major: { faculty: { name: 'Computer Science' } }
            }),
        },
        payment: {
            create: jest.fn().mockResolvedValue({ totalCredit: 3, amount: 1500, status: 'PENDING' }),
            findFirst: jest.fn().mockResolvedValue({ totalCredit: 3, amount: 1500, status: 'PENDING' }),
        }
    };
});

describe('studentModels', () => {
    describe('getCredit', () => {
        it('should return correct credit details for a student', async () => {
            const studentId = 1;
            const mockEnrollments = [
                {
                    grade: 'A',
                    course: {
                        credits: 3,
                        major: {
                            courseRecommendation: [
                                { recommendationType: 'PREREQUISITES' }  
                            ]
                        }
                    }
                },
                {
                    grade: 'B',
                    course: {
                        credits: 4,
                        major: {
                            courseRecommendation: [
                                { recommendationType: 'OPTIONAL' }  
                            ]
                        }
                    }
                }
            ];

            prisma.enrollment.findMany.mockResolvedValue(mockEnrollments);

            const result = await studentModels.getCredit(studentId);

            expect(result.currentCredit).toBe(7); 
            expect(result.totalCredit).toBe(144); 
        });
    });

    describe('studentProfile', () => {
        it('should return student profile data', async () => {
            const userId = 1;
            const mockProfile = {
                id: 1,
                adviser: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '1234567890' },
                major: { faculty: { name: 'Computer Science' } }
            };

            prisma.student.findUnique.mockResolvedValue(mockProfile);  // Mock Prisma query result

            const result = await studentModels.studentProfile(userId);

            expect(result.adviser.firstName).toBe('John');
            expect(result.major.faculty.name).toBe('Computer Science');
        });
    });

    describe('getNotification', () => {
        it('should return notifications for approved enrollments', async () => {
            const userId = 1;
            const mockEnrollments = [
                {
                    course: {
                        announcements: [{ title: 'New Announcement', content: 'Important update', createdAt: new Date() }],
                        courseCode: 'CS101',
                        courseName: 'Intro to CS',
                        teacher: { firstName: 'Jane', lastName: 'Smith' },
                        major: { name: 'Computer Science' }
                    }
                }
            ];

            prisma.enrollment.findMany.mockResolvedValue(mockEnrollments);  // Mock Prisma query result

            const result = await studentModels.getNotification(userId);

            expect(result.length).toBe(1);
            expect(result[0].course.courseCode).toBe('CS101');
            expect(result[0].course.announcements[0].title).toBe('New Announcement');
        });
    });

    describe('createPayMent', () => {
        it('should create a new payment record', async () => {
            const amount = 1500;
            const semester = '2024-1';
            const studentId = 1;
            const status = 'PENDING';

            const mockPayment = {
                totalCredit: 3,
                amount: amount,
                semester: semester,
                status: status,
                studentId: studentId,
                payDate: new Date()
            };

            prisma.payment.create.mockResolvedValue(mockPayment);  // Mock Prisma query result

            const result = await studentModels.createPayMent(amount, semester, studentId, status);

            expect(result.amount).toBe(1500);
            expect(result.status).toBe('PENDING');
        });
    });

    describe('checkPayMent', () => {
        it('should return a payment record if exists', async () => {
            const semester = '2024-1';
            const studentId = 1;

            const mockPayment = {
                totalCredit: 3,
                amount: 1500,
                semester: semester,
                status: 'PENDING',
                studentId: studentId,
                payDate: new Date()
            };

            prisma.payment.findFirst.mockResolvedValue(mockPayment);  // Mock Prisma query result

            const result = await studentModels.checkPayMent(semester, studentId);

            expect(result.amount).toBe(1500);
            expect(result.status).toBe('PENDING');
        });
    });
});