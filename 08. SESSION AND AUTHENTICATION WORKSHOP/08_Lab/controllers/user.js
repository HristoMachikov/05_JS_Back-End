const User = require('../models/User');

function loginGet(req, res) {
    res.render('user/login');
}
function loginPost(req, res) {

}
function registerGet(req, res) {
    res.render('user/register');
}
function registerPost(req, res) {

}
function logoutPost(req, res) {

}

module.exports = {
    loginGet,
    loginPost,
    registerGet,
    registerPost,
    logoutPost
};