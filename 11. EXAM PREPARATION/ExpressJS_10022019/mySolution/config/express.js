const express = require('express');
// const path = require('path');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

module.exports = (app) => {
    //TODO: Setup the view engine
    app.engine('.hbs', handlebars({
        defaultLayout: 'main',
        extname: '.hbs'
    }));
    app.set('view engine', '.hbs');

    //TODO: Setup the body parser
    app.use(bodyParser.urlencoded({ extended: false }));
    // app.use(express.urlencoded({ extended: true }));

    //TODO: Setup the cookie parser
    app.use(cookieParser());

    //Error hendler
    app.use(function (err, req, res, next) {
        console.log(err);
        res.render('500', { errorMessage: err.message })
    })

    //TODO: Setup the static files
    app.use(express.static('static'));
    // app.use(express.static(path.resolve(__basedir + 'static')));
};