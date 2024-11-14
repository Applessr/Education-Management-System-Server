const courseModels = require("../../src/models/courseModels");
const courseServices = require("../../src/services/courseServices");


jest.mock("../../src/models/courseModels", () => ({
    getAllCourse: jest.fn(),
    getAllMajor: jest.fn(),
    getMajorByFaculty: jest.fn(),
    getAllFaculty: jest.fn(),
    teacherGetCourse: jest.fn(),
    getCourseById: jest.fn(),
    getCourseByCode: jest.fn(),
    findCourseByCode: jest.fn(),
    createCourse: jest.fn(),
    editCourse: jest.fn(),
    inactiveCourse: jest.fn(),
    activeCourse: jest.fn(),
    studentGetCourseSyllabus: jest.fn(),
    studentGetEnrollCourse: jest.fn(),
    studentGetEnrollCourseBySemester: jest.fn(),
    studentGetClassScheduleBySemester: jest.fn(),
    studentCreateEnroll: jest.fn(),
    studentCancelEnroll: jest.fn(),
    studentGetClassScheduleByCourseId: jest.fn(),
    assignToSyllabus: jest.fn(),
}));

describe("courseServices", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("should get all courses with search term and semester", async () => {
        const searchTerm = "Math";
        const semester = "2023";
        const expectedCourses = [{ courseCode: "MTH101", courseName: "Math 101" }];
        courseModels.getAllCourse.mockResolvedValue(expectedCourses);

        const result = await courseServices.getAllCourse(searchTerm, semester);

        expect(courseModels.getAllCourse).toHaveBeenCalledWith(searchTerm, semester);
        expect(result).toEqual(expectedCourses);
    });

    test("should get all majors", async () => {
        const expectedMajors = [{ majorId: "1", majorName: "Computer Science" }];
        courseModels.getAllMajor.mockResolvedValue(expectedMajors);

        const result = await courseServices.getAllMajor();

        expect(courseModels.getAllMajor).toHaveBeenCalled();
        expect(result).toEqual(expectedMajors);
    });

    test("should get major by faculty", async () => {
        const facultyId = "123";
        const expectedMajors = [{ majorId: "2", majorName: "Engineering" }];
        courseModels.getMajorByFaculty.mockResolvedValue(expectedMajors);

        const result = await courseServices.getMajorByFaculty(facultyId);

        expect(courseModels.getMajorByFaculty).toHaveBeenCalledWith(facultyId);
        expect(result).toEqual(expectedMajors);
    });

    test("should get all faculties", async () => {
        const expectedFaculties = [{ facultyId: "123", facultyName: "Science" }];
        courseModels.getAllFaculty.mockResolvedValue(expectedFaculties);

        const result = await courseServices.getAllFaculty();

        expect(courseModels.getAllFaculty).toHaveBeenCalled();
        expect(result).toEqual(expectedFaculties);
    });

    test("should get courses by teacher", async () => {
        const teacherId = "teacher123";
        const expectedCourses = [{ courseCode: "ENG101", courseName: "English 101" }];
        courseModels.teacherGetCourse.mockResolvedValue(expectedCourses);

        const result = await courseServices.teacherGetCourse(teacherId);

        expect(courseModels.teacherGetCourse).toHaveBeenCalledWith(teacherId);
        expect(result).toEqual(expectedCourses);
    });

    test("should get course by ID", async () => {
        const courseId = "course123";
        const expectedCourse = { courseCode: "SCI101", courseName: "Science 101" };
        courseModels.getCourseById.mockResolvedValue(expectedCourse);

        const result = await courseServices.getCourseById(courseId);

        expect(courseModels.getCourseById).toHaveBeenCalledWith(courseId);
        expect(result).toEqual(expectedCourse);
    });

    test("should create a course", async () => {
        const courseData = {
            courseCode: "MTH102",
            courseName: "Math 102",
            credits: 3,
            seat: 30,
            section: "1",
            teacherId: "teacher123",
            courseSyllabusId: "syllabus123",
            majorId: "major123",
            classSchedules: [{ day: "Monday", time: "10:00 AM" }],
            examSchedule: { day: "Friday", time: "2:00 PM" }
        };
        courseModels.createCourse.mockResolvedValue({ success: true });

        const result = await courseServices.createCourse(
            courseData.courseCode,
            courseData.courseName,
            courseData.credits,
            courseData.seat,
            courseData.section,
            courseData.teacherId,
            courseData.courseSyllabusId,
            courseData.majorId,
            courseData.classSchedules,
            courseData.examSchedule
        );

        expect(courseModels.createCourse).toHaveBeenCalledWith(
            courseData.courseCode,
            courseData.courseName,
            courseData.credits,
            courseData.seat,
            courseData.section,
            courseData.teacherId,
            courseData.courseSyllabusId,
            courseData.majorId,
            courseData.classSchedules,
            courseData.examSchedule
        );
        expect(result).toEqual({ success: true });
    });

    test("should activate course", async () => {
        const courseId = "course123";
        courseModels.activeCourse.mockResolvedValue({ success: true });

        const result = await courseServices.activeCourse(courseId);

        expect(courseModels.activeCourse).toHaveBeenCalledWith(courseId);
        expect(result).toEqual({ success: true });
    });

    test("should assign course to syllabus", async () => {
        const courseId = "course123";
        const majorId = "major123";
        const year = 2023;
        const recommendationType = "recommended";
        courseModels.assignToSyllabus.mockResolvedValue({ success: true });

        const result = await courseServices.assignToSyllabus(courseId, majorId, year, recommendationType);

        expect(courseModels.assignToSyllabus).toHaveBeenCalledWith(courseId, majorId, year, recommendationType);
        expect(result).toEqual({ success: true });
    });


});