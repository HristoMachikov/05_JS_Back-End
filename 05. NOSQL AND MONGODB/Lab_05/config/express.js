const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

module.exports = (app) => {
    //TODO: Setup the view engine
    app.engine('.hbs', handlebars({
        defaultLayout: 'main',
        extname: '.hbs'
    }));
    app.set('view engine','.hbs');

    //TODO: Setup the body parser
    app.use(bodyParser.urlencoded({ extended: false }));

    //TODO: Setup the static files
    app.use(express.static('static'));
    // app.use(express.static(path.resolve(__basedir + 'static')));
};