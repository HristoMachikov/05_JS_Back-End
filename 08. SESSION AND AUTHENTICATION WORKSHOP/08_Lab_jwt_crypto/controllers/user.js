const User = require('../models/User');
const TokenBlacklist = require('../models/TokenBlacklist');
const encryption = require('../utils/encryption');
const { handleError } = require('./index');
const utils = require('../utils');
const { userCookieName } = require('../app-config');

function loginGet(req, res) {
    res.render('user/login');
}
function loginPost(req, res, next) {
    const { username, password } = req.body;
    let userBody = { username, password };
    User.findOne({ username })
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

}
function registerGet(req, res) {
    res.render('user/register');
}
function registerPost(req, res, next) {
    const { username, password, repeatPassword } = req.body;
    let userBody = { username, password, repeatPassword };
    if (!username || !password || !repeatPassword) {
        const error = "Pleas fill all fields!";
        handleError(error, res);
        // userBody.errors = { repeatPassword: "Pleas fill all fields!" };
        res.render('user/register', userBody);
        return;
    }
    if (password !== repeatPassword) {
        const error = "Both passwords should match!"
        handleError(error, res);
        // userBody.errors = { repeatPassword: "Both passwords should match!" };
        res.render('user/register', userBody);
        return;
    }

    // User.findOne({ username }).then((user) => {
    //     if (user) {
    //         const error = "User with this name exist!"
    //         handleErrors(error, res);
    //         res.render('user/register', userBody);
    //         // res.render('user/register', {
    //         //     userBody,
    //         //     errors: { username: "User with this name exist!" }
    //         // });
    //         return;
    //     }
    return User.create({ username, password })
        // })
        .then(() => {
            res.redirect('/user/login');
        }).catch(err => {
            if (err.name === 'MongoError' && err.code === 11000) {
                const error = "User with this name exist!"
                handleError(error, res);
                res.render('user/register', userBody);
                return;
            }
            next(err);
        });
}

function logoutGet(req, res) {
    const token = req.cookies[userCookieName];
    TokenBlacklist.create({ token }).then(() => {
        res.clearCookie(userCookieName).redirect('/');
    })
}

module.exports = {
    loginGet,
    loginPost,
    registerGet,
    registerPost,
    logoutGet
};