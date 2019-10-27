// Require Controllers...
const homeController = require('../controllers/home');
const expenseController = require('../controllers/expense');
const userController = require('../controllers/user');
const { auth } = require('../utils');

module.exports = (app) => {

    // app.get('/expense/info/:id', auth(), courseController.infoGet);
    
    app.get('/expense/report/:id', auth(), expenseController.reportGet);
    app.get('/expense/remove/:id', auth(), expenseController.deleteGet);

    app.get('/expense/create', auth(), expenseController.createGet);
    app.post('/expense/create', auth(), expenseController.createPost);

    app.post('/user/edit/:id', auth(), userController.editPost);
    app.get('/user/login', userController.loginGet);
    app.post('/user/login', userController.loginPost);
    app.get('/user/register', userController.registerGet);
    app.post('/user/register', userController.registerPost);
    app.get('/user/logout', userController.logoutGet);


    app.get('/', auth(false), homeController.homeGet);
    app.all('*',auth(false), homeController.notFound);
};