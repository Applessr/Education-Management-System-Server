const createEmployee = (email, password) => {
    return {
        id: Date.now(),
        email,
        password, // เพิ่มรหัสผ่านเพื่อการเข้าสู่ระบบ
        createdAt: new Date()
    };
};

const createStudent = (email, password) => {
    return {
        id: Date.now(),
        email,
        password, // เพิ่มรหัสผ่านเพื่อการเข้าสู่ระบบ
        createdAt: new Date()
    };
};

const createTestUser = (username, email) => {
    return {
        id: Date.now(),
        username,
        email,
        createdAt: new Date()
    };
};

// Exporting the functions
module.exports = {
    createEmployee,
    createStudent,
    createTestUser
};