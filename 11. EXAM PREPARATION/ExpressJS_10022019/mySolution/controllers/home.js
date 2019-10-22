const Course = require('../models/Course')
const { handleError } = require('./index');

// function hendleQueryErrors(from, to) {
//     let errorsArr = [];
//     // if (!!from  || !!to) {
//     //     errorsArr.push('From and to have to be set')
//     // }
//     // if (from < 1 || from > 6) {
//     //     errorsArr.push('From must be between 2 and 6')
//     // }
//     // if (to < 1 || to > 6) {
//     //     errorsArr.push('To must be between 2 and 6')
//     // }
//     if (from > to) {
//         errorsArr.push('From must be less than to')
//     }
//     return errorsArr;
// }

module.exports = {
    homeGet: (req, res, next) => {
        const { user } = req;
        // if (user) {
        //     user.isAdmin = user.roles.includes('Admin');
        // }

        Course.find()
            .then(courses => {
                if (user) {
                    // user.isAdmin = user.roles.includes('Admin');
                    if (user.isAdmin) {
                        res.render('admin/index', {
                            courses,
                            user
                        });
                        return;
                    }
                    res.render('user/index', {
                        courses,
                        user
                    });
                    return;
                    // cube.forEach(cube => cube.isCreator = cube.creatorId === user.id);
                }
                res.render('index', {
                    courses,
                    user
                });
            })
            .catch(err => {
                handleError(err, res);
            });

    },

    notFound: (req, res) => {
        res.render('404');
    },
    search: (req, res) => {
        let {
            //  from, to, 
            search } = req.query;
        // from = Number(from);
        // to = Number(to);
        const { user } = req;

        // let errors = hendleQueryErrors(from, to);
        // if (errors.length > 0) {
        //     res.locals.globalErrors = errors;
        // }

        let query = {};
        if (search) {
            query = { ...query, title: { $regex: search } };
            //  name: `/${search}/i` ???
            // name: { $regex: search }
        }
        // if (from) {
        //     query = { ...query, difficulty: { $gte: from } };
        // }
        // if (to) {
        //     query = {
        //         ...query,
        //         difficulty: { ...query.difficulty, $lte: to }
        //     };
        // }
        Course.find(query).then(courses => {
            res.render('user/index', { courses, user });
        })
        // // cubeModel.find()
        // //     .where('difficulty')
        // //     .gte(from)
        // //     .lte(to)
        // //     .then((cubes) => {
        // //         const filtered = cubes.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
        // //         res.render('index', { cubes: filtered })
        // //     })
    }
}