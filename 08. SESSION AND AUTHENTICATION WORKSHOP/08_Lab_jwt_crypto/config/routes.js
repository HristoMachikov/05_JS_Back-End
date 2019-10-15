// Require Controllers...
const homeController = require('../controllers/home');
const cubeController = require('../controllers/cube');
const userController = require('../controllers/user');
const accessoaryController = require('../controllers/accessoary');
const restrictedPages = require('./auth');
const { auth } = require('../utils');

module.exports = (app) => {
    app.get('/create/accessoary', auth(), accessoaryController.createAccessoaryGet);
    app.post('/create/accessoary', auth(), accessoaryController.createAccessoaryPost);
    app.get('/attach/accessoary/:id', auth(), accessoaryController.attachAccessoaryGet);
    app.post('/attach/accessoary/:id', auth(), accessoaryController.attachAccessoaryPost);

    app.get('/details/:id', auth(false), cubeController.details);
    app.get('/remove/:id', auth(), cubeController.deleteGet);
    app.post('/remove/:id', auth(), cubeController.deletePost);
    app.get('/edit/:id', auth(), cubeController.editGet);
    app.post('/edit/:id', auth(), cubeController.editPost);
    app.get('/create', auth(), cubeController.createGet);
    app.post('/create', auth(), cubeController.createPost);

    // app.get('/user/login', restrictedPages.isAnonymous, userController.loginGet);
    // app.post('/user/login', restrictedPages.isAnonymous, userController.loginPost);
    // app.get('/user/register', restrictedPages.isAnonymous, userController.registerGet);
    // app.post('/user/register', restrictedPages.isAnonymous, userController.registerPost);
    // app.post('/user/logout', restrictedPages.isAnonymous, userController.logoutPost);

    app.get('/user/login', userController.loginGet);
    app.post('/user/login', userController.loginPost);
    app.get('/user/register', userController.registerGet);
    app.post('/user/register', userController.registerPost);
    app.get('/user/logout', userController.logoutGet);

    app.get('/about', auth(false), homeController.about);
    app.get('/search', homeController.search);
    app.get('/', auth(false), homeController.homeGet);
    app.all('*', homeController.notFound);
};