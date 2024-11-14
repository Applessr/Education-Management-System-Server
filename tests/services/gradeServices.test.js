const gradeModels = require("../../src/models/gradeModels");
const gradeServices = require("../../src/services/gradeServices");


jest.mock("../../src/models/gradeModels", () => ({
    studentGetGrade: jest.fn(),
    studentGetGradeBySemester: jest.fn(),
    studentGetScore: jest.fn(),
    studentGetAllGPA: jest.fn(),
    studentGetGPABySemester: jest.fn(),
    teacherAddScore: jest.fn(),
    teacherEditScore: jest.fn(),
}));

describe("gradeServices", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("should get student grade", async () => {
        const studentId = "12345";
        const expectedGrade = [{ course: "Math", grade: "A" }];
        gradeModels.studentGetGrade.mockResolvedValue(expectedGrade);

        const result = await gradeServices.studentGetGrade(studentId);

        expect(gradeModels.studentGetGrade).toHaveBeenCalledWith(studentId);
        expect(result).toEqual(expectedGrade);
    });

    test("should get student grade by semester", async () => {
        const studentId = "12345";
        const semester = "2023";
        const expectedGrade = [{ course: "Science", grade: "B" }];
        gradeModels.studentGetGradeBySemester.mockResolvedValue(expectedGrade);

        const result = await gradeServices.studentGetGradeBySemester(studentId, semester);

        expect(gradeModels.studentGetGradeBySemester).toHaveBeenCalledWith(studentId, semester);
        expect(result).toEqual(expectedGrade);
    });

    test("should get student score", async () => {
        const studentId = "12345";
        const courseId = "67890";
        const expectedScore = { courseId, score: 95 };
        gradeModels.studentGetScore.mockResolvedValue(expectedScore);

        const result = await gradeServices.studentGetScore(studentId, courseId);

        expect(gradeModels.studentGetScore).toHaveBeenCalledWith(studentId, courseId);
        expect(result).toEqual(expectedScore);
    });

    test("should get all GPA of student", async () => {
        const studentId = "12345";
        const expectedGPA = [{ semester: "2023", GPA: 3.5 }];
        gradeModels.studentGetAllGPA.mockResolvedValue(expectedGPA);

        const result = await gradeServices.studentGetAllGPA(studentId);

        expect(gradeModels.studentGetAllGPA).toHaveBeenCalledWith(studentId);
        expect(result).toEqual(expectedGPA);
    });

    test("should get GPA by semester", async () => {
        const studentId = "12345";
        const expectedGPA = { semester: "2023", GPA: 3.7 };
        gradeModels.studentGetGPABySemester.mockResolvedValue(expectedGPA);

        const result = await gradeServices.studentGetGPABySemester(studentId);

        expect(gradeModels.studentGetGPABySemester).toHaveBeenCalledWith(studentId);
        expect(result).toEqual(expectedGPA);
    });

    test("should add score for student", async () => {
        const studentId = "12345";
        const courseId = "67890";
        const semester = "2023";
        const type = "final";
        const point = 90;
        gradeModels.teacherAddScore.mockResolvedValue({ success: true });

        const result = await gradeServices.teacherAddScore(studentId, courseId, semester, type, point);

        expect(gradeModels.teacherAddScore).toHaveBeenCalledWith(studentId, courseId, semester, type, point);
        expect(result).toEqual({ success: true });
    });

    test("should edit score for student", async () => {
        const componentId = "component123";
        const updatedData = { point: 85 };
        gradeModels.teacherEditScore.mockResolvedValue({ success: true });

        const result = await gradeServices.teacherEditScore(componentId, updatedData);

        expect(gradeModels.teacherEditScore).toHaveBeenCalledWith(componentId, updatedData);
        expect(result).toEqual({ success: true });
    });
});