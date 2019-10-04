const Accessoary = require('../models/Accessoary');
const handleErrors = require('./index');
const cubeModel = require('../models/Cube')

function createAccessoryGet(req, res) {
    res.render('accessoary/createAccessoary');
}
function createAccessoryPost(req, res) {
    let { name = null, description = null, imageUrl = null } = req.body;

    const accessoaryBody = { name, description, imageUrl };
    Accessoary.create(accessoaryBody, (err, result) => {
        if (err) {
            handleErrors(err, res);
            res.render('accessoary/createAccessoary', accessoaryBody);
            return;
        }
        console.log('Successfully added!')
        res.redirect('/');
    })
}

function attachAccessoryGet(req, res, next) {
    let id = req.params.id;
    cubeModel.findById(Object(id))
        .populate('accessoaries').then(cube => {
            // Accessoary.find(cubes:{$nin:cube.accessoaries})
            console.log(cube);
            res.render('accessoary/attachAccessory', cube);
        }).catch(err => {
            handleErrors(err, res);
            // res.redirect('/not-found');
            // return;
        })

    // , function (err, cube) {
    //     if (err) {
    //         
    //     }
    //     console.log(`Successfully finned cube with id: ${cube._id} !`)
    //     res.render('cube/details', { cube })
    // })
}
function attachAccessoryPost(req, res, next) {

}
// Student.findOne({ name: 'Peter' })

// .populate('subjects')

// .then(student => {

// console.log(student.subjects)
// })

function details(req, res, next) {
    let id = req.params.id;
    cubeModel.findById(Object(id), function (err, cube) {
        if (err) {
            handleErrors(err, res);
            res.redirect('/not-found');
            return;
        }
        console.log(`Successfully finned cube with id: ${cube._id} !`)
        res.render('cube/details', { cube })
    })
}

module.exports = {
    createAccessoryGet,
    createAccessoryPost,
    attachAccessoryGet,
    attachAccessoryPost
}
