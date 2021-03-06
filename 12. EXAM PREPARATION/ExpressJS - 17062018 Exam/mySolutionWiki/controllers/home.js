const Article = require('../models/Article')
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
        Article.find()
            // .then(articles => {
            .sort("-createdAt").limit(3)
            .then(articles => {

                // .limit(3)
                articles.forEach(a => a.description = a.description.split(' ').slice(0, 50).join(' '));
                
                // if (user) {  
                //     // if (user.isAdmin) {
                //     //     res.render('admin/index', {
                //     //         courses,
                //     //         user
                //     //     });
                //     //     return;
                //     // }
                //     res.render('user/index', {
                //         articles,
                //         user
                //     });
                //     return;
                //     // cube.forEach(cube => cube.isCreator = cube.creatorId === user.id);
                // }

                // articles
                //     // .filter(obj => obj.isPublic === true)
                //     .sort((a, b) => b.createdAt - a.createdAt)
                //     .splice(3)


                res.render('index', {
                    articles,
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
            query = { ...query, title: { $regex: search, $options: 'i' } };
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
        Article.find(query).then(articles => {
            res.render('article/search', { articles, user, search });
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