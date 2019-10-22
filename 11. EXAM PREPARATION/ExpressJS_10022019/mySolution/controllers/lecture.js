const Lecture = require('../models/Lecture');
const { handleError, handleErrors } = require('./index');
const Course = require('../models/Course')

function createLectureGet(req, res) {
    const { user } = req;
    const courseId = req.params.id;

    Course.findById(courseId).then(course => {
        Promise.all([course, Lecture.find({ 'course': courseId })]).then(([course, lectures]) => {
            res.render('admin/create-lecture', { user, lectures, course });
        })
    }).catch(err => {
        handleErrors(err, res);
        // res.render('admin/create-lecture', { lecture, user });
    })
}

function createLecturePost(req, res) {
    let { title = null, videoUrl = null } = req.body;
    const { user } = req;
    const lecture = { title, videoUrl };
    const courseId = req.params.id;
    lecture.course = courseId;
    Lecture.create(lecture).then((newLecture) => {
        Promise.all([newLecture, Course.update({ _id: courseId }, { $push: { lectures: newLecture._id } })])
            .then(([newLecture, course]) => {
                console.log('Successfully added lecture!')
                res.redirect('/');
            }).catch(err => {
                console.log(err);
            })
    }).catch(err => {
        handleErrors(err, res);

        Course.findById(courseId).then(course => {
            Promise.all([course, Lecture.find({ 'course': courseId })]).then(([course, lectures]) => {
                res.render('admin/create-lecture', { user, lectures, course, lecture });
            });
        }).catch(err => {
            handleErrors(err, res);
        })
    })
}

function deleteLectureGet(req, res) {
    const lectureId = req.params.id
    let lectureArr = [];
    Lecture.findById(lectureId).then(lecture => {
        Promise.all([lecture, Course.findById(lecture.course)]).then(([lecture, course]) => {
            lectureArr = course.lectures.filter((id) => id.toString() !== lectureId);
            Promise.all([Lecture.deleteOne({ _id: lectureId }), Course.update({ _id: lecture.course }, { $set: { lectures: lectureArr } })]).then(([result, updatedCourse]) => {
                console.log('Successfully deleted lecture!')
                res.redirect('/');
            }).catch(err => {
                handleErrors(err, res);
                res.render('/');
            })
        }).catch(err => {
            handleErrors(err, res);
            res.render('/');
        })
    }).catch(err => {
        handleErrors(err, res);
        res.render('/');
    })
}

function playGet(req, res) {
    const lectureId = req.params.id
    const { user } = req;
    Lecture.findById(lectureId).then(lecture => {
        Promise.all([lecture, Course.findById(lecture.course).populate('lectures')]).then(([lecture, course]) => {
            res.render('admin/play-lecture', { lecture, course });
        }).catch(err => {
            handleErrors(err, res);
            res.render('/');
        })
    })
}

module.exports = {
    createLectureGet,
    createLecturePost,
    deleteLectureGet,
    playGet
}