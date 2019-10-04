// Require Controllers...
const homeController = require('../controllers/home');
const cubeController = require('../controllers/cube');
const accessoaryController = require('../controllers/accessoary');


module.exports = (app) => {
    // app.get('/attach/accessory/:id', accessoaryController.attachAccessory);
    app.get('/create/accessory', accessoaryController.createAccessoryGet);
    app.post('/create/accessory', accessoaryController.createAccessoryPost);
    
    app.get('/details/:id', cubeController.details);
    app.get('/edit/:id', cubeController.editGet);
    app.post('/edit/:id', cubeController.editPost);
    app.get('/create', cubeController.createGet);
    app.post('/create', cubeController.createPost);
    app.get('/not-found', homeController.notFound);
    app.get('/about', homeController.about);
    app.get('/search', homeController.search);
    app.get('/', homeController.homeGet);
    
};