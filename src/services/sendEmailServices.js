const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmailServices = {};


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

sendEmailServices.sendStudentAccount = async (studentId, firstName, lastName, email, password) => {
    console.log('Email User:', process.env.EMAIL_USER);
    console.log('Email Pass:', process.env.EMAIL_PASS);
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: ' Your University Login Credentials for Registration System',
        text: `Dear  ${firstName} ${lastName},
We are pleased to provide you with your login credentials for the university registration system. 
With these credentials, you will be able to register for courses and access various university services. 
Please find your login details below:

Student ID: ${studentId}
Password: ${password}

Steps to Access the System:

Go to the university registration system website
Enter your "Student ID" and "Password" in the designated fields.
Once logged in, please navigate to the "Account Settings" or "Profile" page to change your password immediately.
If you encounter any issues with logging in or need further assistance, please contact our IT support team.
We wish you the best in your studies.

Best regards,
Pierre University`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};


sendEmailServices.sendResetEmail = async (email, token, username) => {
    const resetLink = `http://localhost:5173/reset-password?token=${token}`;
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'รีเซ็ตรหัสผ่านของคุณ',
        text: `reset token: ${token}`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmailServices;