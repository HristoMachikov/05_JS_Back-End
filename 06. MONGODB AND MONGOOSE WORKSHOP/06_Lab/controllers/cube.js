const cubeModel = require('../models/Cube')
const { handleErrors } = require('./index');
const { difficultyLevels } = require('./index');

function addSeclectedAttribute(inputArr, cube) {
    inputArr
        .forEach(function (elem, idx, arr) {
            if (arr[idx].selected) {
                delete arr[idx].selected
            }
            if (elem.level === +cube.difficulty) {
                arr[idx].selected = "selected";
            }
        });
    return inputArr;
}

function createGet(req, res) {
    let cube = {};
    cube.difficultyLevels = difficultyLevels;
    res.render('cube/create', cube);
}

function createPost(req, res) {
    let { name = null, description = null, imageUrl = null, difficulty = null } = req.body;

    difficulty = Number(difficulty);
    const cubeBody = { name, description, imageUrl, difficulty };
    cubeModel.create(cubeBody, (err, result) => {
        if (err) {
            handleErrors(err, res);
            cubeBody.difficultyLevels = addSeclectedAttribute(difficultyLevels, cubeBody);
            res.render('cube/create', cubeBody);
            return;
        }
        console.log('Successfully added!');
        res.redirect('/');
    })
}

function editGet(req, res) {
    let id = req.params.id;
    cubeModel.findById(Object(id), function (err, cube) {
        if (err) {
            handleErrors(err, res);
            // res.redirect('/not-found');
            return;
        }
        cube.difficultyLevels = addSeclectedAttribute(difficultyLevels, cube);
        res.render('cube/edit', { cube });
    })
}

function editPost(req, res) {
    let { name = null, description = null, imageUrl = null, difficulty = null } = req.body;

    difficulty = Number(difficulty);
    cubeModel.findByIdAndUpdate(req.params.id,
        { $set: { name, description, imageUrl, difficulty } }, (err, result) => {
            if (err) {
                handleErrors(err, res);
                return;
            }
            // DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated. See: https://mongoosejs.com/docs/deprecations.html#-findandmodify-
            console.log('Successfully edited!')
            res.redirect('/');
        })
}

function details(req, res, next) {
    let id = req.params.id;
    cubeModel.findById(Object(id)).populate('accessoaries').then(cube => {

        res.render('cube/details', cube);
    }).catch(err => {
        handleErrors(err, res);
    })
}

module.exports = {
    editGet,
    editPost,
    createGet,
    createPost,
    details
}