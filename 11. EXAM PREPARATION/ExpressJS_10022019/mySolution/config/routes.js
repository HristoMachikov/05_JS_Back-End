// Require Controllers...
const homeController = require('../controllers/home');
const courseController = require('../controllers/course');
const userController = require('../controllers/user');
const lectureController = require('../controllers/lecture');
const { auth } = require('../utils');

module.exports = (app) => {
    // app.get('/lecture/create/:id', auth(), lectureController.createGet);
    // app.post('/lecture/create/:id', auth(), lectureController.createPost);
    // app.post('/lecture/remove/:id', auth(), lectureController.deletePost);
    // app.get('/lecture/play/:id', auth(), lectureController.playGet);


    // app.get('/course/details/:id', auth(false), courseController.details);
    // app.get('/course/edit/:id', auth(), courseController.editGet);
    // app.post('/course/edit/:id', auth(), courseController.editPost);
    // app.get('/course/create', auth(), courseController.createGet);
    // app.post('/course/create', auth(), courseController.createPost);

    app.get('/user/login', userController.loginGet);
    app.post('/user/login', userController.loginPost);
    app.get('/user/register', userController.registerGet);
    app.post('/user/register', userController.registerPost);
    app.get('/user/logout', userController.logoutGet);


    // app.get('/search', homeController.search);
    app.get('/', auth(), homeController.homeGet);
    app.all('*', homeController.notFound);
};