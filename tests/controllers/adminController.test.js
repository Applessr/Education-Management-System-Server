const request = require("supertest");
const app = require("../../src/app");
const adminServices = require("../../src/services/adminServices");
const jwtServices = require("../../src/services/jwtServices");
const studentServices = require("../../src/services/studentServices");

jest.mock("../../src/services/adminServices");

jest.mock('../../src/middlewares/authentication', () => (req, res, next) => {
    req.user = { id: 1, employeeRole: "ADMIN" };
    next();
});
jest.mock('../../src/services/studentServices', () => ({
    getStudentProfile: jest.fn(),
}));

describe("Admin Controller", () => {
    let mockAdminId, mockToken, mockWrongToken;

    beforeAll(() => {
        mockAdminId = 1;
        mockToken = jwtServices.sign({ id: mockAdminId, type: 'EMPLOYEE' });
        mockWrongToken = jwtServices.sign({ id: mockAdminId, type: 'STUDENT' });
    });

    describe('GET /admin/profile', () => {
        it('should return 404 if token is invalid', async () => {
            const response = await request(app)
                .get('/admin/profile')
                .set("Authorization", `Bearer ${mockWrongToken}`);

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('User not found');
        });

        it('should return 200 and admin info if token is valid', async () => {
            adminServices.getEmployeeById.mockResolvedValue({
                id: mockAdminId,
                firstName: "Teacher",
                lastName: "Name",
                employeeRole: "ADMIN"
            });

            const response = await request(app)
                .get('/admin/profile')
                .set("Authorization", `Bearer ${mockToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id', mockAdminId);
            expect(response.body).toHaveProperty('firstName', 'Teacher');
            expect(response.body).toHaveProperty('lastName', 'Name');
            expect(response.body).toHaveProperty('employeeRole', 'ADMIN');
        });
    });

    describe('GET /admin/student', () => {
        it('should return 200 and a list of students', async () => {
            adminServices.getAllStudent.mockResolvedValue([{ id: 1, name: "Student Name" }]);

            const response = await request(app)
                .get('/admin/student')
                .set("Authorization", `Bearer ${mockToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body[0]).toHaveProperty('id', 1);
        });

    });

    describe('adminController.overAll', () => {
        it('should return overall data for an ADMIN', async () => {
          adminServices.overAll.mockResolvedValue({ data: 'overall data' });
    
          const response = await request(app)
            .get('/admin/over-all') 
            .set('Authorization', `Bearer ${mockToken}`);
    
          expect(response.status).toBe(200);
          expect(response.body).toEqual({ data: 'overall data' });
        });
    
      });
    
      describe('adminController.courseSyllabus', () => {
        it('should return course syllabus data', async () => {
          adminServices.courseSyllabus.mockResolvedValue([{ course: 'Math 101' }]);
    
          const response = await request(app)
            .get('/admin/course-syllabus/1?year=2024') 
            .set('Authorization', `Bearer ${mockToken}`);
    
          expect(response.status).toBe(200);
          expect(response.body).toEqual([{ course: 'Math 101' }]);
        });
    
      });
    
      describe('adminController.getAllStudent', () => {
        it('should return all students data', async () => {
          adminServices.getAllStudent.mockResolvedValue([{ id: 1, name: 'John Doe' }]);
    
          const response = await request(app)
            .get('/admin/student') 
            .set('Authorization', `Bearer ${mockToken}`);
    
          expect(response.status).toBe(200);
          expect(response.body).toEqual([{ id: 1, name: 'John Doe' }]);
        });
      });
    
      describe('adminController.getStudentById', () => {
        it('should return student data by ID', async () => {
            studentServices.getStudentProfile.mockResolvedValue({ id: 1, name: 'John Doe' });
    
          const response = await request(app)
            .get('/admin/student/1') 
            .set('Authorization', `Bearer ${mockToken}`);
    
          expect(response.status).toBe(200);
          expect(response.body).toEqual({ id: 1, name: 'John Doe' });
        });
    
      });
    
});