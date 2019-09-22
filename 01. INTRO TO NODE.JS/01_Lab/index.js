const _ = require('lodash');
const fileManager = require('./file-manager');

fileManager.readUsers(function (err, content) {
    if (err) {
        console.error(err);
        return;
    }
    const userArray = content.split(',').map(a => a.trim());
    console.log(_.chunk(userArray, 2));
    console.log(content);
});

console.log("Hello Word!");