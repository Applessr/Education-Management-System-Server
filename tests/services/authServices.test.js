const authServices = require('../../src/services/authServices');
const authModels = require('../../src/models/authModels');


jest.mock('../../src/models/authModels');

describe('authServices', () => {
    afterEach(() => {
        jest.clearAllMocks(); 
    });

    test('should find employee by email', async () => {
        const email = 'test@example.com';
        const employee = { id: 1, email: 'test@example.com' };
        
        authModels.findEmployee.mockResolvedValue(employee); 

        const result = await authServices.findEmployee(email);

        expect(result).toEqual(employee); 
        expect(authModels.findEmployee).toHaveBeenCalledWith(email); 
    });

    test('should find employee by ID', async () => {
        const employeeId = 1;
        const employee = { id: 1, email: 'test@example.com' };
        
        authModels.findEmployeeById.mockResolvedValue(employee);

        const result = await authServices.findEmployeeById(employeeId);

        expect(result).toEqual(employee);
        expect(authModels.findEmployeeById).toHaveBeenCalledWith(employeeId);
    });

    test('should find student by identifier', async () => {
        const identifier = 'student123';
        const student = { id: 1, identifier: 'student123' };

        authModels.findStudent.mockResolvedValue(student);

        const result = await authServices.findStudent(identifier);

        expect(result).toEqual(student);
        expect(authModels.findStudent).toHaveBeenCalledWith(identifier);
    });

    test('should find student by ID', async () => {
        const studentId = 1;
        const student = { id: 1, name: 'Student Test' };

        authModels.findStudentById.mockResolvedValue(student);

        const result = await authServices.findStudentById(studentId);

        expect(result).toEqual(student);
        expect(authModels.findStudentById).toHaveBeenCalledWith(studentId);
    });

    test('should create a new employee', async () => {
        const employeeData = { email: 'new@employee.com', name: 'New Employee' };
        const newEmployee = { id: 2, ...employeeData };

        authModels.CreateEmployee.mockResolvedValue(newEmployee);

        const result = await authServices.createEmployee(employeeData);

        expect(result).toEqual(newEmployee);
        expect(authModels.CreateEmployee).toHaveBeenCalledWith(employeeData);
    });

    test('should update employee password', async () => {
        const employeeId = 1;
        const hashedPassword = 'newHashedPassword';

        authModels.updateEmployeePassword.mockResolvedValue({ id: employeeId });

        const result = await authServices.updateEmployeePassword(employeeId, hashedPassword);

        expect(result.id).toBe(employeeId);
        expect(authModels.updateEmployeePassword).toHaveBeenCalledWith(employeeId, hashedPassword);
    });

    test('should update student password', async () => {
        const studentId = 1;
        const hashedPassword = 'newHashedPassword';

        authModels.updateStudentPassword.mockResolvedValue({ id: studentId });

        const result = await authServices.updateStudentPassword(studentId, hashedPassword);

        expect(result.id).toBe(studentId);
        expect(authModels.updateStudentPassword).toHaveBeenCalledWith(studentId, hashedPassword);
    });

    test('should update reset password token', async () => {
        const email = 'test@example.com';
        const token = 'resetToken';
        const expiryDate = new Date(Date.now() + 3600000);

        authModels.updateResetPassword.mockResolvedValue({ email });

        const result = await authServices.updateResetPassword(email, token, expiryDate);

        expect(result.email).toBe(email);
        expect(authModels.updateResetPassword).toHaveBeenCalledWith(email, token, expiryDate);
    });

    test('should find employee by Google ID', async () => {
        const googleId = 'googleId123';
        const employee = { googleId: 'googleId123', id: 1 };
    
        authModels.findGoogleId.mockResolvedValue(employee.googleId); 
    
        const result = await authServices.findEmployeeGoogleId(googleId);
    
        expect(result).toBe(employee.googleId); 
        expect(authModels.findGoogleId).toHaveBeenCalledWith(googleId);
    });

    test('should return current user', async () => {
        const userId = 1;
        const firstName = 'Test User';
        const user = { id: userId, firstName };

        authModels.currentUser.mockResolvedValue(user);

        const result = await authServices.currentUser(userId, firstName);

        expect(result).toEqual(user);
        expect(authModels.currentUser).toHaveBeenCalledWith(userId, firstName);
    });
});