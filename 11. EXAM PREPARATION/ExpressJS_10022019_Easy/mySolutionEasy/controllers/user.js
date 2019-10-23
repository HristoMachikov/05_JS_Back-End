const User = require('../models/User');
const TokenBlacklist = require('../models/TokenBlacklist');
const { handleError, handleErrors } = require('./index');
const utils = require('../utils');
const encryption = require('../utils/encryption');
const { userCookieName } = require('../app-config');

function loginGet(req, res) {
    res.render('user/login');
}
function loginPost(req, res, next) {
    const { username, password } = req.body;
  
    let userBody = { username, password };
    console.log(userBody)
    // const regex = /^[a-zA-Z0-9]*[a-zA-Z0-9]$/;
    if (!username || !password) {
        const error = "Pleas fill all fields!";
        handleError(error, res);
        res.render('user/login', userBody);
        return;
    }
    // if (!regex.test(password) || !regex.test(username)) {
    //     const error = "Password and username should consist only with English letters and digits"
    //     handleError(error, res);
    //     res.render('user/login', userBody);
    //     return;
    // }
    // if (username.length < 4 || password.length < 4) {
    //     const error = "Password and username should be at least 4 characters long"
    //     handleError(error, res);
    //     res.render('user/login', userBody);
    //     return;
    // }
    User.findOne({ username })
        // .then((user) => Promise.all([user, user ? user.matchPassword(password) : false]))
        .then((user) => Promise.all([user, user ? user.matchPassword(password) : false]))
        .then(([user, match]) => {
            if (!match) {
                const error = "Wrong password or username!";
                handleError(error, res);
                res.render('user/login', userBody);
                return;
            }
            const token = utils.jwt.createToken({ id: user._id });
            res.cookie(userCookieName, token);
            res.redirect('/');
        })
    // .catch((err) => {
    //     handleErrors(err, res);
    //     res.render('user/login', userBody);
    // })
}
function registerGet(req, res) {
    res.render('user/register');
}
function registerPost(req, res, next) {
    const { username, password, repeatPassword } = req.body;
    let userBody = { username, password, repeatPassword };

    if (password !== repeatPassword) {
        const error = "Both passwords should match!"
        handleError(error, res);
        res.render('user/register', userBody);
        return;
    }
    return User.create({ username, password }).then(() => {
        res.redirect('/user/login');
    }).catch(err => {
        if (err.name === 'MongoError' && err.code === 11000) {
            const error = "User with this name exist!"
            handleError(error, res);
            res.render('user/register', userBody);
            return;
        }
        handleErrors(err, res);
        res.render('user/register', userBody);
        // next(err);
    });
}

function logoutGet(req, res) {
    const token = req.cookies[userCookieName];
    TokenBlacklist.create({ token }).then(() => {
        res.clearCookie(userCookieName);
        res.redirect('/');
    })
}

module.exports = {
    loginGet,
    loginPost,
    registerGet,
    registerPost,
    logoutGet
};