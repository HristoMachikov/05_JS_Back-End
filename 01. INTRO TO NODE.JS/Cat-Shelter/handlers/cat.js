const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const formidable = require('formidable');
const breeds = require('../data/breeds');
const cats = require('../data/cats');

module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;

    if (pathname === '/cats/add-cat' && req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, '../views/addCat.html'));
        const index = fs.createReadStream(filePath);
        index.on('data', (data) => {
            let catBreedPlaceholder = breeds.map((breed) => `<option value="${breed}">${breed}</option>`);
            let modifiedData = data.toString().replace('{{catBreeds}}', catBreedPlaceholder.join('\n'));
            res.write(modifiedData);
        });

        index.on('end', () => {
            res.end();
        });

        index.on('error', (err) => {
            console.log(err);
        });

    } else if (pathname === '/cats/add-breed' && req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, '../views/addBreed.html'));
        const index = fs.createReadStream(filePath);
        index.on('data', (data) => {
            res.write(data);
        });

        index.on('end', () => {
            res.end();
        });

        index.on('error', (err) => {
            console.log(err);
        });

    } else if (pathname === '/cats/add-breed' && req.method === 'POST') {
        let formBreeds = "";

        req.on('data', (data) => {
            formBreeds += data;
        });
        req.on('end', () => {
            let body = qs.parse(formBreeds);

            fs.readFile('./data/breeds.json', (err, data) => {
                if (err) {
                    throw err;
                }
                let breeds = JSON.parse(data);
                breeds.push(body.breed);
                let json = JSON.stringify(breeds);

                fs.writeFile('./data/breeds.json', json, 'utf-8', () => {
                    console.log('The breed was updated successfully!');
                })
            });

            res.writeHead(200, { localhost: '/' });
            res.end();
        });

    } else if (pathname === '/cats/add-cat' && req.method === 'POST') {
        // let globalPath = __dirname;
        let form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {
            if (err) throw err;
            
            let oldPath = files.upload.path;
            let newPath = path.normalize(path.join(__dirname, '../', 'content/images/' + files.upload.name));
            // console.log(oldPath);
            // console.log(newPath);
            fs.rename(oldPath, newPath, (err) => {
                if (err) throw err;
                console.log('Filles was upload successfully!');
            });

            fs.readFile('./data/cats.json', 'utf8', (err, data) => {
                if (err) throw err;
                let allCats = JSON.parse(data);
                allCats.push({ ...fields, id: cats.length + 1, image: files.upload.name });
                let json = JSON.stringify(allCats);
                fs.writeFile('./data/cats.json', json, () => {
                    res.writeHead(200, { localehost: '/' });
                });
            });
        });
    } else {
        return true;
    }
}