const cubeModel = require('../models/Cube')

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
    let { name = null, description = null, imageUrl = null, difficulty = null } = req.body;
    // const cubeBody = req.body;
    // cubeBody.difficulty = Number(cubeBody.difficulty);

    // Validate here - name, description, imageUrl, difficulty
    // let errorsArr = [];
    // if (errorsArr.length > 0) {
    //     res.local.globalErrors = errors;
    // }

    // const newCube = cubeModel.create(name, description, imageUrl, difficulty);
    difficulty = Number(difficulty);
    cubeModel.create({ name, description, imageUrl, difficulty }, (err, result) => {
        if (err) return console.log(err);
        console.log('Successfully added!')
        res.redirect('/');
    })
}

function editGet(req, res) {
    let id = req.params.id;
    cubeModel.findById(Object(id), function (err, cube) {
        if (err) {
            res.redirect('/not-found');
            return console.log(err);
        }
        // console.log(`Successfully finned cube with id: ${cube._id} !`)
        res.render('cube/edit', { cube })
    })
}
function editPost(req, res) {
    let { name = null, description = null, imageUrl = null, difficulty = null } = req.body;

    difficulty = Number(difficulty);
    cubeModel.findByIdAndUpdate(req.params.id,
        { $set: { name, description, imageUrl, difficulty } }, (err, result) => {
            if (err) return console.log(err);
            console.log('Successfully edited!')
            res.redirect('/');
        })
}

function details(req, res, next) {
    let id = req.params.id;
    cubeModel.findById(Object(id), function (err, cube) {
        if (err) {
            res.redirect('/not-found');
            return console.log(err);
        }
        console.log(`Successfully finned cube with id: ${cube._id} !`)
        res.render('cube/details', { cube })
    })
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
    editGet,
    editPost,
    createGet,
    createPost,
    details,
    handleErrors
}
