const Course = require('../models/Course');
const { handleErrors, handleError } = require('./index');
const User = require('../models/User');

function createGet(req, res) {
    let course = {};
    const { user } = req;
    course.isPublic = false;
    res.render('course/create', { course, user });
}

function createPost(req, res) {
    let { title = null, description = null, imageUrl = null, checkBox = null } = req.body;
    const { user } = req;
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
    const course = { title, description, imageUrl }
    course.isPublic = checkBox === "on";
    course._id = req.params.id;
    Course.updateOne({ _id: req.params.id }, { $set: course }, { runValidators: true }).then((result) => {
        console.log('Successfully edited!')
        res.redirect('/');
    }).catch((err) => {
        handleErrors(err, res);
        res.render('course/edit', { course, user });
    })
}

function detailsGet(req, res, next) {
    let courseId = req.params.id;
    const { user } = req;
    Course.findById(Object(courseId)).populate('lectures').then(course => {
        course.usersEnrolled.forEach(element => {
            if (element.toString() === user.id) {
                course.isEnrolled = true;
                return;
            }
        });
        res.render('course/details', { course, user });
    }).catch(err => {
        handleErrors(err, res);
    })
}

function detailsPost(req, res, next) {
    let courseId = req.params.id;
    const { user } = req;
    Promise.all([
        Course.updateOne({ _id: courseId }, { $push: { usersEnrolled: user.id } }),
        User.updateOne({ _id: user.id }, { $push: { courses: courseId } })
    ]).then(([courseUpdated, userUpdated]) => {
        Course.findById(Object(courseId)).populate('lectures').then((course) => {
            course.usersEnrolled.forEach(element => {
                if (element.toString() === user.id) {
                    course.isEnrolled = true;
                    return;
                }
            });
            res.render('course/details', { course, user });
        }).catch(err => {
            handleErrors(err, res);
        })
    }).catch(err => {
        handleErrors(err, res);
    })
}

module.exports = {
    createGet,
    createPost,
    editGet,
    editPost,
    detailsGet,
    detailsPost
}