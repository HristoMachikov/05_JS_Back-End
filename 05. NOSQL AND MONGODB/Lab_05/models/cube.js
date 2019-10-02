// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const cubeSchema = new Schema({
//     name: { type: Schema.Types.String, required: true },
//     description: { type: Schema.Types.String, required: true },
//     imageUrl: { type: Schema.Types.String, required: true },
//     difficulty: { type: Schema.Types.Number, required: true }
// })

// cubeSchema.path('name').validate(function () {
//     return this.name.length >= 3 && this.name.length <= 15;
// }, "Name must be between 3 and 15 symbols!");
// cubeSchema.path('description').validate(function () {
//     return this.description.length >= 20 && this.description.length <= 300;
// }, "Description must be between 20 and 300 symbols!");
// cubeSchema.path('imageUrl').validate(function () {
//     return this.imageUrl.startsWith('http')
//         && this.imageUrl.endsWith('.jpg')
//         || this.imageUrl.endsWith('.png');
// }, "Image URL should start with http and end with .jpg or .png");
// cubeSchema.path('difficulty').validate(function () {
//     return this.difficulty >= 1 && this.difficulty.length <= 6;
// }, "Difficulty should be between 1 and 6");

// const Cube = mongoose.model('Cube', cubeSchema);
// module.exports = Cube;

const fs = require('fs');
const path = require('path');


class CubeModel {
    constructor() {
        this.data = require('../config/database');
    }

    __write(newData, resolveData) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path.resolve('config/database.json'), JSON.stringify(newData), (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                this.data = newData;
                resolve(resolveData);
            });

        });
    }

    create(name, description, imageUrl, difficulty) {
        return { name, description, imageUrl, difficulty };
    }

    insert(newCube) {
        const newIndex = ++this.data.lastIndex;
        newCube = { id: newIndex, ...newCube };
        const newData = {
            lastIndex: newIndex,
            entities: this.data.entities.concat(newCube)
        };
        return this.__write(newData, newCube);

    }
    update(cubeId, updates) {
        const entityIndex = this.data.entities.findIndex(({ id }) => id === cubeId);
        const entity = this.data.entities[entityIndex]
        const updatedEntity = { ...entity, ...updates }
        const newData = {
            lastIndex: this.data.lastIndex,
            entities: [
                ...this.data.entities.slice(0, entityIndex),
                updatedEntity,
                ...this.data.entities.slice(entityIndex + 1)
            ]
        };

        return this.__write(newData, updatedEntity);


    }

    delete(id) {
        const deletedEntity = this.getOne(id);
        const newData = {
            lastIndex: this.data.lastIndex,
            entities: this.data.entities.filter(({ id: i }) => i !== id)
        };
        return this.__write(newData, deletedEntity);
    }

    find(predFn) {
        return Promise.resolve(this.data.entities.filter(predFn));
    }

    getOne(id) {
        return this.find(({ id: i }) => i === id).then(res => res[0] || null);
    }

    getAll() {
        return Promise.resolve(this.data.entities);
    }
}

module.exports = new CubeModel();