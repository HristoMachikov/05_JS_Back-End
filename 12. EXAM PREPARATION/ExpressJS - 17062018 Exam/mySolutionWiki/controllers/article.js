const Article = require('../models/Article');
const { handleErrors, handleError } = require('./index');
const User = require('../models/User');

function createGet(req, res) {
    // let course = {};
    const { user } = req;
    // course.isPublic = false;
    res.render('article/create', { user });
}

function createPost(req, res) {
    let { title = null, description = null } = req.body;
    const { user } = req;
    const article = { title, description };


    // const dateNow = new Date();
    // article.createdAt = dateNow.toDateString();
    article.authorId = user._id;
    Article.create(article).then(result => {
        console.log(result);
        let articlesArr = user.articles.push(result._id);
        User.updateOne({ _id: user._id }, { $set: { articles: articlesArr } }).then(updated => {
            console.log('Successfully added!');
            res.redirect('/');
        })
    }).catch(err => {
        handleErrors(err, res);
        // cube.options = options(cube);
        res.render('article/create', { article, user });
        return;
    })
}

function editGet(req, res) {
    let id = req.params.id;
    const { user } = req;
    Article.findById(Object(id), function (err, article) {
        if (err) {
            handleErrors(err, res);
            return;
        }
        // cube.options = options(cube);
        res.render('article/edit', { article, user });
    })
}

function editPost(req, res) {
    let { description } = req.body;
    const { user } = req;
    const article = { description }

    article._id = req.params.id;
    Article.updateOne({ _id: req.params.id }, { $set: article }, { runValidators: true }).then((result) => {
        console.log('Successfully edited!')
        res.redirect('/');
    }).catch((err) => {
        handleErrors(err, res);
        res.render('article/edit', { article, user });
    })
}

function deleteGet(req, res) {
    const articleId = req.params.id;
    let usersEnrolledArr = [];

    Article.findById(articleId).then((article) => {
        User.findById(article.authorId).then((user) => {
            let articlesArr = user.articles.filter(id => id.toString() !== articleId);
            User.updateOne({ _id: userId }, { $set: { articles: articlesArr } }).then(userUpdated => {
            }).catch(err => {
                handleError(err, res);
                res.render('500', { errorMessage: err.message });
            });
        }).catch(err => {
            handleError(err, res);
            res.render('500', { errorMessage: err.message });
        });
        Article.deleteOne({ _id: articleId }).then(articleDeleted => {
            res.redirect('/');
        }).catch(err => {
            handleError(err, res);
            res.render('500', { errorMessage: err.message });
        });

    }).catch(err => {
        handleError(err, res);
        res.render('500', { errorMessage: err.message });
    });

}

function detailsGet(req, res, next) {
    let articleId = req.params.id;
    const { user } = req;
    Article.findById(Object(articleId)).then(article => {

        isAuthor = article.authorId === user.id;
        res.render('article/details', { article, user, isAuthor });
    }).catch(err => {
        handleErrors(err, res);
    })
}

function allGet(req, res, next) {
    let articleId = req.params.id;
    const { user } = req;
    Article.find().select('title').then(articles => {
        res.render('article/article-all', { articles, user });
    }).catch(err => {
        handleErrors(err, res);
    })
}

// function enrollGet(req, res, next) {
//     let courseId = req.params.id;
//     const { user } = req;
//     Promise.all([
//         Course.updateOne({ _id: courseId }, { $push: { usersEnrolled: user.id } }),
//         User.updateOne({ _id: user.id }, { $push: { courses: courseId } })
//     ]).then(([courseUpdated, userUpdated]) => {
//         Course.findById(Object(courseId)).then((course) => {
//             course.usersEnrolled.forEach(element => {
//                 if (element.toString() === user.id) {
//                     course.isEnrolled = true;
//                     return;
//                 }
//             });
//             res.render('course/details', { course, user });
//         }).catch(err => {
//             handleErrors(err, res);
//         })
//     }).catch(err => {
//         handleErrors(err, res);
//     })
// }


// function detailsPost(req, res, next) {
//     let courseId = req.params.id;
//     const { user } = req;
//     Promise.all([
//         Course.updateOne({ _id: courseId }, { $push: { usersEnrolled: user.id } }),
//         User.updateOne({ _id: user.id }, { $push: { courses: courseId } })
//     ]).then(([courseUpdated, userUpdated]) => {
//         Course.findById(Object(courseId)).populate('lectures').then((course) => {
//             course.usersEnrolled.forEach(element => {
//                 if (element.toString() === user.id) {
//                     course.isEnrolled = true;
//                     return;
//                 }
//             });
//             res.render('course/details', { course, user });
//         }).catch(err => {
//             handleErrors(err, res);
//         })
//     }).catch(err => {
//         handleErrors(err, res);
//     })
// }

module.exports = {
    createGet,
    createPost,
    editGet,
    editPost,
    deleteGet,
    detailsGet,
    allGet
    // detailsPost
}