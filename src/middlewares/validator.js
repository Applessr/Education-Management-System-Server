const Joi = require('joi');
const createError = require('../utils/create-error');

const registerEmployeeSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: false })
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Email must be a valid email address"
        }),
    password: Joi.string()
        .required()
        .pattern(/^[0-9a-zA-Z]{6,40}$/)
        .messages({
            "string.empty": "Password is required",
            "string.pattern.base": "Password must contain a-z A-Z 0-9 and must be at least 6 characters."
        }),
    firstName: Joi.string()
        .required()
        .messages({
            "string.empty": "First name is required"
        }),
    lastName: Joi.string()
        .required()
        .messages({
            "string.empty": "Last name is required"
        }),
    phone: Joi.string()
        .optional()
        .pattern(/^[0-9]{10}$/)
        .messages({
            "string.pattern.base": "Phone number must be a 10-digit number"
        }),
    majorId: Joi.number()
        .integer()
        .optional()
        .messages({
            "number.base": "Major ID is required and must be an integer"
        })
});

const registerStudentSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: false })
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Email must be a valid email address"
        }),
    studentId: Joi.string()
        .pattern(/^[0-9a-zA-Z]{3,10}$/)
        .required()
        .messages({
            "string.empty": "Student ID is required",
            "string.pattern.base": "Student ID must contain a-z A-Z 0-9 and must be between 3 to 10 characters."
        }),
    password: Joi.string()
        .required()
        .pattern(/^[0-9a-zA-Z]{6,40}$/)
        .messages({
            "string.empty": "Password is required",
            "string.pattern.base": "Password must contain a-z A-Z 0-9 and must be at least 6 characters."
        }),
    firstName: Joi.string()
        .required()
        .messages({
            "string.empty": "First name is required"
        }),
    lastName: Joi.string()
        .required()
        .messages({
            "string.empty": "Last name is required"
        }),
    phone: Joi.string()
        .optional()
        .pattern(/^[0-9]{10}$/)
        .messages({
            "string.pattern.base": "Phone number must be a 10-digit number"
        }),
    dateOfBirth: Joi.date()
        .optional()
        .messages({
            "date.base": "Date of Birth must be a valid date"
        }),
    address: Joi.string()
        .optional()
        .max(255)
        .messages({
            "string.max": "Address must be less than or equal to 255 characters"
        }),
    gender: Joi.string()
        .valid('MALE', 'FEMALE')
        .required()
        .messages({
            "any.only": "Gender must be either MALE or FEMALE"
        }),
    admitDate: Joi.date()
        .required()
        .messages({
            "date.base": "Admit Date must be a valid date",
            "date.empty": "Admit Date is required"
        }),
    status: Joi.string()
        .valid('ACTIVE', 'INACTIVE', 'GRADUATED')
        .default('ACTIVE')
        .messages({
            "any.only": "Status must be ACTIVE, INACTIVE, or GRADUATED"
        }),
    adviserId: Joi.number()
        .integer()
        .optional()
        .messages({
            "number.base": "Adviser ID must be an integer"
        }),
    majorId: Joi.number()
        .integer()
        .required()
        .messages({
            "number.base": "Major ID is required and must be an integer"
        })
});

const loginEmployeeSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: false })
        .required()
        .messages({
            "string.empty": "Email is required"
        }),
    password: Joi.string()
        .required()
        .min(6)
        .messages({
            "string.empty": "Password is required",
            "string.min": "Password must be at least 6 characters long"
        })
}).required();

const loginStudentSchema = Joi.object({
    identifier: Joi.alternatives()
        .try(
            Joi.string()
                .email({ tlds: false })
                .messages({
                    "string.email": "Please enter a valid email address",
                    "string.empty": "Email is required if username is not provided"
                }),
            Joi.string()
                .pattern(/^[0-9a-zA-Z]{3,10}$/)
                .messages({
                    "string.pattern.base": "studentId must contain only letters (a-z, A-Z) and numbers (0-9) and be at least 3 characters long",
                    "string.empty": "studentId is required if email is not provided"
                })
        )
        .required(),
    password: Joi.string()
        .required()
        .min(6)
        .messages({
            "string.empty": "Password is required",
            "string.min": "Password must be at least 6 characters long"
        })
}).required();

const validateSchema = (schema) => (req, res, next) => {
    const { value, error } = schema.validate(req.body);
    if (error) {
        return createError(400, error.details[0].message);
    }
    req.input = value;
    next();
};


exports.registerEmployeeValidator = validateSchema(registerEmployeeSchema);
exports.registerStudentValidator = validateSchema(registerStudentSchema);
exports.loginEmployeeValidator = validateSchema(loginEmployeeSchema);
exports.loginStudentValidator = validateSchema(loginStudentSchema);