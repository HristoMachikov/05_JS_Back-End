const Course = require('../models/Course')
const { handleErrors, handleError } = require('./index');
const { options } = require('./index');

function createGet(req, res) {
    let course = {};
    const { user } = req;
    course.isPublic = false;
    // cube.difficulty = 1;
    // cube.options = options(cube);
    res.render('course/create', { course, user });
}

function createPost(req, res) {
    let { title = null, description = null, imageUrl = null, checkBox = null } = req.body;
    console.log(req.body)
    const { user } = req;
    // difficulty = Number(difficulty);
    // const creatorId = user._id;

    const course = { title, description, imageUrl };
    course.isPublic = checkBox === "on";
    course.lectures = [];
    course.usersEnrolled = [];
    Course.create(course, (err, result) => {
        if (err) {
            handleErrors(err, res);
            // cube.options = options(cube);
            res.render('course/create', { course, user });
            return;
        }
        console.log('Successfully added!');
        res.redirect('/');
    })
}

function editGet(req, res) {
    let id = req.params.id;
    const { user } = req;
    Course.findById(Object(id), function (err, course) {
        if (err) {
            handleErrors(err, res);
            return;
        }
        // cube.options = options(cube);
        res.render('course/edit', { course, user });
    })
}

function editPost(req, res) {
    let { title, description, imageUrl, checkBox } = req.body;
    const { user } = req;
    // difficulty = Number(difficulty);
    const course = { title, description, imageUrl }
    course.isPublic = checkBox === "on";
    course._id = req.params.id;
    Course.updateOne({ _id: req.params.id }, { $set: course }, { runValidators: true }).then((result) => {
        // { runValidators: true }
        console.log('Successfully edited!')
        res.redirect('/');
    }).catch((err) => {
        handleErrors(err, res);
        // cube.options = options(cube);
        res.render('course/edit', { course, user });
    })
}

// function deleteGet(req, res) {
//     let id = req.params.id;
//     const { user } = req;
//     cubeModel.findById(Object(id), function (err, cube) {
//         if (err) {
//             handleError(err, res);
//             return;
//         }
//         cube.options = options(cube);
//         res.render('cube/delete', { cube, user });
//     })
// }

// function deletePost(req, res) {
//     cubeModel.deleteOne({ _id: req.params.id }, (err, result) => {
//         if (err) {
//             handleErrors(err, res);
//             return;
//         }
//         console.log('Successfully deleted!')
//         res.redirect('/');
//     })
// }

function details(req, res, next) {
    let id = req.params.id;
    const { user } = req;
    Course.findById(Object(id)).populate('lectures')
    .then(course => {
        if (user) {
            course.isEnrolled = course.usersEnrolled.includes(user.id);
        }
        res.render('course/details', { course, user });
    }).catch(err => {
        handleErrors(err, res);
    })
}

module.exports = {
    createGet,
    createPost,
    editGet,
    editPost,
    // deleteGet,
    // deletePost,
    details
}