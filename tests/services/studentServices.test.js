const studentServices = require('../../src/services/studentServices');
const studentModels = require('../../src/models/studentModels');

jest.mock('../../src/models/studentModels');

describe('studentServices', () => {
    const userId = 1;
    const semester = '2024A';
    const courseId = 'CS101';
    const currentSection = 'A';
    const newSection = 'B';
    const teacherId = 2;
    const amount = 100;
    const status = 'PENDING';

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should get credit for a user', async () => {
        const mockCredit = 15;
        studentModels.getCredit.mockResolvedValue(mockCredit);

        const result = await studentServices.getCredit(userId);

        expect(result).toBe(mockCredit);
        expect(studentModels.getCredit).toHaveBeenCalledWith(userId);
    });

    test('should get student profile', async () => {
        const mockProfile = { name: 'John Doe', studentId: userId };
        studentModels.studentProfile.mockResolvedValue(mockProfile);

        const result = await studentServices.getStudentProfile(userId);

        expect(result).toEqual(mockProfile);
        expect(studentModels.studentProfile).toHaveBeenCalledWith(userId);
    });

    test('should get notifications for a user', async () => {
        const mockNotifications = [{ id: 1, message: 'New assignment posted' }];
        studentModels.getNotification.mockResolvedValue(mockNotifications);

        const result = await studentServices.getNotification(userId);

        expect(result).toEqual(mockNotifications);
        expect(studentModels.getNotification).toHaveBeenCalledWith(userId);
    });

    test('should get exam date for a user and semester', async () => {
        const mockExamDate = { date: '2024-05-20', subject: 'Mathematics' };
        studentModels.getExamDate.mockResolvedValue(mockExamDate);

        const result = await studentServices.getExamDate(userId, semester);

        expect(result).toEqual(mockExamDate);
        expect(studentModels.getExamDate).toHaveBeenCalledWith(userId, semester);
    });

    test('should change password for a user', async () => {
        const newPassword = 'newPassword123';
        studentModels.changePassword.mockResolvedValue(true);

        const result = await studentServices.changePassword(userId, newPassword);

        expect(result).toBe(true);
        expect(studentModels.changePassword).toHaveBeenCalledWith(userId, newPassword);
    });

    test('should send request to change a field for a user', async () => {
        const fieldToChange = 'email';
        const newValue = 'newemail@example.com';
        studentModels.sendRequestChange.mockResolvedValue(true);

        const result = await studentServices.sendRequestChange(userId, fieldToChange, newValue);

        expect(result).toBe(true);
        expect(studentModels.sendRequestChange).toHaveBeenCalledWith(userId, fieldToChange, newValue);
    });

    test('should send section change request for a course', async () => {
        studentModels.sendRequestSection.mockResolvedValue(true);

        const result = await studentServices.sendRequestSection(userId, courseId, currentSection, newSection, teacherId);

        expect(result).toBe(true);
        expect(studentModels.sendRequestSection).toHaveBeenCalledWith(userId, courseId, currentSection, newSection, teacherId);
    });

    test('should check payment status for a student and semester', async () => {
        const mockPaymentStatus = { status: 'COMPLETED' };
        studentModels.checkPayMent.mockResolvedValue(mockPaymentStatus);

        const result = await studentServices.checkPayMent(semester, userId);

        expect(result).toEqual(mockPaymentStatus);
        expect(studentModels.checkPayMent).toHaveBeenCalledWith(semester, userId);
    });

    test('should create a payment record for a student', async () => {
        const mockPaymentRecord = { id: 1, amount, semester, studentId: userId, status };
        studentModels.createPayMent.mockResolvedValue(mockPaymentRecord);

        const result = await studentServices.createPayMent(amount, semester, userId, status);

        expect(result).toEqual(mockPaymentRecord);
        expect(studentModels.createPayMent).toHaveBeenCalledWith(amount, semester, userId, status);
    });
});