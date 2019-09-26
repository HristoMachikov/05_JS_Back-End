const url = require('url');
const fs = require('fs');
const path = require('path');

function getContentType(inputUrl) {
    let url = inputUrl.toLowerCase();
    if (url.endsWith('css')) {
        return 'text/css';
    } else if (url.endsWith('js')) {
        return 'text/jacascript';
    } else if (url.endsWith('html')) {
        return 'text/html';
    } else if (url.endsWith('jpeg') || url.endsWith('jpg')) {
        return 'image/jpeg';
    } else if (url.endsWith('gif')) {
        return 'image/gif';
    } else if (url.endsWith('bmp')) {
        return 'image/bmp';
    } else if (url.endsWith('png')) {
        return 'image/apng';
    } else if (url.endsWith('ttf')) {
        return 'image/ttf';
    } else if (url.endsWith('pdf')) {
        return 'application/pdf';
    } else if (url.endsWith('ico')) {
        return 'image/png';
        // return 'image/vnd.microsoft.icon';
    }
};

module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;
    if (pathname.startsWith('/content') && req.method === 'GET') {

        if (pathname.endsWith('png') 
        || pathname.endsWith('jpeg') 
        || pathname.endsWith('jpg')
        || pathname.endsWith('ico')
        || pathname.endsWith('JPG')) {

            fs.readFile(`./${pathname}`, (err, data) => {
                if (err) {
                    console.log(err);

                    res.writeHead(404, {
                        'Content-Type': 'text/plain'
                    });
                    res.write('Error was found');
                    res.end();
                    return;
                }
                // console.log(pathname);
                res.writeHead(200, {
                    'Content-Type': getContentType(pathname)
                });
                res.write(data);
                res.end();
            });

        } else {

            fs.readFile(`./${pathname}`, 'utf-8', (err, data) => {
                if (err) {
                    console.log(err);

                    res.writeHead(404, {
                        'Content-Type': 'text/plain'
                    });
                    res.write('Error was found');
                    res.end();
                    return;
                }
                // console.log(pathname);
                res.writeHead(200, {
                    'Content-Type': getContentType(pathname)
                });
                res.write(data);
                res.end();
            });
        }

    } else {
        return true;
    }
}