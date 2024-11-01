
const authServices = require("../services/authServices");
const jwtServices = require("../services/jwtServices");
const createError = require("../utils/create-error");


const authenticate = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization || !authorization.startsWith('Bearer ')) {
            return createError(401, 'Unauthorized');
        }

        const token = authorization.split(" ")[1];
        if (!token) {
            return createError(401, 'Unauthorized');
        }

        const jwtPayload = jwtServices.verify(token);
        if (!jwtPayload || !jwtPayload.id) {
            return createError(401, 'Unauthorized: Invalid token');
        }

        const accountType = jwtPayload.type;
        console.log('accountType',accountType)

        if (accountType === 'EMPLOYEE') {
            account = await authServices.findEmployeeById(jwtPayload.id);
        } else if (accountType === 'STUDENT') {
            account = await authServices.findStudentById(jwtPayload.id);
        } else {
            return createError(401, 'Unauthorized: Invalid user type');
        }

        delete account.password;
        req.user = account;
        next();

    } catch (err) {
        console.log('error from authenticate', err);
        next(err);
    }
};

module.exports = authenticate;