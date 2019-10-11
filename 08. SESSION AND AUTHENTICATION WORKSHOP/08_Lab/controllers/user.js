const User = require('../models/User');
const encryption = require('../util/encryption');

function loginGet(req, res) {
    res.render('user/login');
}
async function loginPost(req, res) {
    const userBody = req.body;
    try {
        const user = await User.findOne({ username: userBody.username });
        if (!user) {
            userBody.error = "Username is invalid!"
            res.render('user/login', userBody);
            return;
        }
        if (!user.authenticate(userBody.password)) {
            userBody.error = "Password is invalid!"
            res.render('user/login', userBody);
            return;
        }
        req.login(user, (err) => {
            if (err) {
                req.userBody.error = err;
                res.render('user/login', userBody);
            } else {
                res.redirect('/');
            }
        });
    } catch (error) {
        handleErrors(error, res);
        // userBody.error = error;
        res.render('user/login', userBody);
    }
}
function registerGet(req, res) {
    res.render('user/register');
}
async function registerPost(req, res) {
    const userBody = req.body;
    if (!userBody.username || !userBody.password || !userBody.repeatPassword) {
        userBody.error = "Pleas fill all fields!";
        res.render('user/register', userBody);
        return;
    }
    if (userBody.password !== userBody.repeatPassword) {
        userBody.error = "Both passwords should match!";
        res.render('user/register', userBody);
        return;
    }

    const salt = encryption.generateSalt();
    const hashedPass = encryption.generateHashedPassword(salt, userBody.password);

    try {
        const user = await User.create({
            username: userBody.username,
            hashedPass,
            salt,
            roles: ['User']
        });
        req.login(user, (err) => {
            if (err) {
                req.userBody.error = err;
                res.render('user/register', userBody);
            } else {
                res.redirect('/');
            }
        });
    } catch (error) {
        handleErrors(error, res);
        // userBody.error = error;
        res.render('user/register', userBody);
    }
}
function logoutPost(req, res) {
    res.logout();
    res.redirect('/')
}

module.exports = {
    loginGet,
    loginPost,
    registerGet,
    registerPost,
    logoutPost
};