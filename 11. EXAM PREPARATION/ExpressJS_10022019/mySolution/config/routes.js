// Require Controllers...
const homeController = require('../controllers/home');
const courseController = require('../controllers/course');
const userController = require('../controllers/user');
const lectureController = require('../controllers/lecture');
const { auth } = require('../utils');

module.exports = (app) => {
    app.get('/lecture/create/:id', auth(), lectureController.createLectureGet);
    app.post('/lecture/create/:id', auth(), lectureController.createLecturePost);
    app.get('/lecture/remove/:id', auth(), lectureController.deleteLectureGet);
    app.get('/lecture/play/:id', auth(), lectureController.playGet);

    app.get('/course/details/:id', auth(), courseController.detailsGet);
    app.post('/course/details/:id', auth(), courseController.detailsPost);
    app.get('/course/edit/:id', auth(), courseController.editGet);
    app.post('/course/edit/:id', auth(), courseController.editPost);
    app.get('/course/create', auth(), courseController.createGet);
    app.post('/course/create', auth(), courseController.createPost);

    app.get('/user/login', userController.loginGet);
    app.post('/user/login', userController.loginPost);
    app.get('/user/register', userController.registerGet);
    app.post('/user/register', userController.registerPost);
    app.post('/user/logout', userController.logoutPost);

    app.get('/search', auth(), homeController.search);
    app.get('/', auth(false), homeController.homeGet);
    app.all('*', homeController.notFound);
};