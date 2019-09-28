const cubeModel = require('../models/cube')

// module.exports = {
//     createGet: function (req, res) {
//         res.render('cube/create');
//     },
//     createPost: function (req, res) {
//         const cubeBody = req.body;
//         console.log(cubeBody);
//         res.redirect('/');
//     }
// }
function createGet(req, res) {
    res.render('cube/create');
}
function createPost(req, res) {
    const { name = null, description = null, imageUrl = null, difficulty = null } = req.body;
    // const cubeBody = req.body;
    // cubeBody.difficulty = Number(cubeBody.difficulty);
    const newCube = cubeModel.create(name, description, imageUrl, difficulty);
    cubeModel.insert(newCube)
        .then(() => {
            res.redirect('/');
        });

}

function details(req, res, next) {
    const id = +req.params.id;
    cubeModel.getOne(id)
        .then(cube => {
            if (!cube) {
                res.redirect('/not-found');
                return;
                // res.locals.globalError = 'Something wen wrong!';
            }
            res.render('cube/details', { cube });
        })
        .catch(next);
}

module.exports = {
    createGet,
    createPost,
    details
}
