// Require Controllers...
const homeController = require('../controllers/home');
const cubeController = require('../controllers/cube');
const userController = require('../controllers/user');
const accessoaryController = require('../controllers/accessoary');
const restrictedPages = require('./auth');

module.exports = (app) => {
    app.get('/create/accessoary', accessoaryController.createAccessoaryGet);
    app.post('/create/accessoary', accessoaryController.createAccessoaryPost);
    app.get('/attach/accessoary/:id', accessoaryController.attachAccessoaryGet);
    app.post('/attach/accessoary/:id', accessoaryController.attachAccessoaryPost);

    app.get('/details/:id', cubeController.details);
    app.get('/remove/:id', cubeController.deleteGet);
    app.post('/remove/:id', cubeController.deletePost);
    app.get('/edit/:id', cubeController.editGet);
    app.post('/edit/:id', cubeController.editPost);
    app.get('/create', cubeController.createGet);
    app.post('/create', cubeController.createPost);

    app.get('/user/login', restrictedPages.isAnonymous, userController.loginGet);
    app.post('/user/login', restrictedPages.isAnonymous, userController.loginPost);
    app.get('/user/register', restrictedPages.isAnonymous, userController.registerGet);
    app.post('/user/register', restrictedPages.isAnonymous, userController.registerPost);
    app.post('/user/logout', restrictedPages.isAnonymous, userController.logoutPost);

    app.get('/about', homeController.about);
    app.get('/search', homeController.search);
    app.get('/', homeController.homeGet);
    app.all('*', homeController.notFound);
};