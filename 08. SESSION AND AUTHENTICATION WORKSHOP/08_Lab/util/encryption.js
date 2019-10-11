const bcrypt = require('bcrypt');
// const crypto = require('crypto');

const saltRounds = 9;

// bcrypt.genSalt(saltRounds, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         if (err) {
//             next(err);
//             return;
//         }
//         users = users.concat({ id: 2, username, password: hash });
//         res.redirect('/');
//     })
// })

module.exports = {
    generateSalt: () =>
        bcrypt.genSalt(saltRounds),
    // crypto.randomBytes(128).toString('base64'),
    generateHashedPassword: (salt, password) =>
        bcrypt.hash(password, salt)
    // crypto.createHmac('sha256', salt).update(password).digest('hex')
};