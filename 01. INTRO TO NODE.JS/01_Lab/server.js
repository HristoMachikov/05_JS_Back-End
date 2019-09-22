const http = require('http');
const url = require('url');
const port = 8080;
const arr = [1, 2, 3];

const app = http.createServer((req, res) => {
    // console.log(req.headers);
    // res.write('Hello');
    // setTimeout(function () {
    //     res.write(' ');
    //     res.end('World!');
    // }, 10000)

    let path = url.parse(req['url']).pathname;
    let { pathname } = url.parse(req['url']);
    console.log(path);
    console.log(pathname);
    if (path === '/') {
        // res.end('Home')
        res.writeHead(200, { // Response Status Code
            // 'Content-Type': 'text/plain'
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(arr));
        return;
    }

    if (path === '/about') {
        res.end('About')
        return;
    }
});

app.listen(port, function () {
    console.log(`Server is listening on port ${port}`)
});
console.log(`Node.js server running on port ${port}`);
