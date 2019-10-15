const cubeModel = require('../models/Cube')
const { handleErrors, handleError } = require('./index');
// const { difficultyLevels } = require('./index');
const { options } = require('./index');

// function addSeclectedAttribute(inputArr, cube) {
//     inputArr
//         .forEach(function (elem, idx, arr) {
//             if (arr[idx].selected) {
//                 delete arr[idx].selected
//             }
//             if (elem.level === +cube.difficulty) {
//                 arr[idx].selected = "selected";
//                 return inputArr;
//             }
//         });
//     return inputArr;
// }

function createGet(req, res) {
    let cube = {};
    const { user } = req;
    cube.difficultyL = 1;
    cube.options = options(cube);
    // cube.difficultyLevels = difficultyLevels;
    res.render('cube/create', { cube, user });
}

function createPost(req, res) {
    let { name = null, description = null, imageUrl = null, difficulty = null } = req.body;
    const { user } = req;
    difficulty = Number(difficulty);
    const creatorId = user._id;
    const cube = { name, description, imageUrl, difficulty, creatorId };
    cubeModel.create(cube, (err, result) => {
        if (err) {
            handleErrors(err, res);
            cube.options = options(cube);
            // cube.difficultyLevels = addSeclectedAttribute(difficultyLevels, cube);
            res.render('cube/create', { cube, user });
            return;
        }
        console.log('Successfully added!');
        res.redirect('/');
    })
}

function editGet(req, res) {
    let id = req.params.id;
    const { user } = req;
    cubeModel.findById(Object(id), function (err, cube) {
        if (err) {
            handleErrors(err, res);
            // res.redirect('/not-found');
            return;
        }
        cube.options = options(cube);
        // cube.difficultyLevels = addSeclectedAttribute(difficultyLevels, cube);
        res.render('cube/edit', { cube, user });
    })
}

function editPost(req, res) {
    let { name = null, description = null, imageUrl = null, difficulty = null } = req.body;

    difficulty = Number(difficulty);
    cubeModel.findByIdAndUpdate(req.params.id,
        // { $set: { name, description, imageUrl, difficulty } }, (err, result) => {
        { $set: { name, description, imageUrl, difficulty } }, { runValidators: true }, (err, result) => {
            if (err) {
                handleErrors(err, res);
                return;
            }
            // DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated. See: https://mongoosejs.com/docs/deprecations.html#-findandmodify-
            console.log('Successfully edited!')
            res.redirect('/');
        })
}

function deleteGet(req, res) {
    let id = req.params.id;
    const { user } = req;
    cubeModel.findById(Object(id), function (err, cube) {
        if (err) {
            handleError(err, res);
            // res.redirect('/not-found');
            return;
        }
        cube.options = options(cube);
        // cube.difficultyLevels = addSeclectedAttribute(difficultyLevels, cube);
        res.render('cube/delete', { cube, user });
    })
}

function deletePost(req, res) {
    // let { name = null, description = null, imageUrl = null, difficulty = null } = req.body;

    // difficulty = Number(difficulty);
    cubeModel.deleteOne({ _id: req.params.id }, (err, result) => {
        if (err) {
            handleErrors(err, res);
            return;
        }
        console.log(result);
        // DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated. See: https://mongoosejs.com/docs/deprecations.html#-findandmodify-
        console.log('Successfully deleted!')
        res.redirect('/');
    })
}

function details(req, res, next) {
    let id = req.params.id;
    const { user } = req;
    cubeModel.findById(Object(id)).populate('accessoaries').then(cube => {
        cube.isCreator = cube.creatorId === user.id;
        res.render('cube/details', { cube, user });
    }).catch(err => {
        handleErrors(err, res);
    })
}

module.exports = {
    createGet,
    createPost,
    editGet,
    editPost,
    deleteGet,
    deletePost,
    details
}