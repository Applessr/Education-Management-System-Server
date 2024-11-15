const rateLimit = require('express-rate-limit');

const limiter = {};

limiter.studentLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 นาที
    max: 100, // จำกัดให้ใช้ API ได้ไม่เกิน 100 ครั้งใน 15 นาที
    message: 'Too many requests from this IP, please try again after 15 minutes.',
    standardHeaders: true,
    legacyHeaders: false,
});

limiter.employeeLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 นาที
    max: 200, // จำกัดให้ผู้ดูแลระบบสามารถใช้ได้สูงสุด 200 ครั้งใน 15 นาที
    message: 'Too many requests from this IP, please try again after 15 minutes.',
    standardHeaders: true,
    legacyHeaders: false,
});


module.exports = limiter;