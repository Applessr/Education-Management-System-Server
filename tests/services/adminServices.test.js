const adminModels = require("../../src/models/adminModels");
const adminServices = require("../../src/services/adminServices");

// Mock adminModels methods
jest.mock("../../src/models/adminModels", () => ({
    findEmail: jest.fn(),
    findEmployeeByID: jest.fn(),
    overAll: jest.fn(),
    courseSyllabus: jest.fn(),
    findPhone: jest.fn(),
    createEmployee: jest.fn(),
    findStudentId: jest.fn(),
    findStudentCode: jest.fn(),
    findStudentEmail: jest.fn(),
    findStudentPhone: jest.fn(),
    createStudent: jest.fn(),
    getAllStudent: jest.fn(),
    getAllEmployee: jest.fn(),
    getRequestInfo: jest.fn(),
    getRequestInfoById: jest.fn(),
    changeStudentStatus: jest.fn(),
    changeStudentInfo: jest.fn(),
    changeEmployeeInfo: jest.fn(),
    inactiveEmployee: jest.fn(),
    activeEmployee: jest.fn(),
}));

describe("adminServices", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("should get employee email", async () => {
        const email = "example@test.com";
        const expectedResult = { id: 1, email };
        adminModels.findEmail.mockResolvedValue(expectedResult);

        const result = await adminServices.getEmployeeEmail(email);

        expect(adminModels.findEmail).toHaveBeenCalledWith(email);
        expect(result).toEqual(expectedResult);
    });

    test("should get employee by ID", async () => {
        const userId = "123";
        const expectedEmployee = { id: userId, name: "John Doe" };
        adminModels.findEmployeeByID.mockResolvedValue(expectedEmployee);

        const result = await adminServices.getEmployeeById(userId);

        expect(adminModels.findEmployeeByID).toHaveBeenCalledWith(userId);
        expect(result).toEqual(expectedEmployee);
    });

    test("should get overall data", async () => {
        const expectedOverallData = { totalStudents: 100, totalEmployees: 50 };
        adminModels.overAll.mockResolvedValue(expectedOverallData);

        const result = await adminServices.overAll();

        expect(adminModels.overAll).toHaveBeenCalled();
        expect(result).toEqual(expectedOverallData);
    });

    test("should get course syllabus", async () => {
        const majorId = "456";
        const year = "2023";
        const expectedSyllabus = { majorId, year, courses: [] };
        adminModels.courseSyllabus.mockResolvedValue(expectedSyllabus);

        const result = await adminServices.courseSyllabus(majorId, year);

        expect(adminModels.courseSyllabus).toHaveBeenCalledWith(majorId, year);
        expect(result).toEqual(expectedSyllabus);
    });

    test("should get employee by phone", async () => {
        const phone = "1234567890";
        const expectedEmployee = { id: 2, phone };
        adminModels.findPhone.mockResolvedValue(expectedEmployee);

        const result = await adminServices.getEmployeePhone(phone);

        expect(adminModels.findPhone).toHaveBeenCalledWith(phone);
        expect(result).toEqual(expectedEmployee);
    });

    test("should create an employee", async () => {
        const employeeData = { name: "Jane Smith", email: "jane@example.com" };
        const expectedResponse = { success: true };
        adminModels.createEmployee.mockResolvedValue(expectedResponse);

        const result = await adminServices.createEmployee(employeeData);

        expect(adminModels.createEmployee).toHaveBeenCalledWith(employeeData);
        expect(result).toEqual(expectedResponse);
    });

    test("should get student by ID", async () => {
        const studentId = "789";
        const expectedStudent = { id: studentId, name: "Alice" };
        adminModels.findStudentId.mockResolvedValue(expectedStudent);

        const result = await adminServices.getStudentId(studentId);

        expect(adminModels.findStudentId).toHaveBeenCalledWith(studentId);
        expect(result).toEqual(expectedStudent);
    });

    test("should create a student", async () => {
        const studentData = { name: "Bob Brown", email: "bob@example.com" };
        const expectedResponse = { success: true };
        adminModels.createStudent.mockResolvedValue(expectedResponse);

        const result = await adminServices.createStudent(studentData);

        expect(adminModels.createStudent).toHaveBeenCalledWith(studentData);
        expect(result).toEqual(expectedResponse);
    });

    test("should change student status", async () => {
        const studentId = "789";
        const status = "inactive";
        const expectedResponse = { success: true };
        adminModels.changeStudentStatus.mockResolvedValue(expectedResponse);

        const result = await adminServices.changeStudentStatus(studentId, status);

        expect(adminModels.changeStudentStatus).toHaveBeenCalledWith(studentId, status);
        expect(result).toEqual(expectedResponse);
    });

    test("should activate employee", async () => {
        const employeeId = "456";
        const expectedResponse = { success: true };
        adminModels.activeEmployee.mockResolvedValue(expectedResponse);

        const result = await adminServices.activeEmployee(employeeId);

        expect(adminModels.activeEmployee).toHaveBeenCalledWith(employeeId);
        expect(result).toEqual(expectedResponse);
    });

});