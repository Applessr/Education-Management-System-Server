const prisma = require("../../src/configs/prisma");
const courseModels = require("../../src/models/courseModels");

jest.mock("../../src/configs/prisma", () => ({
    course: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        findFirst: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        getCourseByCode: jest.fn(),
    },
    major: {
        findMany: jest.fn(),
    },
    student: {
        findUnique: jest.fn(),
    },
    classSchedule: {
        deleteMany: jest.fn(),
        create: jest.fn(),
    },
    examSchedule: {
        deleteMany: jest.fn(),
        create: jest.fn(),
    },
}));

describe("courseModels", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("getAllCourse should return courses based on searchTerm", async () => {
        prisma.course.findMany.mockResolvedValueOnce([
            {
                id: 1,
                courseCode: 101,
                courseName: "Mathematics",
                credits: 3,
                section: "A",
                status: "OPEN",
                seat: 30,
                teacher: { firstName: "John", lastName: "Doe", email: "john.doe@example.com", phone: "123456789" },
                major: { name: "Engineering", faculty: { name: "Faculty of Science" } },
                classSchedules: [{ day: "Monday", startTime: "09:00", endTime: "12:00", room: "101" }],
                examSchedule: [{ examType: "Final", examDate: "2024-12-12", startTime: "09:00", endTime: "12:00", room: "101" }],
                _count: { enrollments: 5 },
                enrollments: [{ id: 1, status: "APPROVED" }]
            }
        ]);

        const result = await courseModels.getAllCourse("Math", "2024");

        expect(result).toHaveLength(1);
        expect(result[0].courseName).toBe("Mathematics");
        expect(prisma.course.findMany).toHaveBeenCalledWith(expect.objectContaining({
            where: {
                OR: expect.arrayContaining([
                    expect.objectContaining({
                        courseName: {
                            contains: "Math"
                        }
                    })
                ])
            }
        }));
    });

    test("getCourseById should return a specific course", async () => {
        prisma.course.findMany.mockResolvedValueOnce([
            {
                id: 1,
                courseCode: 101,
                courseName: "Mathematics",
                credits: 3,
                section: "A",
                status: "OPEN",
                teacher: { firstName: "John", lastName: "Doe", email: "john.doe@example.com", phone: "123456789" },
                major: { name: "Engineering", faculty: { name: "Faculty of Science" } },
                classSchedules: [{ day: "Monday", startTime: "09:00", endTime: "12:00", room: "101" }],
            }
        ]);

        const result = await courseModels.getCourseById(1);
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe(1);
        expect(result[0].courseName).toBe("Mathematics");
    });

    test("getMajorByFaculty should return majors by facultyId", async () => {
        prisma.major.findMany.mockResolvedValueOnce([
            { id: 1, name: "Engineering", facultyId: 1 }
        ]);

        const result = await courseModels.getMajorByFaculty(1);
        expect(result).toHaveLength(1);
        expect(result[0].name).toBe("Engineering");
    });

    test("teacherGetCourse should return courses by teacherId", async () => {
        prisma.course.findMany.mockResolvedValueOnce([
            {
                courseCode: 101,
                courseName: "Physics",
                teacherId: 1,
                classSchedules: [{ day: "Tuesday", startTime: "10:00", endTime: "13:00", room: "202" }],
                examSchedule: [{ examDate: "2024-12-12", startTime: "14:00", endTime: "17:00", room: "202" }]
            }
        ]);

        const result = await courseModels.teacherGetCourse(1);
        expect(result).toHaveProperty('101');
        expect(result['101']).toHaveLength(1);
        expect(result['101'][0].courseName).toBe("Physics");
    });

    test("getCourseByCode should return course by courseCode", async () => {
        prisma.course.getCourseByCode.mockResolvedValueOnce({
            id: 1,
            courseCode: 101,
            courseName: "Chemistry"
        });

        const result = await courseModels.getCourseByCode(101);
        expect(result).toBeDefined();
        expect(result.courseName).toBe("Chemistry");
    });

    test("findCourseByCode should return course by courseCode and section", async () => {
        prisma.course.findFirst.mockResolvedValueOnce({
            id: 1,
            courseCode: 101,
            section: "A",
            courseName: "Biology"
        });

        const result = await courseModels.findCourseByCode(101, "A");
        expect(result).toBeDefined();
        expect(result.section).toBe("A");
    });

    test('should create a course successfully', async () => {
        // Arrange
        const mockCourseData = {
            courseCode: 'CS101',
            courseName: 'Introduction to Computer Science',
            credits: 3,
            seat: 30,
            section: 1,
            teacherId: 1,
            courseSyllabusId: null,
            majorId: 1,
            classSchedules: [
                { day: 1, startTime: '09:00', endTime: '12:00', room: 'Room 101' }
            ],
            examSchedule: [
                { examType: 'Midterm', examDate: '2024-02-20', startTime: '14:00', endTime: '16:00', room: 'Room 101' }
            ]
        };

        prisma.course.create.mockResolvedValue(mockCourseData);

        const result = await courseModels.createCourse(
            mockCourseData.courseCode,
            mockCourseData.courseName,
            mockCourseData.credits,
            mockCourseData.seat,
            mockCourseData.section,
            mockCourseData.teacherId,
            mockCourseData.courseSyllabusId,
            mockCourseData.majorId,
            mockCourseData.classSchedules,
            mockCourseData.examSchedule
        );

        expect(prisma.course.create).toHaveBeenCalledTimes(1);
        expect(result.courseCode).toBe(mockCourseData.courseCode);
        expect(result.courseName).toBe(mockCourseData.courseName);
    });

    test('should update a course successfully', async () => {
        const mockUpdatedCourseData = {
            courseCode: 'CS102',
            courseName: 'Advanced Computer Science',
            credits: 4,
            seat: 25,
            section: 2,
            teacherId: 2,
            majorId: 2
        };

        prisma.course.update.mockResolvedValue(mockUpdatedCourseData);

        prisma.course.findUnique.mockResolvedValue(mockUpdatedCourseData);

        const result = await courseModels.editCourse(1, mockUpdatedCourseData);

        expect(prisma.course.update).toHaveBeenCalledTimes(1);

        expect(prisma.course.findUnique).toHaveBeenCalledTimes(1);

        expect(result.courseCode).toBe(mockUpdatedCourseData.courseCode);
        expect(result.courseName).toBe(mockUpdatedCourseData.courseName);
        expect(result.credits).toBe(mockUpdatedCourseData.credits);
        expect(result.seat).toBe(mockUpdatedCourseData.seat);
        expect(result.section).toBe(mockUpdatedCourseData.section);
        expect(result.teacherId).toBe(mockUpdatedCourseData.teacherId);
        expect(result.majorId).toBe(mockUpdatedCourseData.majorId);

        expect(prisma.course.update).toHaveBeenCalledWith({
            where: {
                id: 1,
            },
            data: {
                courseCode: mockUpdatedCourseData.courseCode,
                courseName: mockUpdatedCourseData.courseName,
                credits: mockUpdatedCourseData.credits,
                seat: mockUpdatedCourseData.seat,
                section: mockUpdatedCourseData.section,
                teacherId: mockUpdatedCourseData.teacherId,
                majorId: mockUpdatedCourseData.majorId,
            },
            include: expect.any(Object)
        });
    });

    test('should inactivate a course successfully', async () => {
        const courseId = 1;
        prisma.course.update.mockResolvedValue({ status: false });

        const result = await courseModels.inactiveCourse(courseId);

        expect(prisma.course.update).toHaveBeenCalledWith(
            expect.objectContaining({
                where: { id: courseId },
                data: { status: false }
            })
        );
        expect(result.status).toBe(false);
    });

    test('should activate a course successfully', async () => {
        const courseId = 1;
        prisma.course.update.mockResolvedValue({ status: true });

        const result = await courseModels.activeCourse(courseId);

        expect(prisma.course.update).toHaveBeenCalledWith(
            expect.objectContaining({
                where: { id: courseId },
                data: { status: true }
            })
        );
        expect(result.status).toBe(true);
    });
    test('should fetch student course syllabus', async () => {
        const studentId = 1;
        const mockStudentData = {
            id: studentId,
            major: {
                courseRecommendation: [
                    {
                        year: 1,
                        recommendationType: 'PREREQUISITES',
                        course: [
                            { courseCode: 'CS100', courseName: 'Intro to CS', credits: 3 }
                        ]
                    },
                    {
                        year: 1,
                        recommendationType: 'OPTIONAL',
                        course: [
                            { courseCode: 'CS101', courseName: 'Data Structures', credits: 3 }
                        ]
                    }
                ]
            }
        };

        prisma.student.findUnique.mockResolvedValue(mockStudentData);

        const result = await courseModels.studentGetCourseSyllabus(studentId);

        expect(result.major.courseRecommendation[1].PREREQUISITES).toHaveLength(1);
        expect(result.major.courseRecommendation[1].PREREQUISITES[0].courseCode).toBe('CS100');
        expect(result.major.courseRecommendation[1].OPTIONAL).toHaveLength(1);
        expect(result.major.courseRecommendation[1].OPTIONAL[0].courseCode).toBe('CS101');
    });

    test('should fetch student enrolled courses', async () => {
        const studentId = 1;
        const mockEnrollments = [
            {
                course: {
                    courseCode: 'CS101',
                    courseName: 'Introduction to CS',
                    credits: 3,
                    section: 1
                },
                semester: '2024'
            }
        ];

        prisma.student.findUnique.mockResolvedValue({
            enrollments: mockEnrollments
        });

        const result = await courseModels.studentGetEnrollCourse(studentId);

        expect(result.enrollments).toHaveLength(1);
        expect(result.enrollments[0].course.courseCode).toBe('CS101');
    });


});