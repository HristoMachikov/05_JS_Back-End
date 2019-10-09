const config = require('./config');
const mongoose = require('mongoose');
// mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

module.exports = () => {
    const db = mongoose.connection;
    db.once('open', err => {
        if (err) throw err;
        console.log('Database ready!')
    })
    db.on('error', reason => {
        console.log(reason);
    })
    return mongoose.connect(config.dbPath, { useFindAndModify: false })

}