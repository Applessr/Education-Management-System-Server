const hashServices = require("../services/hashServices");
const teacherServices = require("../services/teacherServices");
const createError = require("../utils/create-error");

const teacherController = {};


teacherController.getProfile = async (req, res, next) => {
    try {

        const teacherId = req.user.id
        if (!teacherId) {
            return createError(400, 'Check token expired date')
        }
        const teacherInfo = await teacherServices.teacherProfile(teacherId);
        if (!teacherInfo) {
            return createError(404, 'Account not found')
        }
        delete teacherInfo.password;
        res.status(200).json(teacherInfo);
    } catch (error) {
        console.log('Error from teacher getProfile', error)
        next(error);
    }

};
teacherController.teacherChangePassword = async (req, res, next) => {
    try {
        const { employeeRole } = req.user
        if (employeeRole !== "TEACHER") {
            return createError(400, 'You do not have permission')
        }
        const teacherId = req.user.id
        if (!teacherId) {
            return createError(400, 'Check token expired date')
        }

        const account = await teacherServices.teacherProfile(teacherId);
        if (!account) {
            return createError(404, 'Account not found')
        }

        const { currentPassword, newPassword, confirmPassword } = req.body;
        if (!(currentPassword && newPassword && confirmPassword)) {
            return createError(400, 'All field is require')
        }

        if (newPassword !== confirmPassword) {
            return createError(400, 'New password and confirm password do not match');
        }

        const isMatch = await hashServices.compare(currentPassword, account.password);
        if (!isMatch) {
            return createError(400, 'Current password is incorrect');
        }
        if (newPassword.length < 6) {
            return createError(400, 'New password must be at least 6 characters long');
        }

        let changePassword = await hashServices.hash(newPassword);

        const updatedAccount = await teacherServices.changePassword(teacherId, { password: changePassword });
        delete updatedAccount.password;

        res.status(200).json({ message: 'password change successfully' });

    } catch (error) {
        console.log('Error from teacher change password', error)
        next(error);
    }
};
teacherController.getStudentInCourse = async (req, res, next) => {
    try {
        const { employeeRole } = req.user
        if (employeeRole !== "TEACHER") {
            return createError(400, 'You do not have permission')
        }
        const teacherId = req.user.id
        if (!teacherId) {
            return createError(400, 'Check token expired date')
        }
        const studentInCourse = await teacherServices.getStudentInCourse(teacherId);

        res.status(200).json(studentInCourse);

    } catch (error) {
        console.log('Error from getConsultedStudent', error)
        next(error);
    }
};
teacherController.getStudentInCourseById = async (req, res, next) => {
    try {
        const { employeeRole } = req.user
        if (employeeRole !== "TEACHER") {
            return createError(400, 'You do not have permission')
        }
        const teacherId = req.user.id
        console.log('teacherId :>> ', teacherId);
        if (!teacherId) {
            return createError(400, 'Check token expired date')
        }
        const { courseId } = req.params
        console.log('courseId :>> ', courseId);
        if (!courseId) {
            return createError(400, 'courseId is require')
        }
        const studentInCourse = await teacherServices.getStudentInCourseById(teacherId, courseId);

        res.status(200).json(studentInCourse);

    } catch (error) {
        console.log('Error from getConsultedStudent', error)
        next(error);
    }
};
teacherController.getConsultedStudent = async (req, res, next) => {
    try {
        const { employeeRole } = req.user
        if (employeeRole !== "TEACHER") {
            return createError(400, 'You do not have permission')
        }
        const teacherId = req.user.id
        if (!teacherId) {
            return createError(400, 'Check token expired date')
        }
        const studentInfo = await teacherServices.getConsultedStudent(teacherId);

        res.status(200).json(studentInfo);

    } catch (error) {
        console.log('Error from getConsultedStudent', error)
        next(error);
    }
};
teacherController.getEnrollRequest = async (req, res, next) => {
    try {
        const { employeeRole } = req.user
        if (employeeRole !== "TEACHER") {
            return createError(400, 'You do not have permission')
        }

        const teacherId = req.user.id
        if (!teacherId) {
            return createError(400, 'Check token expired date')
        }
        const enrollRequest = await teacherServices.getEnrollRequest(teacherId);

        res.status(200).json(enrollRequest);

    } catch (error) {
        console.log('Error from getEnrollRequest', error)
        next(error);
    }
};
teacherController.getSectionRequest = async (req, res, next) => {
    try {
        const { employeeRole } = req.user
        if (employeeRole !== "TEACHER") {
            return createError(400, 'You do not have permission')
        }

        const teacherId = req.user.id
        if (!teacherId) {
            return createError(400, 'Check token expired date')
        }
        const changeSectionRequest = await teacherServices.getSectionRequest(teacherId);

        res.status(200).json(changeSectionRequest);

    } catch (error) {
        console.log('Error from getSectionRequest', error)
        next(error);
    }
};
teacherController.sendRequestChange = async (req, res, next) => {
    try {
        const teacherId = req.user.id
        if (!teacherId) {
            return createError(400, 'Check token expired date')
        }

        const { fieldToChange, newValue } = req.body
        if (!(fieldToChange && newValue)) {
            return createError('All field is require')
        }

        const request = await teacherServices.sendRequestChange(teacherId, fieldToChange, newValue)
        res.status(201).json(request);
    } catch (error) {
        console.log('Error from sendRequestChange', error)
        next(error);
    }

};
teacherController.sendAnnounce = async (req, res, next) => {
    try {
        const { employeeRole } = req.user
        if (employeeRole !== "TEACHER") {
            return createError(400, 'You do not have permission')
        }

        const teacherId = req.user.id
        if (!teacherId) {
            return createError(400, 'Check token expired date')
        }

        const { title, content, courseId } = req.body
        if (!(title && content && courseId)) {
            return createError('All field is require')
        }

        const announce = await teacherServices.sendAnnounce(teacherId, title, content, courseId)
        res.status(201).json(announce);
    } catch (error) {
        console.log('Error from sendAnnounce', error)
        next(error);
    }

};
teacherController.editEnrollStatus = async (req, res, next) => {
    try {

        const { employeeRole } = req.user
        if (employeeRole !== "TEACHER") {
            return createError(400, 'You do not have permission')
        }

        const { enrollmentId } = req.params
        if (!enrollmentId) {
            return createError(400, 'enrollmentId is require')
        }
        console.log('enrollmentId :>> ', enrollmentId);

        const { status } = req.body
        if (!status) {
            return createError('update status is require')
        }

        const updateStatus = await teacherServices.editEnrollStatus(enrollmentId, status)
        res.status(200).json(updateStatus);
    } catch (error) {
        console.log('Error from sendAnnounce', error)
        next(error);
    }

};
teacherController.editRequestSection = async (req, res, next) => {
    try {

        const { employeeRole } = req.user
        if (employeeRole !== "TEACHER") {
            return createError(400, 'You do not have permission')
        }

        const { requestId } = req.params
        if (!requestId) {
            return createError(400, 'enrollmentId is require')
        }

        const { status } = req.body
        if (!status) {
            return createError('update status is require')
        }

        const updateStatus = await teacherServices.editEnrollStatus(requestId, status)
        res.status(200).json(updateStatus);
    } catch (error) {
        console.log('Error from sendAnnounce', error)
        next(error);
    }

};
teacherController.editStudentSection = async (req, res, next) => {
    try {

        const { employeeRole } = req.user
        if (employeeRole !== "TEACHER") {
            return createError(400, 'You do not have permission')
        }

        const { enrollmentId } = req.params
        if (!enrollmentId) {
            return createError(400, 'enrollmentId is require')
        }

        const { courseId } = req.body
        if (!courseId) {
            return createError('update section is require')
        }

        const updateSection = await teacherServices.editStudentSection(enrollmentId, courseId)
        res.status(200).json(updateSection);
    } catch (error) {
        console.log('Error from sendAnnounce', error)
        next(error);
    }

};


module.exports = teacherController;