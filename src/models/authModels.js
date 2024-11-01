const prisma = require("../configs/prisma");

const authModels = {};

authModels.findEmployee = async (email) => {
    return await prisma.employee.findUnique({
        where: {
            email,
        },
    });
};
authModels.findEmployeeById = async (employeeId) => {
    return await prisma.employee.findUnique({
        where: {
            id: Number(employeeId),
        },
    });
};
authModels.findStudentById = async (studentId) => {
    return await prisma.student.findUnique({
        where: {
            id: Number(studentId),
        },
    });
};
authModels.findStudent = async (identifier) => {
    const { email, studentId } = identifier;

    return await prisma.student.findUnique({
        where: email ? { email } : { studentId },
        include: {
            major: {
                include: {
                    faculty: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    });
};

authModels.CreateEmployee = async (data) => {
    return await prisma.employee.create({
        data: {
            googleId: data.googleId,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName
        },
    });
};
authModels.updateEmployee = async (id, data) => {
    return await prisma.employee.update({
        where: {
            id: id,
        },
        data: data,
    });
};
authModels.findGoogleId = async (googleId) => {
    return await prisma.employee.findUnique({
        where: {
            googleId,
        },
    });
};
authModels.updateResetPassword = async (email, token, expiryDate) => {
    return await prisma.employee.update({
        where: {
            email: email,
        },
        data: {
            resetPasswordToken: token,
            resetPasswordExpires: expiryDate
        },
    });
};
authModels.updatePassword = async (employeeId, hashedPassword) => {
    return await prisma.employee.update({
        where: {
            id: Number(employeeId)
        },
        data: {
            password: hashedPassword,
            resetPasswordToken: null,
            resetPasswordExpires: null,
        },
    });
};


module.exports = authModels;