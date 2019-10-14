const User = require('../models/User');
const encryption = require('../utils/encryption');
const { handleError } = require('./index');
const utils = require('../utils');
const userCookieName = "user_cookie";

function loginGet(req, res) {
    res.render('user/login');
}
function loginPost(req, res, next) {
    const { username, password } = req.body;
    let userBody = { username, password };
    User.findOne({ username })
    .then((user) => Promise.all([user, user.matchPassword(password)]))
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
    // try {
    //     const user = await User.findOne({ username: userBody.username });
    //     if (!user) {
    //         // userBody.error = "Username is invalid!"
    //         const error = "Username is invalid!"
    //         handleErrors(error, res);
    //         res.render('user/login', userBody);
    //         return;
    //     }
    //     if (!user.authenticate(userBody.password)) {
    //         userBody.error = "Password is invalid!"
    //         res.render('user/login', userBody);
    //         return;
    //     }
    //     req.logIn(user, (err) => {
    //         if (err) {
    //             req.userBody.error = err;
    //             handleErrors(err, res);
    //             res.render('user/login', userBody);
    //         } else {
    //             res.redirect('/');
    //         }
    //     });
    // } catch (error) {
    //     handleErrors(error, res);
    //     // userBody.error = error;
    //     res.render('user/login', userBody);
    // }
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