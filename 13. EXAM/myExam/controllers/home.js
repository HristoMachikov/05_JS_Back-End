const Expense = require('../models/Expense')
const { handleError } = require('./index');


module.exports = {
    homeGet: (req, res, next) => {
        const { user } = req;  
        Expense.find()
            .then(expenses => {
                if (user) {  
                    // if (user.isAdmin) {
                    //     res.render('admin/index', {
                    //         courses,
                    //         user
                    //     });
                    //     return;
                    // }
                    res.render('user/index', {
                        expenses: expenses.length > 0 ? expenses : false,
                        user
                    });
                    return;
                    // cube.forEach(cube => cube.isCreator = cube.creatorId === user.id);
                }

                // let topCourses = courses
                //     .filter(obj => obj.isPublic === true)
                //     .sort((a, b) => b.usersEnrolled.length - a.usersEnrolled.length)
                //     .splice(0, 3);

                res.render('index');
            })
            .catch(err => {
                handleError(err, res);
            });

    },

    notFound: (req, res) => {
        const { user } = req; 
        res.render('404',{user});
    },
   
}