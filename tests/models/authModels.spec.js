const prisma = require("../../src/configs/prisma");
const authModels = require("../../src/models/authModels");

jest.mock("../../src/configs/prisma", () => {
    return {
        employee: {
            findUnique: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
        },
        student: {
            findUnique: jest.fn(),
        },
    };
});

describe("authModels", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("findEmployee should return employee object", async () => {
        const email = "test@example.com";
        const mockEmployee = { id: 1, email: "test@example.com", firstName: "John", lastName: "Doe" };

        prisma.employee.findUnique.mockResolvedValue(mockEmployee); 

        const employee = await authModels.findEmployee(email);
        expect(employee).toEqual(mockEmployee);
        expect(prisma.employee.findUnique).toHaveBeenCalledWith({ where: { email } });
    });

    it("findEmployeeById should return employee object", async () => {
        const employeeId = 1;
        const mockEmployee = { id: 1, email: "test@example.com", firstName: "John", lastName: "Doe" };

        prisma.employee.findUnique.mockResolvedValue(mockEmployee);

        const employee = await authModels.findEmployeeById(employeeId);
        expect(employee).toEqual(mockEmployee);
        expect(prisma.employee.findUnique).toHaveBeenCalledWith({ where: { id: employeeId } });
    });

    it("findStudentById should return student object", async () => {
        const studentId = 1;
        const mockStudent = { id: 1, email: "student@example.com", firstName: "Jane", lastName: "Doe" };

        prisma.student.findUnique.mockResolvedValue(mockStudent);

        const student = await authModels.findStudentById(studentId);
        expect(student).toEqual(mockStudent);
        expect(prisma.student.findUnique).toHaveBeenCalledWith({ where: { id: studentId } });
    });

    it("findStudent should return student object by email", async () => {
        const identifier = { email: "student@example.com" };
        const mockStudent = { id: 1, email: "student@example.com", firstName: "Jane", lastName: "Doe" };

        prisma.student.findUnique.mockResolvedValue(mockStudent);

        const student = await authModels.findStudent(identifier);
        expect(student).toEqual(mockStudent);
        expect(prisma.student.findUnique).toHaveBeenCalledWith({ where: { email: identifier.email }, include: expect.any(Object) });
    });

    it("CreateEmployee should create and return new employee", async () => {
        const data = { googleId: "googleId123", email: "new@example.com", firstName: "John", lastName: "Smith" };
        const mockCreatedEmployee = { id: 2, ...data };

        prisma.employee.create.mockResolvedValue(mockCreatedEmployee);

        const employee = await authModels.CreateEmployee(data);
        expect(employee).toEqual(mockCreatedEmployee);
        expect(prisma.employee.create).toHaveBeenCalledWith({
            data: {
                googleId: data.googleId,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName
            }
        });
    });

    it("updateEmployee should update and return updated employee", async () => {
        const id = 1;
        const updatedData = { firstName: "Updated" };
        const mockUpdatedEmployee = { id: 1, email: "test@example.com", ...updatedData };

        prisma.employee.update.mockResolvedValue(mockUpdatedEmployee);

        const employee = await authModels.updateEmployee(id, updatedData);
        expect(employee).toEqual(mockUpdatedEmployee);
        expect(prisma.employee.update).toHaveBeenCalledWith({ where: { id }, data: updatedData });
    });

    it("findGoogleId should return employee object", async () => {
        const googleId = "googleId123";
        const mockEmployee = { id: 1, googleId: "googleId123", email: "test@example.com" };

        prisma.employee.findUnique.mockResolvedValue(mockEmployee);

        const employee = await authModels.findGoogleId(googleId);
        expect(employee).toEqual(mockEmployee);
        expect(prisma.employee.findUnique).toHaveBeenCalledWith({ where: { googleId } });
    });

    it("updateResetPassword should update and return employee", async () => {
        const email = "test@example.com";
        const token = "resetToken123";
        const expiryDate = new Date(Date.now() + 3600000); // 1 hour later
        const mockUpdatedEmployee = { id: 1, email, resetPasswordToken: token, resetPasswordExpires: expiryDate };

        prisma.employee.update.mockResolvedValue(mockUpdatedEmployee);

        const employee = await authModels.updateResetPassword(email, token, expiryDate);
        expect(employee).toEqual(mockUpdatedEmployee);
        expect(prisma.employee.update).toHaveBeenCalledWith({
            where: { email },
            data: { resetPasswordToken: token, resetPasswordExpires: expiryDate }
        });
    });

    it("updatePassword should update employee's password", async () => {
        const employeeId = 1;
        const hashedPassword = "hashedPassword123";
        const mockUpdatedEmployee = { id: 1, email: "test@example.com", password: hashedPassword };

        prisma.employee.update.mockResolvedValue(mockUpdatedEmployee);

        const employee = await authModels.updatePassword(employeeId, hashedPassword);
        expect(employee).toEqual(mockUpdatedEmployee);
        expect(prisma.employee.update).toHaveBeenCalledWith({
            where: { id: employeeId },
            data: {
                password: hashedPassword,
                resetPasswordToken: null,
                resetPasswordExpires: null,
            },
        });
    });

    it("currentUser should return student with role", async () => {
        const userId = 1;
        const firstName = "Jane";
        const mockStudent = { id: userId, firstName, email: "student@example.com" };

        prisma.student.findUnique.mockResolvedValue(mockStudent);

        const user = await authModels.currentUser(userId, firstName);
        expect(user).toEqual({ ...mockStudent, role: 'STUDENT' });
        expect(prisma.student.findUnique).toHaveBeenCalledWith({ where: { id: userId, firstName } });
    });


    it("currentUser should return null for non-existent user", async () => {
        const userId = 1;
        const firstName = "NonExistent";

        prisma.student.findUnique.mockResolvedValue(null);
        prisma.employee.findUnique.mockResolvedValue(null);

        const user = await authModels.currentUser(userId, firstName);
        expect(user).toBeNull();
    });
});