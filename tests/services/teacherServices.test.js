const teacherServices = require('../../src/services/teacherServices');
const teacherModels = require('../../src/models/teacherModels');

jest.mock('../../src/models/teacherModels');

describe('teacherServices', () => {
    const teacherId = 1;
    const courseId = 'CS101';
    const enrollmentId = 'EN123';
    const requestId = 'REQ456';
    const fieldToChange = 'email';
    const newValue = 'newemail@example.com';
    const title = 'New Announcement';
    const content = 'Announcement content';
    const status = 'APPROVED';

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should get teacher profile', async () => {
        const mockProfile = { name: 'Jane Doe', teacherId };
        teacherModels.teacherProfile.mockResolvedValue(mockProfile);

        const result = await teacherServices.teacherProfile(teacherId);

        expect(result).toEqual(mockProfile);
        expect(teacherModels.teacherProfile).toHaveBeenCalledWith(teacherId);
    });

    test('should change password for a teacher', async () => {
        const newPassword = 'newPassword123';
        teacherModels.changePassword.mockResolvedValue(true);

        const result = await teacherServices.changePassword(teacherId, newPassword);

        expect(result).toBe(true);
        expect(teacherModels.changePassword).toHaveBeenCalledWith(teacherId, newPassword);
    });

    test('should get students in a teacher’s course', async () => {
        const mockStudents = [{ studentId: 1, name: 'John Doe' }];
        teacherModels.getStudentInCourse.mockResolvedValue(mockStudents);

        const result = await teacherServices.getStudentInCourse(teacherId);

        expect(result).toEqual(mockStudents);
        expect(teacherModels.getStudentInCourse).toHaveBeenCalledWith(teacherId);
    });

    test('should get students in a course by course ID', async () => {
        const mockStudents = [{ studentId: 2, name: 'Jane Smith' }];
        teacherModels.getStudentInCourseById.mockResolvedValue(mockStudents);

        const result = await teacherServices.getStudentInCourseById(teacherId, courseId);

        expect(result).toEqual(mockStudents);
        expect(teacherModels.getStudentInCourseById).toHaveBeenCalledWith(teacherId, courseId);
    });

    test('should get consulted students for a teacher', async () => {
        const mockConsultedStudents = [{ studentId: 3, name: 'Alice Brown' }];
        teacherModels.getConsultedStudent.mockResolvedValue(mockConsultedStudents);

        const result = await teacherServices.getConsultedStudent(teacherId);

        expect(result).toEqual(mockConsultedStudents);
        expect(teacherModels.getConsultedStudent).toHaveBeenCalledWith(teacherId);
    });

    test('should get enrollment requests', async () => {
        const mockRequests = [{ requestId: 1, studentId: 4, status: 'PENDING' }];
        teacherModels.getEnrollRequest.mockResolvedValue(mockRequests);

        const result = await teacherServices.getEnrollRequest(teacherId);

        expect(result).toEqual(mockRequests);
        expect(teacherModels.getEnrollRequest).toHaveBeenCalledWith(teacherId);
    });

    test('should get section requests', async () => {
        const mockSectionRequests = [{ requestId: 1, courseId: 'CS202', newSection: 'B' }];
        teacherModels.getSectionRequest.mockResolvedValue(mockSectionRequests);

        const result = await teacherServices.getSectionRequest(teacherId);

        expect(result).toEqual(mockSectionRequests);
        expect(teacherModels.getSectionRequest).toHaveBeenCalledWith(teacherId);
    });

    test('should send a request to change teacher’s field', async () => {
        teacherModels.sendRequestChange.mockResolvedValue(true);

        const result = await teacherServices.sendRequestChange(teacherId, fieldToChange, newValue);

        expect(result).toBe(true);
        expect(teacherModels.sendRequestChange).toHaveBeenCalledWith(teacherId, fieldToChange, newValue);
    });

    test('should send an announcement for a course', async () => {
        teacherModels.sendAnnounce.mockResolvedValue(true);

        const result = await teacherServices.sendAnnounce(teacherId, title, content, courseId);

        expect(result).toBe(true);
        expect(teacherModels.sendAnnounce).toHaveBeenCalledWith(teacherId, title, content, courseId);
    });

    test('should check if announcement was sent for a course', async () => {
        const mockAnnouncementStatus = { sent: true };
        teacherModels.checkAnnouncementSent.mockResolvedValue(mockAnnouncementStatus);

        const result = await teacherServices.checkAnnouncementSent(courseId);

        expect(result).toEqual(mockAnnouncementStatus);
        expect(teacherModels.checkAnnouncementSent).toHaveBeenCalledWith(courseId);
    });

    test('should edit enrollment status', async () => {
        teacherModels.editEnrollStatus.mockResolvedValue(true);

        const result = await teacherServices.editEnrollStatus(enrollmentId, status);

        expect(result).toBe(true);
        expect(teacherModels.editEnrollStatus).toHaveBeenCalledWith(enrollmentId, status);
    });

    test('should edit section request status', async () => {
        teacherModels.editRequestSection.mockResolvedValue(true);

        const result = await teacherServices.editRequestSection(requestId, status);

        expect(result).toBe(true);
        expect(teacherModels.editRequestSection).toHaveBeenCalledWith(requestId, status);
    });

    test('should find enrollment by ID', async () => {
        const mockEnrollment = { id: enrollmentId, courseId };
        teacherModels.findEnroll.mockResolvedValue(mockEnrollment);

        const result = await teacherServices.findEnroll(enrollmentId);

        expect(result).toEqual(mockEnrollment);
        expect(teacherModels.findEnroll).toHaveBeenCalledWith(enrollmentId);
    });

    test('should edit student section', async () => {
        teacherModels.editStudentSection.mockResolvedValue(true);

        const result = await teacherServices.editStudentSection(enrollmentId, courseId);

        expect(result).toBe(true);
        expect(teacherModels.editStudentSection).toHaveBeenCalledWith(enrollmentId, courseId);
    });
});