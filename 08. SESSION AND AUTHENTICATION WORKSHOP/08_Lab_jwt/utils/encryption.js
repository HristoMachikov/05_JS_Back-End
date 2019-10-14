const bcrypt = require('bcrypt');
// const crypto = require('crypto');

const saltRounds = 9;

module.exports = {
    generateSalt: () =>
        bcrypt.genSalt(saltRounds),
    // crypto.randomBytes(128).toString('base64'),
    // generateHashedPassword: (salt, password) =>
    generateHashedPassword: (password,salt) =>
        bcrypt.hash(password, salt)
    // crypto.createHmac('sha256', salt).update(password).digest('hex')
};