// const Accessoary = require('../models/Accessoary');
// const { handleError,  handleErrors} = require('./index');
// const cubeModel = require('../models/Cube')

// function createAccessoaryGet(req, res) {
//     const { user } = req;
//     res.render('accessoary/createAccessoary', {user});
// }

// function createAccessoaryPost(req, res) {
//     let { name = null, description = null, imageUrl = null } = req.body;
//     const { user } = req;
//     const accessoaryBody = { name, description, imageUrl };
//     Accessoary.create(accessoaryBody, (err, result) => {
//         if (err) {
//             handleErrors(err, res);
//             res.render('accessoary/createAccessoary', {accessoaryBody, user});
//             return;
//         }
//         console.log('Successfully added!')
//         res.redirect('/');
//     })
// }

// function attachAccessoaryGet(req, res, next) {
//     let cubeId = req.params.id;
//     const { user } = req;
//     cubeModel.findById(cubeId).then(cube => {
//         Promise.all([cube, Accessoary.find({ cubes: { $nin: cubeId } })]).then(([cube, filtredAccessoaries]) => {
//             // console.log(filtredAccessoaries);
//             res.render('accessoary/attachAccessoary', {
//                 cube,
//                 accessoaries: filtredAccessoaries.length > 0 ? filtredAccessoaries : null,
//                 user
//             });
//         }).catch(err => {
//             handleErrors(err, res);
//         })
//     }).catch(err => {
//         handleErrors(err, res);
//     })
// }

// function attachAccessoaryPost(req, res, next) {
//     const { accessoary: accessoaryId } = req.body;
//     const { id: id } = req.params;
//     Promise.all([
//         cubeModel.update({ _id: id }, { $push: { accessoaries: accessoaryId } }),
//         Accessoary.update({ _id: accessoaryId }, { $push: { cubes: id } })
//     ]).then(([cube, accessoary]) => {
//         console.log('Successfully updated!')
//         res.redirect('/');
//     }).catch(err => {
//         handleErrors(err, res);
//         res.render('/');
//         return;
//     })

// }

// // function details(req, res, next) {
// //     let id = req.params.id;
// //     cubeModel.findById(Object(id), function (err, cube) {
// //         if (err) {
// //             handleErrors(err, res);
// //             res.redirect('/not-found');
// //             return;
// //         }
// //         console.log(`Successfully finned cube with id: ${cube._id} !`)
// //         res.render('cube/details', { cube })
// //     })
// // }

// module.exports = {
//     createAccessoaryGet,
//     createAccessoaryPost,
//     attachAccessoaryGet,
//     attachAccessoaryPost
// }
