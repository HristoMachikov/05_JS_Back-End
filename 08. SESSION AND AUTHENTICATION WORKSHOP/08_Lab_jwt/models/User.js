const { Schema, model } = require('mongoose');
// const encryption = require('../util/encryption');
const bcrypt = require('bcrypt');
const saltRounds = 9;

const userSchema = new Schema({
    username: { type: Schema.Types.String, required: true, unique: true },
    password: { type: Schema.Types.String, required: true },
    // salt: { type: Schema.Types.String, required: true },
    // roles: [{ type: Schema.Types.String }]
})
userSchema.methods = {
    matchPassword: function (password) {
        return bcrypt.compare(password, this.password);
    }
}

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) { next(err); return; }
            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) { next(err); return; }
                this.password = hash;
                next();
            });
        });
        return;
    }
    next();
});

// userSchema.method({
//     authenticate: function (password) {
//         return encryption.generateHashedPassword(this.salt, password) === this.hashedPass;
//     }
// });

const User = model('User', userSchema);

// // TODO: Create an admin at initialization here
// User.seedAdmin = async () => {
//     try {
//         const users = await User.find();
//         if (users.length > 0) {
//             return;
//         }
//         const salt = encryption.generateSalt();
//         const hashedPass = encryption.generateHashedPassword(salt, 'Admin');
//         return User.create({
//             username: 'Admin',
//             hashedPass,
//             salt,
//             roles: ['Admin']
//         });
//     } catch (error) {
//         console.log(error)
//     }
// }


module.exports = User;