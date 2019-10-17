global.__basedir = __dirname;

const dbConnector = require('./config/database');
dbConnector().then(() => {
    const config = require('./config/config');
    const app = require('express')();

    require('./config/express')(app);
    require('./config/routes')(app);

    app.listen(config.port, console.log(`Listening on port ${config.port}!`));

}).catch(console.error);


// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const connectionStr = 'mongodb://localhost:27017';
// const client = new MongoClient(connectionStr);
// client.connect(function (err, client) {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     const db = client.db('testdb');
//     const users = db.collection('users');

//     users.insert({ name: 'Pavel' }).then(qr => {
//         console.log(qr);

//         users.deleteMany({ name: 'Pavel' }).then(qr => {
//             console.log(qr.result);
//         });
//     });
// });