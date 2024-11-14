require('dotenv').config();
const authServices = require("../services/authServices");
const hashServices = require("../services/hashServices");
const jwtServices = require("../services/jwtServices");
const sendEmailServices = require('../services/sendEmailServices');
const createError = require("../utils/create-error");
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


const authController = {};


authController.loginEmployee = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            return createError(400, 'All fields is require')
        }

        const user = await authServices.findEmployee(email);
        if (!user) {
            return createError(400, 'Employee account not found');
        }

        const isMatch = await hashServices.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Password incorrect' });
        }

        const payload = {
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.employeeRole,
            },
        };

        const accessToken = jwtServices.sign({ id: user.id, type: 'EMPLOYEE' });

        res.status(200).json({
            message: 'Login successful',
            user: payload,
            token: accessToken,
        });

    } catch (error) {
        console.log('Error from loginEmployee', error)
        next(error);
    }
}
authController.loginStudent = async (req, res, next) => {
    try {
        const { identifier, password } = req.body;

        if (!(identifier && password)) {
            return createError(400, 'All fields are required');
        }

        let studentIdOrEmailKey = '';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailRegex.test(identifier)) {
            studentIdOrEmailKey = 'email';
        } else {
            studentIdOrEmailKey = 'studentId';
        }
        const student = await authServices.findStudent({ [studentIdOrEmailKey]: identifier });

        if (!student) {
            return createError(400, 'Student account not found');
        }

        const isMatch = await hashServices.compare(password, student.password);
        if (!isMatch) {
            return createError(400, 'Password incorrect');
        }

        const payload = {
            student: {
                id: student.id,
                studentId: student.studentId,
                firstName: student.firstName,
                lastName: student.lastName,
                role: 'STUDENT',
            },
        };

        const accessToken = jwtServices.sign({ id: student.id, type: 'STUDENT' });

        res.status(200).json({
            message: 'Login successful',
            student: payload,
            token: accessToken,
        });

    } catch (error) {
        console.log('Error from login', error);
        next(error);
    }
};

authController.loginGoogle = async (req, res, next) => {
    const { token } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        

        const payloadFromGoogle = ticket.getPayload();
        const googleId = payloadFromGoogle['sub'];
        const email = payloadFromGoogle['email'];
        const firstName = payloadFromGoogle['given_name'];
        const lastName = payloadFromGoogle['family_name'];

        let employee = await authServices.findUserByGoogleId(googleId);

        if (!employee) {
            const existingEmployee = await authServices.findEmployee(email);
            if (existingEmployee) {
                employee = existingEmployee;
                employee = await authServices.updateEmployee(employee.id, {
                    firstName,
                    lastName,
                });
            } else {
                employee = await authServices.createEmployee({
                    googleId,
                    email,
                    firstName,
                    lastName
                });
            }
        } else {
            employee = await authServices.updateEmployee(employee.id, {
                firstName,
                lastName
            });
        }

        const payload = {
            employee: {
                id: employee.id,
                firstName: employee.firstName,
                lastName: employee.lastName,
                role: employee.employeeRole,
            },
        };

        const accessToken = jwtServices.sign({ id: employee.id, type: 'EMPLOYEE' });

        res.status(200).json({
            message: 'Login successful',
            user: payload,
            token: accessToken,
        });

    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
};
authController.forgetPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            return next(createError(400, 'Email is required'));
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return createError(400, 'Invalid email format');
        }

        const user = await authServices.findEmployee(email);
        const student = await authServices.findStudent({ email: email });
        const userType = user ? 'employee' : student ? 'student' : null;

        if(!user && !student) {
            return next(createError(400, 'Email does not exist'));
        }

        if (!userType) {
            return createError(400, 'Email does not exist');
        }

        const tokenPayload = user ? { employeeId: user.id } : { studentId: student.id };
        const token = jwtServices.signResetToken(tokenPayload);
        const expiryDate = new Date(Date.now() + 3600000); // 1 ชั่วโมง

        await authServices.updateResetPassword(email, token, expiryDate);

        const username = user ? user.username : student.username;
        await sendEmailServices.sendResetEmail(email, token, username);

        res.status(200).json({ message: 'Reset password email sent' });
    } catch (error) {
        console.log('Error from forgetPassword:', error);
        next(error);
    }
};
authController.resetPassword = async (req, res, next) => {
    const { token, newPassword } = req.body;
    try {
        if (!token) {
            return createError(400, 'Token is required');
        }
        if (!newPassword) {
            return createError(400, 'New password is required');
        }

        const decoded = jwtServices.verify(token);
        console.log('Decoded token:', decoded);

        let user;
        if (decoded.employeeId) {
            user = await authServices.findEmployeeById(decoded.employeeId);
        } else if (decoded.studentId) {
            user = await authServices.findStudentById(decoded.studentId);
        } else {
            return createError(400, 'Invalid token payload');
        }

        if (!user || user.resetPasswordToken !== token || new Date() > user.resetPasswordExpires) {
            return createError(400, 'Invalid or expired token');
        }

        const hashedPassword = await hashServices.hash(newPassword);

        if (decoded.employeeId) {
            await authServices.updateEmployeePassword(user.id, hashedPassword);
        } else if (decoded.studentId) {
            await authServices.updateStudentPassword(user.id, hashedPassword);
        }

        res.status(200).json({ message: 'Password has been reset successfully' });
    } catch (error) {
        console.log('Error from resetPassword:', error);
        next(error);
    }
};
authController.currentUser = async (req, res, next) => {
    try {
        const userId = req.user.id
        const firstName = req.user.firstName

        console.log('req.user :>> ', req.user);

        if (!userId) {
            return createError(400, 'Check token expired date')
        }
        if (!firstName) {
            return createError(400, 'Check token expired date')
        }

        const currentUser = await authServices.currentUser(userId, firstName);
        if (!currentUser) {
            return createError(404, 'User not found');
        }
        delete currentUser.password;
        res.status(200).json(currentUser);
    } catch (error) {
        console.log('error from currentUser', error);
        next(error);
    }
}

module.exports = authController;