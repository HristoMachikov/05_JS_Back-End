// Require Controllers...
const homeController = require('../controllers/home');
const cubeController = require('../controllers/cube');


module.exports = (app) => {
    app.get('/details/:id', cubeController.details);
    app.get('/create', cubeController.createGet);
    app.post('/create', cubeController.createPost);
    app.get('/not-found', homeController.notFound);
    app.get('/about', homeController.about);
    app.get('/', homeController.homeGet);
};