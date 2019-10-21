const config = require('./config');
const mongoose = require('mongoose');
const User = require('../models/User');
// mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

module.exports = () => {
    const db = mongoose.connection;
    db.once('open', err => {
        if (err) {
            console.log('Something went wrong!');
            throw err;
        }
        User.seedAdmin()
            .then(() => {
                console.log('Database ready!')
            })
            .catch((err) => {
                console.log('Something went wrong!');
                console.log(err);
            })
    })
    db.on('error', reason => {
        console.log(reason);
    })
    return mongoose.connect(config.dbPath, {
        useFindAndModify: false,
        useNewUrlParser: true,
        // useUnifiedTopology: true
    })

}