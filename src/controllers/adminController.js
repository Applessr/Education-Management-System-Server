const adminServices = require("../services/adminServices");
const hashServices = require("../services/hashServices");
const sendEmailServices = require("../services/sendEmailServices");
const studentServices = require("../services/studentServices");
const createError = require("../utils/create-error");

const adminController = {};


adminController.registerEmployee = async (req, res, next) => {
    try {
        const { email, password, firstName, lastName, phone, majorId } = req.body;
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

        const result = await adminServices.createEmployee({ email, password: hashPassword, firstName, lastName, phone, majorId })

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

        const isStudentIdExist = await adminServices.findStudentCode(studentId);
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
adminController.overAll = async (req, res, next) => {
    try {
        const { employeeRole } = req.user
        if (employeeRole !== "ADMIN") {
            return createError(400, 'You do not have permission')
        }

        const overAll = await adminServices.overAll();
        if (!overAll) {
            return createError(404, 'No information found')
        }
        res.status(200).json(overAll);

    } catch (error) {
        console.log('Error from getSelfProfile', error)
        next(error);
    }
}
adminController.courseSyllabus = async (req, res, next) => {
    try {
        const { employeeRole } = req.user
        if (employeeRole !== "ADMIN") {
            return createError(400, 'You do not have permission')
        }

        const { majorId } = req.params
        if (!majorId) {
            return createError(400, 'majorId is require')
        }

        const { year } = req.query;

        const courseSyllabus = await adminServices.courseSyllabus(majorId, year);
        if (!courseSyllabus) {
            return createError(404, 'No information found')
        }
        res.status(200).json(courseSyllabus);

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
adminController.getAllEmployee = async (req, res, next) => {
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
        console.log('Error from getAllEmployee', error)
        next(error);
    }
};
adminController.getStudentById = async (req, res, next) => {
    try {
        const userId = req.user.id
        if (!userId) {
            return createError(400, 'Check token expired date')
        }
        const { studentId } = req.params

        if (!studentId) {
            return createError(400, 'Student ID is require')
        }

        const { employeeRole } = req.user
        if (employeeRole !== "ADMIN") {
            return createError(400, 'You do not have permission')
        }

        const getStudent = await studentServices.getStudentProfile(studentId);

        res.status(200).json(getStudent);

    } catch (error) {
        console.log('Error from getStudentById', error)
        next(error);
    }
};
adminController.getEmployeeById = async (req, res, next) => {
    try {
        const userId = req.user.id
        if (!userId) {
            return createError(400, 'Check token expired date')
        }
        const { employeeId } = req.params

        if (!employeeId) {
            return createError(400, 'Student ID is require')
        }

        const { employeeRole } = req.user
        if (employeeRole !== "ADMIN") {
            return createError(400, 'You do not have permission')
        }

        const getEmployee = await adminServices.getEmployeeById(employeeId);

        res.status(200).json(getEmployee);

    } catch (error) {
        console.log('Error from getEmployeeById', error)
        next(error);
    }
};
adminController.getRequestInfo = async (req, res, next) => {
    try {

        const { employeeRole } = req.user
        if (employeeRole !== "ADMIN") {
            return createError(400, 'You do not have permission')
        }

        const allRequest = await adminServices.getRequestInfo();

        res.status(200).json(allRequest);

    } catch (error) {
        console.log('Error from getRequestInfo', error)
        next(error);
    }
};
adminController.getRequestInfoById = async (req, res, next) => {
    try {

        const { requestId } = req.params
        if (!requestId) {
            return createError(400, 'requestId is require')
        }

        const { employeeRole } = req.user
        if (employeeRole !== "ADMIN") {
            return createError(400, 'You do not have permission')
        }

        const request = await adminServices.getRequestInfoById(requestId);

        res.status(200).json(request);

    } catch (error) {
        console.log('Error from getRequestInfoById', error)
        next(error);
    }
};
adminController.changeStudentStatus = async (req, res, next) => {
    try {
        const { employeeRole } = req.user
        if (employeeRole !== "ADMIN") {
            return createError(400, 'You do not have permission')
        }

        const { studentId } = req.params
        if (!studentId) {
            return createError(400, 'studentId is require')
        }

        const { status } = req.body
        if (!studentId && status) {
            return createError(400, 'All field is require')
        }

        const changeStatus = await adminServices.changeStudentStatus(studentId, status)

        res.status(200).json({ message: `student status change to ${status}` });

    } catch (error) {
        console.log('Error from changeStudentStatus', error)
        next(error);
    }
};
adminController.changeStudentInfo = async (req, res, next) => {
    try {
        const { employeeRole } = req.user
        if (employeeRole !== "ADMIN") {
            return createError(400, 'You do not have permission')
        }
        const { studentId } = req.params
        if (!studentId) {
            return createError(400, 'studentId is require')
        }

        const { firstName, lastName, phone, address } = req.body
        if (!studentId) {
            return createError(400, 'All field is require')
        }
        console.log(studentId)

        const student = await adminServices.getStudentId(studentId);
        if (!student) {
            return next(createError(404, 'Student not found'));
        }

        if (!(firstName || lastName || phone || address)) {
            return createError(400, 'At least one field is require change')
        }

        const updatedData = {};
        if (firstName) {
            updatedData.firstName = firstName;
        }
        if (lastName) {
            updatedData.lastName = lastName;
        }
        if (phone) {
            updatedData.phone = phone;
        }
        if (address) {
            updatedData.address = address;
        }
        const updatedStudent = await adminServices.changeStudentInfo(studentId, updatedData);

        res.status(200).json(updatedData);

    } catch (error) {
        console.log('Error from changeStudentInfo', error)
        next(error);
    }
};
adminController.changeEmployeeInfo = async (req, res, next) => {
    try {
        const { employeeRole } = req.user
        if (employeeRole !== "ADMIN") {
            return createError(400, 'You do not have permission')
        }

        const { employeeId } = req.params
        if (employeeId) {
            return createError(400, 'employeeId is require')
        }

        const { firstName, lastName, phone } = req.body
        if (!employeeId) {
            return createError(400, 'Employee ID is require')
        }
        console.log(employeeId)

        const employee = await adminServices.getEmployeeById(employeeId);
        if (!employee) {
            return next(createError(404, 'employee not found'));
        }

        if (!(firstName || lastName || phone)) {
            return createError(400, 'At least one field is require change')
        }

        const updatedData = {};
        if (firstName) {
            updatedData.firstName = firstName;
        }
        if (lastName) {
            updatedData.lastName = lastName;
        }
        if (phone) {
            updatedData.phone = phone;
        }

        const updatedEmployee = await adminServices.changeEmployeeInfo(employeeId, updatedData);

        res.status(200).json(updatedData);

    } catch (error) {
        console.log('Error from changeStudentInfo', error)
        next(error);
    }
};

adminController.inactiveEmployee = async (req, res, next) => {
    try {
        const { employeeRole } = req.user
        if (employeeRole !== "ADMIN") {
            return createError(400, 'You do not have permission')
        }

        const { employeeId } = req.body
        if (!employeeId) {
            return createError(400, 'All field is require')
        }
        const employee = await adminServices.getEmployeeById(employeeId);
        console.log(employee)
        if (employee.active === false || employee.active === "false") {
            return createError(400, 'this account is already inactive')
        }

        const inactive = await adminServices.inactiveEmployee(employeeId)

        res.status(200).json({ message: `Employee Inactive account successful` });

    } catch (error) {
        console.log('Error from inactiveEmployee', error)
        next(error);
    }
};
adminController.activeEmployee = async (req, res, next) => {
    try {
        const { employeeRole } = req.user
        if (employeeRole !== "ADMIN") {
            return createError(400, 'You do not have permission')
        }

        const { employeeId } = req.body
        if (!employeeId) {
            return createError(400, 'All field is require')
        }
        const employee = await adminServices.getEmployeeById(employeeId);
        console.log(employee)
        if (employee.active === true || employee.active === "true") {
            return createError(400, 'this account is already active')
        }

        const inactive = await adminServices.activeEmployee(employeeId)

        res.status(200).json({ message: `Employee active account successful` });

    } catch (error) {
        console.log('Error from activeEmployee', error)
        next(error);
    }
};

module.exports = adminController;