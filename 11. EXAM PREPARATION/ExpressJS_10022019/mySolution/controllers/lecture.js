const Lecture = require('../models/Lecture');
const { handleError, handleErrors } = require('./index');
const Course = require('../models/Course')

function createLectureGet(req, res) {
    const { user } = req;
    const courseId = req.params.id;

    // let getCourse = new Promise(Course.findById(courseId));
    // getCourse.then(course =>{
    //     let lectures = new Promise(Lecture.find({ 'course': courseId }));
    //     res.render('admin/create-lecture', { user, lectures, course });
    // }).catch(err => {
    //     handleErrors(err, res);
    //     res.render('admin/create-lecture', { lecture, user });
    // })

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
        res.render('admin/create-lecture', { lecture, user });
        return;
    })
}

// function attachAccessoaryGet(req, res, next) {
//     let cubeId = req.params.id;
//     const { user } = req;
//     cubeModel.findById(cubeId).then(cube => {
//         Promise.all([cube, Accessoary.find({ cubes: { $nin: cubeId } })]).then(([cube, filtredAccessoaries]) => {
//             // console.log(filtredAccessoaries);
//             res.render('accessoary/attachAccessoary', {
//                 cube,
//                 accessoaries: filtredAccessoaries.length > 0 ? filtredAccessoaries : null,
//                 user
//             });
//         }).catch(err => {
//             handleErrors(err, res);
//         })
//     }).catch(err => {
//         handleErrors(err, res);
//     })
// }

// function attachAccessoaryPost(req, res, next) {
//     const { accessoary: accessoaryId } = req.body;
//     const { id: id } = req.params;
//     Promise.all([
//         cubeModel.update({ _id: id }, { $push: { accessoaries: accessoaryId } }),
//         Accessoary.update({ _id: accessoaryId }, { $push: { cubes: id } })
//     ]).then(([cube, accessoary]) => {
//         console.log('Successfully updated!')
//         res.redirect('/');
//     }).catch(err => {
//         handleErrors(err, res);
//         res.render('/');
//         return;
//     })

// }

function deleteLectureGet(req, res) {
    const lectureId = req.params.id
    Lecture.deleteOne({ _id: lectureId }).then(lecture => {
        // let lectureArr = new Promise(Course.findById())
        Promise.all([lecture, Course.findById({ _id: lecture.course })]).then(([lecture, course]) => {
            let lectureArr = course.lectures.filter(id => id !== lectureId);
            Course.update({ _id: lecture.course }, { $set: { lectures: lectureArr } }).then(result => {
                console.log('Successfully deleted!')
                res.redirect('/');
            })


        })
    }).catch(err => {
        handleErrors(err, res);
        // res.render('admin/create-lecture', { lecture, user });
    })

    // Lecture.deleteOne({ _id: req.params.id }, (err, result) => {
    //     if (err) {
    //         handleErrors(err, res);
    //         return;
    //     }
    //     console.log('Successfully deleted!')
    //     res.redirect('/');
    // })
}

module.exports = {
    createLectureGet,
    createLecturePost,
    deleteLectureGet
    // attachAccessoaryGet,
    // attachAccessoaryPost
}
