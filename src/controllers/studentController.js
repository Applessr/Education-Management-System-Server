const hashServices = require("../services/hashServices");
const studentServices = require("../services/studentServices");
const createError = require("../utils/create-error");


const studentController = {};

studentController.getCredit = async (req, res, next) => {
    try {
        const userId = req.user.id
        if (!userId) {
            return createError(400, 'Check token expired date')
        }
        const studentCredit = await studentServices.getCredit(userId);

        res.status(200).json(studentCredit);
    } catch (error) {
        console.log('Error from student getProgress', error)
        next(error);
    }

};
studentController.getProfile = async (req, res, next) => {
    try {
        const userId = req.user.id
        if (!userId) {
            return createError(400, 'Check token expired date')
        }
        const studentInfo = await studentServices.getStudentProfile(userId);
        if (!studentInfo) {
            return createError(404, 'User not found')
        }
        delete studentInfo.password;
        res.status(200).json(studentInfo);
    } catch (error) {
        console.log('Error from student getProfile', error)
        next(error);
    }

};
studentController.getNotification = async (req, res, next) => {
    try {
        const userId = req.user.id
        if (!userId) {
            return createError(400, 'Check token expired date')
        }
        const notification = await studentServices.getNotification(userId);

        res.status(200).json(notification);
    } catch (error) {
        console.log('Error from student getNotification', error)
        next(error);
    }

};
studentController.getExamDate = async (req, res, next) => {
    try {
        const userId = req.user.id
        if (!userId) {
            return createError(400, 'Check token expired date')
        }
        const examDate = await studentServices.getExamDate(userId);

        res.status(200).json(examDate);
    } catch (error) {
        console.log('Error from student getExamDate', error)
        next(error);
    }

};
studentController.studentChangePassword = async (req, res, next) => {
    try {
        const userId = req.user.id
        if (!userId) {
            return createError(400, 'Check token expired date')
        }

        const studentInfo = await studentServices.getStudentProfile(userId);
        if (!studentInfo) {
            return createError(404, 'User not found')
        }

        const { currentPassword, newPassword, confirmPassword } = req.body;
        if (!(currentPassword && newPassword && confirmPassword)) {
            return createError(400, 'All field is require')
        }

        if (newPassword !== confirmPassword) {
            return createError(400, 'New password and confirm password do not match');
        }

        const isMatch = await hashServices.compare(currentPassword, studentInfo.password);
        if (!isMatch) {
            return createError(400, 'Current password is incorrect');
        }

        if (newPassword.length < 6) {
            return createError(400, 'New password must be at least 6 characters long');
        }

        let changePassword = await hashServices.hash(newPassword);

        const updatedUser = await studentServices.changePassword(userId, { password: changePassword });
        delete updatedUser.password;

        res.status(200).json({ message: 'password change successfully' });

    } catch (error) {
        console.log('Error from student change password', error)
        next(error);
    }
};
studentController.sendRequestChange = async (req, res, next) => {
    try {
        const userId = req.user.id
        if (!userId) {
            return createError(400, 'Check token expired date')
        }

        const { fieldToChange, newValue } = req.body
        if (!(fieldToChange && newValue)) {
            return createError('All field is require')
        }

        const request = await studentServices.sendRequestChange(userId, fieldToChange, newValue)
        res.status(201).json(request);
    } catch (error) {
        console.log('Error from sendRequestChange', error)
        next(error);
    };

};
studentController.sendRequestSection = async (req, res, next) => {
    try {
        const userId = req.user.id
        if (!userId) {
            return createError(400, 'Check token expired date')
        }

        const { courseId, currentSection, newSection, teacherId } = req.body
        if (!(courseId && currentSection && newSection && teacherId)) {
            return createError('All fields is require')
        }

        const request = await studentServices.sendRequestSection(userId, courseId, currentSection, newSection, teacherId)
        res.status(201).json(request);
    } catch (error) {
        console.log('Error from sendRequestChange', error)
        next(error);
    };

};




module.exports = studentController;