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

            res.writeHead(302, { location: '/' });
            res.end();
        });

    } else if (pathname === '/cats/add-cat' && req.method === 'POST') {
        // let globalPath = __dirname;
        let form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {
            if (err) throw err;

            let oldPath = files.upload.path;
            let newPath = path.normalize(path.join(__dirname, '../', 'content/images/' + files.upload.name));
            fs.rename(oldPath, newPath, (err) => {
                if (err) throw err;
                console.log('Filles was upload successfully!');
            });

            fs.readFile('./data/cats.json', 'utf-8', (err, data) => {
                if (err) throw err;
                let allCats = JSON.parse(data);
                allCats.push({ id: allCats.length + 1, ...fields, image: files.upload.name });
                let json = JSON.stringify(allCats);
                fs.writeFile('./data/cats.json', json, () => {
                    res.writeHead(302, { location: '/' });
                    // res.redirect("/");
                    res.end();
                });
            });
        });
    } else if (pathname.includes('/cats-edit') && req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, '../views/editCat.html'));
        const index = fs.createReadStream(filePath);
        index.on('data', (data) => {
            let catId = req.url.split('/')[2];
            let currentCat = cats.filter((cat) => cat.id === catId);
            let modifiedData = data.toString().replace('{{id}}', catId);
            modifiedData = modifiedData.replace('{{name}}', currentCat.name);
            modifiedData = modifiedData.replace('{{description}}', currentCat.description);
            let catBreedPlaceholder = breeds.map((breed) => `<option value="${breed}">${breed}</option>`);
            modifiedData = modifiedData.replace('{{catBreeds}}', catBreedPlaceholder.join('\n'));
            res.write(modifiedData);
        });

        index.on('end', () => {
            res.end();
        });

        index.on('error', (err) => {
            console.log(err);
        });

    } else if (pathname.includes('/cats-find-new-home') && req.method === 'GET') {

        let filePath = path.normalize(path.join(__dirname, '../views/catShelter.html'));
        const index = fs.createReadStream(filePath);
        index.on('data', (data) => {
            let catId = req.url.split('/')[2];
            let currentCat = cats.filter((cat) => cat.id === catId);
            let currentImg = path.join('./content/images/' + currentCat.image);
            let modifiedData = data.toString().replace('{{id}}', catId);
            modifiedData = modifiedData.replace('{{image}}', currentImg);
            modifiedData = modifiedData.replace('{{name}}', currentCat.name);
            modifiedData = modifiedData.replace('{{description}}', currentCat.description);
            modifiedData = modifiedData.replace('{{breed}}', currentCat.breed);
            res.write(modifiedData);
        });

        index.on('end', () => {
            res.end();
        });

        index.on('error', (err) => {
            console.log(err);
        });


    } else if (pathname.includes('/cats-edit') && req.method === 'POST') {

        let form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {
            if (err) throw err;

            fs.readFile('./data/cats.json', 'utf-8', (err, data) => {
                if (err) throw err;
                let allCats = JSON.parse(data);
                let catId = req.url.split('/')[2];
                let editedCats = allCats.forEach((item, index, arr) => {
                    if (index === +catId) {
                        arr[index] = { ...fields };
                    }
                });
                let json = JSON.stringify(editedCats);
                fs.writeFile('./data/cats.json', json, () => {
                    res.writeHead(302, { location: '/' });
                    // res.redirect("/");
                    res.end();
                });
            });
        });

    } else if (pathname.includes('/cats-find-new-home') && req.method === 'POST') {

        fs.readFile('./data/cats.json', 'utf-8', (err, data) => {
            if (err) throw err;
            let allCats = JSON.parse(data);
            let catId = req.url.split('/')[2];
            let remainCats = allCats.filter((cat) => cat.id !== catId);
            let json = JSON.stringify(remainCats);
            fs.writeFile('./data/cats.json', json, () => {
                res.writeHead(302, { location: '/' });
                // res.redirect("/");
                res.end();
            });
        });

    } else {
        return true;
    }
}