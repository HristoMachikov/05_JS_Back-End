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
        user.articles.push(result._id);
        return User.updateOne({ _id: user._id }, { $set: { articles: user.articles } })
    }).then(updated => {
        console.log('Successfully added!');
        res.redirect('/');
    }).catch(err => {
        if (err.name === 'MongoError' && err.code === 11000) {
            const error = "Article with this name exist!"
            handleError(error, res);
            res.render('article/create', { article, user });
            return;
        }
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
    const { user } = req;
    Article.findById(articleId).then((article) => {
        return Promise.all([
            article,
            User.updateOne({ _id: user.id }, { $set: { articles: user.articles.filter(id => id.toString() !== articleId) } }),
            Article.deleteOne({ _id: articleId })
        ]);
    }).then(([article, userUpdated, articleDeleted]) => {
        res.redirect('/');
    }).catch(err => {
        handleError(err, res);
        res.render('500', { errorMessage: err.message });
    });
};

function detailsGet(req, res, next) {
    let articleId = req.params.id;
    const { user } = req;
    Article.findById(articleId).then(article => {
        isAuthor = article.authorId.toString() === user.id.toString();
        article.paragraphs = article.description.split('\r\n\r\n');
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