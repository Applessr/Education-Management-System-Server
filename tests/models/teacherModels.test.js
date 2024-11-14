const prisma = require("../../src/configs/prisma");
const gradeModels = require("../../src/models/gradeModels");
const teacherModels = require("../../src/models/teacherModels");

jest.mock("../../src/configs/prisma", () => ({
    employee: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        update: jest.fn(),
    },
    course: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
    },
    enrollment: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
    },
    sectionChangeRequest: {
        findMany: jest.fn(),
        update: jest.fn(),
    },
    announcement: {
        create: jest.fn(),
        findMany: jest.fn(),
    },
    infoChangeRequest: {
        create: jest.fn(),
    },
}));

describe("teacherModels", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("teacherProfile", () => {
        it("should return teacher profile", async () => {
            const teacherId = 1;
            const mockProfile = {
                id: 1,
                email: "teacher@example.com",
                firstName: "John",
                lastName: "Doe",
                major: {
                    faculty: { name: "Science" },
                },
            };

            prisma.employee.findUnique.mockResolvedValue(mockProfile);

            const result = await teacherModels.teacherProfile(teacherId);

            expect(result).toEqual(mockProfile);
            expect(prisma.employee.findUnique).toHaveBeenCalledWith({
                where: { id: 1 },
                include: {
                    major: {
                        include: {
                            faculty: { select: { name: true } },
                        },
                    },
                },
            });
        });
    });

    describe("changePassword", () => {
        it("should change the teacher password", async () => {
            const teacherId = 1;
            const newPassword = { password: "newpassword123" };

            prisma.employee.update.mockResolvedValue({ id: 1, password: "newpassword123" });

            const result = await teacherModels.changePassword(teacherId, newPassword);

            expect(result.password).toBe("newpassword123");
            expect(prisma.employee.update).toHaveBeenCalledWith({
                where: { id: 1 },
                data: { password: newPassword.password },
            });
        });
    });

    describe("getStudentInCourse", () => {
        it("should return students in course", async () => {
            const teacherId = 1;
            const mockStudents = [
                {
                    studentId: 101,
                    email: "jane@example.com",
                    firstName: "Jane",
                    lastName: "Doe",
                    phone: "1234567890",
                    major: {
                        name: "Computer Science",
                        faculty: {
                            name: "Faculty of Engineering"
                        }
                    }
                },
            ];
        
            prisma.employee.findUnique.mockResolvedValue({
                email: "teacher@example.com",
                firstName: "John",
                lastName: "Smith",
                phone: "0987654321",
                courses: [
                    {
                        courseCode: "CS101",
                        courseName: "Computer Science 101",
                        enrollments: [
                            {
                                student: mockStudents[0],
                            },
                        ],
                    },
                ],
            });
        
            const result = await teacherModels.getStudentInCourse(teacherId);
        
            expect(result.courses[0].enrollments[0].student).toEqual(mockStudents[0]);
        });
    });

    describe("getStudentInCourseById", () => {
        it("should return course and students with grades", async () => {
            const teacherId = 1;
            const courseId = 101;
            const mockCourse = {
                id: 101,
                courseCode: "CS101",
                courseName: "Computer Science 101",
                enrollments: [
                    {
                        student: {
                            studentId: 101,
                            firstName: "Jane",
                            lastName: "Doe",
                            grades: { totalPoint: 85 },
                        },
                    },
                ],
            };

            prisma.course.findUnique.mockResolvedValue(mockCourse);

            const result = await teacherModels.getStudentInCourseById(teacherId, courseId);

            expect(result).toEqual(mockCourse);
        });
    });

    describe("getConsultedStudent", () => {
        it("should return consulted students with GPA and gender counts", async () => {
            const teacherId = 1;
            const mockStudent = {
                id: 1,
                studentId: 101,
                gender: "FEMALE",
                status: "ACTIVE",
                averageGPA: 3.75,
            };

            const mockStudents = [{
                student: [mockStudent], 
            }];
        
            gradeModels.studentGetAllGPA = jest.fn().mockResolvedValue(mockStudent.averageGPA);
        
            prisma.employee.findMany.mockResolvedValue(mockStudents);
        
            // Calling the method to be tested
            const result = await teacherModels.getConsultedStudent(teacherId);
        
            // Assertions
            expect(result.genderCount.female).toBe(1); 
            expect(result.statusCount.active).toBe(1); 
            expect(result.totalStudents).toBe(1); 
            expect(result.students[0].student[0].averageGPA).toBe(mockStudent.averageGPA);
        });
    });

    describe("sendAnnounce", () => {
        it("should send an announcement", async () => {
            const teacherId = 1;
            const title = "Important Announcement";
            const content = "Please be informed about the changes.";
            const courseId = 101;

            prisma.announcement.create.mockResolvedValue({
                teacherId: 1,
                title: "Important Announcement",
                content: "Please be informed about the changes.",
                courseId: 101,
            });

            const result = await teacherModels.sendAnnounce(teacherId, title, content, courseId);

            expect(result.title).toBe(title);
            expect(result.content).toBe(content);
        });
    });

    describe("editEnrollStatus", () => {
        it("should update the enrollment status", async () => {
            const enrollmentId = 1;
            const status = "APPROVED";

            prisma.enrollment.update.mockResolvedValue({
                id: 1,
                status: "APPROVED",
            });

            const result = await teacherModels.editEnrollStatus(enrollmentId, status);

            expect(result.status).toBe(status);
        });
    });
});