const hashServices = {};
const bcrypt = require('bcryptjs')

hashServices.hash = (password) => {
    return bcrypt.hash(password,10);
};

hashServices.compare = (password, hashValue) => {
    return bcrypt.compare(password,hashValue);
};

module.exports = hashServices;