const cubeModel = require('../models/Cube')

function hendleQueryErrors(from, to) {
    let errorsArr = [];
    // if (!!from  || !!to) {
    //     errorsArr.push('From and to have to be set')
    // }
    if (from < 1 || from > 6) {
        errorsArr.push('From must be between 2 and 6')
    }
    if (to < 1 || to > 6) {
        errorsArr.push('To must be between 2 and 6')
    }
    if (from > to) {
        errorsArr.push('From must be less than to')
    }
    return errorsArr;
}

module.exports = {
    homeGet: (req, res, next) => {
        // const { from, to, search } = req.query;
        // const findFn = item => {
        //     let result = true;
        //     if (search) {
        //         result = item.name.toLowerCase().includes(search.toLowerCase());
        //     }
        //     if (result && from) {
        //         result = +item.difficulty >= +from;
        //     }
        //     if (result && to) {
        //         result = +item.difficulty <= +to;
        //     }
        //     return result;
        // }

        cubeModel.find()
            .then(cubes => {
                res.locals.globalError = 'Something wen wrong!';
                res.render('index', {
                    cubes,
                    // search,
                    // from,
                    // to
                });
            })
            .catch(err => {
                handleErrors(err, res);
            });

    },
    about: (req, res) => {
        res.render('about');
    },
    notFound: (req, res) => {
        res.render('404');
    },
    search: async (req, res) => {
        let { from, to, search } = req.query;

        from = Number(from);
        to = Number(to);
        let errors = hendleQueryErrors(from, to);

        if (errors.length > 0) {
            res.locals.globalErrors = errors;

            try {
                const cubes = await cubeModel.find();
                res.render('index', { cubes: cubes });
                return;
            } catch (err) {
                console.log(err);
            }
        }
        // cubeModel.find({ name: `/${search}/i` }, null)
        cubeModel.find()
            .where('difficulty')
            .gte(from)
            .lte(to)
            .then((cubes) => {
                const filtered = cubes.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
                res.render('index', { cubes: filtered })
            })
    }

}