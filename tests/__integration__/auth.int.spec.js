const request = require('supertest');
const app = require('../../src/app');
const { createTestEmployee, createTestStudent } = require('../helpers');
const jwtServices = require('../../src/services/jwtServices');
const prisma = require("../../src/configs/prisma");

jest.mock('../../src/services/sendEmailServices', () => ({
    sendResetEmail: jest.fn().mockResolvedValue(true),
}));

describe('Auth Router Integration Tests', () => {
    let employeeData;
    let studentData;
    let validEmployeeToken;

    beforeAll(async () => {

        employeeData = await createTestEmployee({ email: `employee@test.com`, password: 'password123' });
        studentData = await createTestStudent({ email: `student@test.com`, password: 'password123' });

        validEmployeeToken = jwtServices.sign({ id: employeeData.id, type: 'EMPLOYEE' });
        validStudentToken = jwtServices.sign({ id: studentData.id, type: 'STUDENT' });
    });

    test('POST /auth/login-employee should return 401 for invalid password', async () => {
        const response = await request(app)
            .post('/auth/login-employee')
            .send({ email: employeeData.email, password: 'wrongPassword' });

        console.log(response.body);
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message', 'Password incorrect');
    });

    test('POST /auth/login-student should return 200 and a token for valid login', async () => {
        const response = await request(app)
            .post('/auth/login-student')
            .send({ identifier: studentData.email, password: 'password123' });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    test('POST /auth/reset-password should return 400 for invalid email', async () => {
        const response = await request(app)
            .post('/auth/reset-password')
            .send({ email: 'nonexistent@test.com', newPassword: 'newpassword123' });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message', 'Token is required');
    });

    test('GET /auth/current-user should return current user data if authenticated', async () => {
        console.log(validEmployeeToken);
        const response = await request(app)
            .get('/auth/current-user')
            .set('Authorization', `Bearer ${validEmployeeToken}`);

        console.log(response.body); 
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('email', employeeData.email);
    });

    test('GET /auth/current-user should return 401 if no token is provided', async () => {
        const response = await request(app).get('/auth/current-user');

        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty('message', 'Unauthorized');
    });

    test('POST /auth/forget-password should send reset password email', async () => {
        const response = await request(app)
            .post('/auth/forget-password')
            .send({ email: employeeData.email });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Reset password email sent');
    });
});