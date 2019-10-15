const jwt = require('./jwt');
const { userCookieName } = require('../app-config');
const User = require('../models/User');
const TokenBlacklist = require('../models/TokenBlacklist');

function auth(redirectUnauthenticated = true) {
    return function (req, res, next) {
        const token = req.cookies[userCookieName] || '';
        Promise.all([
            jwt.verifyToken(token),
            TokenBlacklist.findOne({ token })
        ]).then(([data, blacklistedToken]) => {
            if (blacklistedToken) { return Promise.reject(new Error('blacklisted token')); }
            User.findById(data.id).then(user => {
                req.user = user;
                next();
            });
        }).catch(err => {
            if (!redirectUnauthenticated) { next(); return; }
            if ([
                'token expired',
                'blacklisted token',
                'jwt must be provided'
            ].includes(err.message)
            ) {
                res.redirect('/login');
                return;
            }
            next(err);
        });
    };
}

module.exports = auth;