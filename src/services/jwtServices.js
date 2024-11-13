require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtServices = {};

jwtServices.sign = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
};

jwtServices.verify = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

jwtServices.signResetToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET,{expiresIn: '1h'});
};


module.exports = jwtServices;