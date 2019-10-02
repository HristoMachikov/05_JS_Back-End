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

    // Validate here - name, description, imageUrl, difficulty
    // let errorsArr = [];
    // if (errorsArr.length > 0) {
    //     res.local.globalErrors = errors;
    // }

    const newCube = cubeModel.create(name, description, imageUrl, difficulty);
    cubeModel.insert(newCube)
        .then(() => {
            res.redirect('/');
        })
        .catch((e) => handleErrors(e, res, cubeBody));

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

function handleErrors(err, res, cubeBody) {
    let errorsArr = [];
    for (const prop in err.errors) {
        errorsArr.push(err.errors[prop].message);
    }
    res.local.globalErrors = errors;
    res.render('cube/create', cubeBody);
}

module.exports = {
    createGet,
    createPost,
    details,
    handleErrors
}
