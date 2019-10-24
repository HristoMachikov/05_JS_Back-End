// Require Controllers...
const homeController = require('../controllers/home');
const articleController = require('../controllers/article');
const userController = require('../controllers/user');
const { auth } = require('../utils');

module.exports = (app) => {

    app.get('/article/details/:id', auth(), articleController.detailsGet);
    app.get('/article/remove/:id', auth(), articleController.deleteGet);
    app.get('/article/edit/:id', auth(), articleController.editGet);
    app.post('/article/edit/:id', auth(), articleController.editPost);
    app.get('/article/all', auth(), articleController.allGet);
    app.get('/article/create', auth(), articleController.createGet);
    app.post('/article/create', auth(), articleController.createPost);

    app.get('/user/login', userController.loginGet);
    app.post('/user/login', userController.loginPost);
    app.get('/user/register', userController.registerGet);
    app.post('/user/register', userController.registerPost);
    app.get('/user/logout', userController.logoutGet);

    app.get('/search',auth(), homeController.search);
    app.get('/', auth(false), homeController.homeGet);
    app.all('*', homeController.notFound);
};