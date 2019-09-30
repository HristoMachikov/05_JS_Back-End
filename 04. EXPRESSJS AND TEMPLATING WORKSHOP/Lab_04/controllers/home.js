const cubeModel = require('../models/cube')

module.exports = {
    homeGet: (req, res, next) => {
        const { from, to, search } = req.query;
        const findFn = item => {
            let result = true;
            if (search) {
                result = item.name.toLowerCase().includes(search.toLowerCase());
            }
            if (result && from) {
                result = +item.difficulty >= +from;
            }
            if (result && to) {
                result = +item.difficulty <= +to;
            }
            return result;
        }
        // cubeModel.getAll()
        cubeModel.find(findFn)
            .then(cubes => {
                res.locals.globalError = 'Something wen wrong!';
                res.render('index', { cubes, search, from, to });
            })
            .catch(next);

    },
    about: (req, res) => {
        res.render('about');
    },
    notFound: (req, res) => {
        res.render('404');
    },
    search: (req, res) => {

    }
}