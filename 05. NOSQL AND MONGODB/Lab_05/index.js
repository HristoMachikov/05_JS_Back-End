// const env = process.env.NODE_ENV || 'development';
// global.__basedir = __dirname;
// const config = require('./config/config')[env];
// const app = require('express')();

// require('./config/express')(app);
// require('./config/routes')(app);

// app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const connectionStr = 'mongodb://localhost:27017';
const client = new MongoClient(connectionStr);
client.connect(function (err, client) {
    if (err) {
        console.error(err);
        return;
    }
    const db = client.db('testdb');
    const users = db.collection('users');

    users.deleteMany({ name: 'Pavel' }).then(deleteEntity =>
        console.log(deleteEntity));
    // users.insert({ name: 'Pavel' }).then(user =>
    //     console.log(user));
});
