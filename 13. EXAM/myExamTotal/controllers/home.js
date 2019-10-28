const Expense = require('../models/Expense')
const { handleError, dateToString } = require('./index');

module.exports = {
    homeGet: (req, res, next) => {
        const { user } = req;
        if (user) {
            Expense.find({ _id: { $in: user.expenses } })
                .then(expenses => {

                    if (expenses) {
                        expenses.forEach(expense => {
                            expense.dateToStr = dateToString(expense.date);
                        });

                    }

                    res.render('user/index', {
                        expenses: expenses.length > 0 ? expenses : false,
                        user
                    });

                })
                .catch(err => {
                    handleError(err, res);
                });
            return;
        }
        res.render('index');
    },

    notFound: (req, res) => {
        const { user } = req;
        res.render('404', { user });
    }
}