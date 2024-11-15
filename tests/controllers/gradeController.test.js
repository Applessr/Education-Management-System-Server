const gradeController = require('../../src/controllers/gradeController');
const gradeServices = require('../../src/services/gradeServices');
const createError = require('../../src/utils/create-error');

jest.mock('../../src/services/gradeServices');
jest.mock('../../src/utils/create-error');

describe('Grade Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = { user: { id: 'student123', role: 'TEACHER' }, params: {}, body: {} };
        res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('studentGetGrade', () => {
        it('should return student grade successfully', async () => {
            const mockGrade = { subject: 'Math', grade: 'A' };
            gradeServices.studentGetGrade.mockResolvedValue(mockGrade);

            await gradeController.studentGetGrade(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockGrade);
        });

        it('should handle missing studentId', async () => {
            req.user.id = null;
            await gradeController.studentGetGrade(req, res, next);

            expect(createError).toHaveBeenCalledWith(400, 'Check token expired date');
        });
    });

    describe('studentGetAllGrade', () => {
        it('should return all student grades successfully', async () => {
            const mockGrades = [{ subject: 'Math', grade: 'A' }];
            gradeServices.studentGetAllGrade.mockResolvedValue(mockGrades);

            await gradeController.studentGetAllGrade(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockGrades);
        });
    });

    describe('studentGetGradeBySemester', () => {
        it('should return grade for a specific semester', async () => {
            req.body.semester = 'Fall 2023';
            const mockGrade = { semester: 'Fall 2023', grade: 'A' };
            gradeServices.studentGetGradeBySemester.mockResolvedValue(mockGrade);

            await gradeController.studentGetGradeBySemester(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockGrade);
        });

        it('should handle missing semester', async () => {
            await gradeController.studentGetGradeBySemester(req, res, next);

            expect(createError).toHaveBeenCalledWith(400, 'semester is require');
        });
    });

    describe('studentGetScore', () => {
        it('should return student score by courseId', async () => {
            req.params.courseId = 'course123';
            const mockScore = { score: 95 };
            gradeServices.studentGetScore.mockResolvedValue(mockScore);

            await gradeController.studentGetScore(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockScore);
        });

        it('should handle missing courseId', async () => {
            await gradeController.studentGetScore(req, res, next);

            expect(createError).toHaveBeenCalledWith(400, 'courseId is require');
        });
    });

    describe('studentGetAllGPA', () => {
        it('should return all GPA records', async () => {
            const mockGPA = [{ semester: 'Fall 2023', GPA: 3.8 }];
            gradeServices.studentGetAllGPA.mockResolvedValue(mockGPA);

            await gradeController.studentGetAllGPA(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ AllTermGPA: mockGPA });
        });
    });

    describe('studentGetGPABySemester', () => {
        it('should return GPA for a specific semester', async () => {
            const mockGPA = 3.8;
            gradeServices.studentGetGPABySemester.mockResolvedValue(mockGPA);

            await gradeController.studentGetGPABySemester(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ GPA: mockGPA });
        });
    });

    describe('Grade Controller - teacherAddScore', () => {
        it('should add a score successfully', async () => {
          req.user = { employeeRole: 'TEACHER' };
          req.params = { courseId: 'course123' };
          req.body = { semester: 'Fall 2023', studentId: 'student123', type: 'Exam', point: 95 };
      
          const mockUpdatedScore = { component: { id: 'component123', type: 'Exam', point: 95 }, totalScore: 95 };
          gradeServices.teacherAddScore = jest.fn().mockResolvedValue(mockUpdatedScore);
      
          await gradeController.teacherAddScore(req, res, next);
      
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith({
            message: 'Score added successfully',
            updatedTotalScore: mockUpdatedScore,
          });
        });
    });


    describe('teacherEditScore', () => {
        it('should edit a score successfully', async () => {
            req.user = { employeeRole: 'TEACHER' };
            req.params.componentId = 'component123';
            req.body = { type: 'Quiz', point: 85 };
            const mockUpdatedScore = 85;
            gradeServices.teacherEditScore.mockResolvedValue(mockUpdatedScore);

            await gradeController.teacherEditScore(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Score edit successfully',
                updatedTotalScore: mockUpdatedScore,
            });
        });

        it('should handle permission error for non-TEACHER roles', async () => {
            req.user.role = 'STUDENT';

            await gradeController.teacherEditScore(req, res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'You do not have permission' });
        });
    });
});
