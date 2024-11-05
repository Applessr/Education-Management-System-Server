const request = require('supertest');
const app = require('../../src/app'); // Your Express app
const { createEmployee, createStudent, createTestUser } = require('../helpers'); // Helper functions to create users
const jwtServices = require('../../src/services/jwtServices');

describe('Auth Router Integration Tests', () => {
    let employeeData;
    let studentData;
    let validToken;

    beforeAll(async () => {
        employeeData = await createEmployee({ email: 'employee@test.com', password: 'password123' });
        studentData = await createStudent({ email: 'student@test.com', password: 'password123' });


        validToken = jwtServices.sign(employeeData.id);
    });

    test('POST /auth/login-employee should return 401 for invalid password', async () => {
        const response = await request(app)
            .post('/auth/login-employee')
            .send({ email: employeeData.email, password: 'wrongPassword' });

        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty('message', 'Invalid credentials');
    });

    test('POST /auth/reset-password should return 400 for invalid email', async () => {
        const response = await request(app)
            .post('/auth/reset-password')
            .send({ email: 'nonexistent@test.com', newPassword: 'newpassword123' });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message', 'User not found');
    });

    test('POST /auth/reset-password should not allow logging in with old password', async () => {
        await request(app)
            .post('/auth/reset-password')
            .send({ email: employeeData.email, newPassword: 'newpassword123' });

        const response = await request(app)
            .post('/auth/login-employee')
            .send({ email: employeeData.email, password: 'password123' });

        expect(response.statusCode).toBe(401);
    });

    test('GET /auth/current-user should return current user data if authenticated', async () => {
        const response = await request(app)
            .get('/auth/current-user')
            .set('Authorization', `Bearer ${validToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('email', employeeData.email);
    });
});