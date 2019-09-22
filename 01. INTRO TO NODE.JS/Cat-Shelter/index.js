const http = require('http');
const port = 8080;
const handlers = require('./handlers');
// const handlers = require('./handlers/index.js');

const app = http.createServer((req, res) => {

    for (let handler of handlers) {
        if (!handler(req, res)) {
            break;
        }
    }

    // res.writeHead(200, { // Response Status Code
    //     'Content-Type': 'text/plain'
    // });
    // res.write('Hello JS World!');
    // res.end();

});

app.listen(port, function () {
    console.log(`Server is listening on port ${port}`)
});