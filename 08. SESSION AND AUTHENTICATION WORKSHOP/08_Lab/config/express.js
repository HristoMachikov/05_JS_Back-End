const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

module.exports = (app) => {
    //TODO: Setup the view engine
    app.engine('.hbs', handlebars({
        defaultLayout: 'main',
        extname: '.hbs'
    }));
    app.set('view engine', '.hbs');

    //TODO: Setup the body parser
    app.use(bodyParser.urlencoded({ extended: true }));

    //TODO: Setup the cookie parser
    app.use(cookieParser());

    //TODO: Setup session
    app.use(session({
        secret: '123456',
        resave: false,
        saveUninitialized: false
    }));

    //TODO: Setup passport
    app.use(passport.initialize());
    app.use(passport.session());

    //
    app.use((req, res, next) => {
        if (req.user) {
            res.locals.user = req.user;
        }
        next();
    });

    app.use((req, res, next) => {
        if (req.user) {
            res.locals.isAdmin = req.user.roles.indexOf('Admin') !== -1;
        }
        next();
    });

    //TODO: Setup the static files
    app.use(express.static('static'));
    // app.use(express.static(path.resolve(__basedir + 'static')));
};