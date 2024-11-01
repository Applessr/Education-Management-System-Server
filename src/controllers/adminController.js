const adminServices = require("../services/adminServices");
const hashServices = require("../services/hashServices");
const sendEmailServices = require("../services/sendEmailServices");
const studentServices = require("../services/studentServices");
const createError = require("../utils/create-error");

const adminController = {};


adminController.registerEmployee = async (req, res, next) => {
    try {
        const { email, password, firstName, lastName, phone } = req.body;
        if (!(email && password && firstName && lastName && phone)) {
            return createError(400, 'All field is require')
        }

        const { employeeRole } = req.user
        if (employeeRole !== "ADMIN") {
            return createError(400, 'You do not have permission')
        }

        const isEmailExist = await adminServices.getEmployeeEmail(email);
        if (isEmailExist) {
            return createError(400, 'This email is already in use')
        }

        const isPhoneExist = await adminServices.getEmployeePhone(phone);
        if (isPhoneExist) {
            return createError(400, 'This phone number is already in use')
        }

        const hashPassword = await hashServices.hash(password);

        const result = await adminServices.createEmployee({ email, password: hashPassword, firstName, lastName, phone })

        console.log(result)
        res.status(201).json({ email, firstName, lastName, phone })
    } catch (error) {
        console.log('Error from registerEmployee', error)
        next(error);
    }
};
adminController.registerStudent = async (req, res, next) => {
    try {

        const { studentId, email, password, firstName, lastName, phone, dateOfBirth, gender, address, admitDate, majorId, adviserId } = req.body;
        if (!(studentId && email && password && firstName && lastName && phone && gender && admitDate && majorId)) {
            return createError(400, 'Please fill all require field')
        }

        const { employeeRole } = req.user
        if (employeeRole !== "ADMIN") {
            return createError(400, 'You do not have permission')
        }

        const isStudentIdExist = await adminServices.getStudentId(studentId);
        if (isStudentIdExist) {
            return createError(400, 'This studentId is already exist')
        }

        const isEmailExist = await adminServices.getStudentEmail(email);
        if (isEmailExist) {
            return createError(400, 'This email is already in use')
        }

        const isPhoneExist = await adminServices.getStudentPhone(phone);
        if (isPhoneExist) {
            return createError(400, 'This phone number is already in use')
        }

        const hashPassword = await hashServices.hash(password);

        const result = await adminServices.createStudent({ studentId, email, password: hashPassword, firstName, lastName, phone, dateOfBirth, gender, address, admitDate, majorId, adviserId });

        // await sendEmailServices.sendStudentAccount(studentId, firstName, lastName, email, password)
        console.log(result)
        res.status(201).json({ studentId, email, firstName, lastName, phone })

    } catch (error) {
        console.log('Error from registerStudent', error)
        next(error);
    }
};
adminController.getSelfProfile = async (req, res, next) => {
    try {
        const userId = req.user.id
        if (!userId) {
            return createError(400, 'Check token expired date')
        }

        const { employeeRole } = req.user
        if (employeeRole !== "ADMIN") {
            return createError(400, 'You do not have permission')
        }

        const adminInfo = await adminServices.getEmployeeById(userId);
        if (!adminInfo) {
            return createError(404, 'User not found')
        }
        delete adminInfo.password;
        res.status(200).json(adminInfo);

    } catch (error) {
        console.log('Error from getSelfProfile', error)
        next(error);
    }
}
adminController.getAllStudent = async (req, res, next) => {
    try {
        const userId = req.user.id
        if (!userId) {
            return createError(400, 'Check token expired date')
        }

        const { employeeRole } = req.user
        if (employeeRole !== "ADMIN") {
            return createError(400, 'You do not have permission')
        }

        const allStudent = await adminServices.getAllStudent();

        res.status(200).json(allStudent);

    } catch (error) {
        console.log('Error from getAllStudent', error)
        next(error);
    }
};
adminController.getAllEmployee= async (req, res, next) => {
    try {
        const userId = req.user.id
        if (!userId) {
            return createError(400, 'Check token expired date')
        }

        const { employeeRole } = req.user
        if (employeeRole !== "ADMIN") {
            return createError(400, 'You do not have permission')
        }

        const getAllEmployee = await adminServices.getAllEmployee();

        res.status(200).json(getAllEmployee);

    } catch (error) {
        console.log('Error from getAllStudent', error)
        next(error);
    }
};
adminController.getStudentById= async (req, res, next) => {
    try {
        const userId = req.user.id
        if (!userId) {
            return createError(400, 'Check token expired date')
        }
        const {studentId} = req.params
        console.log(req.params)
        if(!studentId) {
            return createError(400,'Student ID is require')
        }

        const { employeeRole } = req.user
        if (employeeRole !== "ADMIN") {
            return createError(400, 'You do not have permission')
        }

        const getStudent = await studentServices.getStudentProfile(studentId);

        res.status(200).json(getStudent);

    } catch (error) {
        console.log('Error from getAllStudent', error)
        next(error);
    }
}

module.exports = adminController;