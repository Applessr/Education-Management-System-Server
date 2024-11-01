const request = require('supertest');
const express = require('express');
const authController = require('../../src/controllers/authController');
const app = express();

app.use(express.json());
app.post('/auth/login-employee', authController.loginEmployee);
app.post('/auth/login-student', authController.loginStudent);
app.post('/auth/login-google', authController.loginGoogle);
app.post('/auth/forget-password', authController.forgetPassword);
app.post('/auth/reset-password', authController.resetPassword);

jest.mock('../../src/services/authServices');
jest.mock('../../src/services/hashServices');
jest.mock('../../src/services/jwtServices');
jest.mock('../../src/services/sendEmailServices');

describe('Auth Controller', () => {
    describe('POST /auth/login-employee', () => {
        it('should log in successfully with valid credentials', async () => {
            const mockEmployee = {
                id: 3,
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@example.com',
                password: 'hashedpassword',
                employeeRole: 'EMPLOYEE',
                phone: '1234567890',
            };

            require('../../src/services/authServices').findEmployee.mockResolvedValue(mockEmployee.email);
            require('../../src/services/hashServices').compare.mockResolvedValue(true);
            require('../../src/services/jwtServices').sign.mockReturnValue('mockedToken');

            const response = await request(app)
                .post('/auth/login-employee')
                .send({ email: 'john@example.com', password: 'password' });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Login successful');
            expect(response.body.user).toHaveProperty('user');
            expect(response.body.token).toBe('mockedToken');
        });
        it('should log in fail with status 400', async () => {
            const mockEmployee = {
                id: 3,
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@example.com',
                password: 'wrongpassword',
                employeeRole: 'EMPLOYEE',
                phone: '1234567890',
            };

            require('../../src/services/authServices').findEmployee.mockResolvedValue(mockEmployee.email);
            require('../../src/services/hashServices').compare.mockResolvedValue(false); 
            require('../../src/services/jwtServices').sign.mockReturnValue('mockedToken');

            const response = await request(app)
                .post('/auth/login-employee')
                .send({ email: 'john@example.com', password: 'password' });

                console.log
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Password incorrect');
        });


    });

    // Add similar test cases for other endpoints (login-student, login-google, etc.)
    describe('POST /auth/login-student', () => {
        // Add your test cases here
    });

    describe('POST /auth/login-google', () => {
        // Add your test cases here
    });

    describe('POST /auth/forget-password', () => {
        // Add your test cases here
    });

    describe('POST /auth/reset-password', () => {
        // Add your test cases here
    });
});