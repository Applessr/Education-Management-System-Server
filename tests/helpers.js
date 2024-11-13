const prisma = require("../src/configs/prisma");
const hashServices = require('../src/services/hashServices');

async function createTestEmployee({ email, password }) {
    const hashedPassword = await hashServices.hash(password);
    const employee = await prisma.employee.upsert({
        where: { email },  // ตรวจสอบที่ email
        update: {          // ถ้ามี email นี้อยู่แล้ว ให้ทำการอัพเดต
            password: hashedPassword,
            firstName: "Test",
            lastName: "Employee",
            employeeRole: "TEACHER",
            phone: "0987654321",
            majorId: 1,
        },
        create: {          // ถ้าไม่มี email นี้ ให้สร้างใหม่
            email,
            password: hashedPassword,
            firstName: "Test",
            lastName: "Employee",
            employeeRole: "TEACHER",
            phone: "0987654321",
            majorId: 1,
        },
    });
    return employee;
}

async function createTestStudent({ email, password }) {
    const hashedPassword = await hashServices.hash(password);
    const student = await prisma.student.upsert({
        where: { email },  // ตรวจสอบที่ email
        update: {          // ถ้ามี email นี้อยู่แล้ว ให้ทำการอัพเดต
            password: hashedPassword,
            firstName: 'Test',
            lastName: 'User',
            phone: '0987654321',
            dateOfBirth: "2003-04-30T00:00:00.000Z",
            address: "123 Maple Street, Los Angeles, CA, 90001, USA",
            admitDate: "2021-06-07T00:00:00.000Z",
            majorId: 1,
            adviserId: 4,
            gender: "FEMALE"
        },
        create: {          // ถ้าไม่มี email นี้ ให้สร้างใหม่
            email,
            password: hashedPassword,
            studentId: 'SomeID',
            firstName: 'Test',
            lastName: 'User',
            phone: '0987654321',
            dateOfBirth: "2003-04-30T00:00:00.000Z",
            address: "123 Maple Street, Los Angeles, CA, 90001, USA",
            admitDate: "2021-06-07T00:00:00.000Z",
            majorId: 1,
            adviserId: 4,
            gender: "FEMALE"
        },
    });
    return student;
}

module.exports = {
    createTestEmployee,
    createTestStudent,
};