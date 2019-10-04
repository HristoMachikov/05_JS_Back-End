const Accessoary = require('../models/Accessoary');
const handleErrors = require('./index');

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

module.exports = {
    createAccessoryGet,
    createAccessoryPost
}
