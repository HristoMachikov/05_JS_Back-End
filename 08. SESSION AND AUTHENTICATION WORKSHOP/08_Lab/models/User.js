const { Schema, model } = require('mongoose');
const encryption = require('../util/encryption');

const userSchema = new Schema({
    username: { type: Schema.Types.String, required: true },
    hashedPass: { type: Schema.Types.String, required: true },
    salt: { type: Schema.Types.String, required: true },
    roles: [{ type: Schema.Types.String }]
})

userSchema.method({
    authenticate: function (password) {
        return encryption.generateHashedPassword(this.salt, password) === this.hashedPass;
    }
});

const User = model('User', userSchema);

// TODO: Create an admin at initialization here
User.seedAdmin = async () => {
    try {
        const users = await User.find();
        if (users.length > 0) {
            return;
        }
        const salt = encryption.generateSalt();
        const hashedPass = encryption.generateHashedPassword(salt, 'Admin');
        return User.create({
            username: 'Admin',
            hashedPass,
            salt,
            roles: ['Admin']
        });
    } catch (error) {
        console.log(error)
    }
}

// User.seedAdmin = () => {
//     User.find().then((users) => {
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
//     }).catch(err => console.log(err))
// }

module.exports = User;