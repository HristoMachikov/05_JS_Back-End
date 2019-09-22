const https = require('https');

https.get('https://google.com/', function (res) {
    let result = "";

    res.on('data', function (chunk) {
        result = result + chunk;
    });

    res.on('end', function () {
        console.log(result);
    })
})