const Expense = require('../models/Expense');
const { handleErrors, handleError } = require('./index');
const User = require('../models/User');

function createGet(req, res) {
    // let course = {};
    const { user } = req;
    // course.isPublic = false;
    res.render('expense/create', { user });
}


function createPost(req, res) {
    let { merchant = null, description = null, total = null, category = null, checkBox = null } = req.body;
    const { user } = req;
    const expense = { merchant, description, category };
    expense.total = Number(total);
    expense.isReport = checkBox === "on";
    const dateNow = new Date();
    expense.date = dateNow.toDateString();
    expense.creatorId = user._id;
    Expense.create(expense).then(result => {
        user.expenses.push(result._id);
        return User.updateOne({ _id: user._id }, { $set: { expenses: user.expenses } })
    }).then(updated => {
        console.log('Successfully added!');
        res.redirect('/');
    }).catch(err => {
        handleErrors(err, res);
        // expense.options = options(expense);
        res.render('expense/create', { expense, user });
        return;
    })
}


function deleteGet(req, res) {
    const expenseId = req.params.id;
    const { user } = req;
    Expense.findById(expenseId).then((expense) => {
        return Promise.all([
            expense,
            User.updateOne({ _id: user.id }, { $set: { expenses: user.expenses.filter(id => id.toString() !== expenseId) } }),
            Expense.deleteOne({ _id: expenseId })
        ]);
    }).then(([article, userUpdated, expenseDeleted]) => {
        res.redirect('/');
    }).catch(err => {
        handleError(err, res);
        res.render('500', { errorMessage: err.message });
    });
};




function reportGet(req, res, next) {
    let expenseId = req.params.id;
    const { user } = req;
    Expense.findById(Object(expenseId)).then(expense => {
        // course.usersEnrolled.forEach(element => {
        //     if (element.toString() === user.id) {
        //         course.isEnrolled = true;
        //         return;
        //     }
        // });
        // isCreator = course.creatorId === user.id;
        res.render('expense/report', { expense, user });
    }).catch(err => {
        handleErrors(err, res);
    })
}





module.exports = {
    createGet,
    createPost,
    deleteGet,
    reportGet
   
}