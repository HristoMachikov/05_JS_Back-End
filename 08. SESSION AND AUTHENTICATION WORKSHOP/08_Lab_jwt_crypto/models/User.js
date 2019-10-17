const { Schema, model } = require('mongoose');
const encryption = require('../utils/encryption');

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username required'],
        unique: true,
        validate: [{
            validator: function (v) {
                return /^[a-zA-Z0-9]*[a-zA-Z0-9]$/.test(v);
            },
            message: props => `${props.value} is not a valid username!`
        },
        {
            validator: function (v) {
                return v.length >= 4;
            },
            message: props => `username should be at least 4 characters long!`
        }]
    },
    password: {
        type: Schema.Types.String,
        required: [true, 'Password required'],
        validate: [{
            validator: function (v) {
                return /^[a-zA-Z0-9]*[a-zA-Z0-9]$/.test(v);
            },
            message: props => `${props.value} is not a valid username!`
        },
        {
            validator: function (v) {
                return v.length >= 4;
            },
            message: props => `password should be at least 4 characters long!`
        }]
    },
    salt: { type: Schema.Types.String },
    // roles: [{ type: Schema.Types.String }]
})

// type: String,
// validate: {
//   validator: function(v) {
//     return /\d{3}-\d{3}-\d{4}/.test(v);
//   },
//   message: props => `${props.value} is not a valid phone number!`
// },
// required: [true, 'User phone number required']

userSchema.methods = {
    matchPassword: function (password) {
        return encryption.generateHashedPassword(this.salt, password) === this.password;
    }
}

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        const salt = encryption.generateSalt()
        const hash = encryption.generateHashedPassword(salt, this.password);
        this.password = hash;
        this.salt = salt;
        next();
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