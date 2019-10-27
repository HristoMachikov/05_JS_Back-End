const { Schema, model } = require('mongoose');
const encryption = require('../utils/encryption')
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
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
            message: props => `Username should be at least 4 characters long!`
        }]
    },
    password: {
        type: Schema.Types.String,
        required: [true, 'Password is required'],
        validate: [{
            validator: function (v) {
                return v.length >= 8;
            },
            message: () => `Password should be at least 8 characters long!`
        }]
    },
    amount: {
        type: Schema.Types.Number,
        required: [true, 'Amount is required'],
        // default: 0
    },
    expenses: [{ type: Schema.Types.ObjectId, ref: 'Expense' }],
    salt: { type: Schema.Types.String }
    // roles: [{ type: Schema.Types.String }]
})

userSchema.methods = {
    matchPassword: function (password) {
        let result = encryption.generateHashedPassword(this.salt, password) === this.password
        return result;
    }
}

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        // if (this.isNew && this.username === "Admin") {
        //     return next();
        // }
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
//             password: hashedPass,
//             salt,
//             roles: ['Admin']
//         });
//     } catch (error) {
//         console.log(error)
//     }
// }

module.exports = User;