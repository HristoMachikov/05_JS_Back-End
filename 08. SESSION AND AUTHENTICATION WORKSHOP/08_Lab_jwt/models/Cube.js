const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cubeSchema = new Schema({
    name: { type: Schema.Types.String, required: true },
    description: { type: Schema.Types.String, required: true },
    imageUrl: { type: Schema.Types.String, required: true },
    difficulty: { type: Schema.Types.Number, required: true },
    accessoaries: [{ type: Schema.Types.ObjectId, ref: 'Accessoary' }]
})

cubeSchema.path('name').validate(function () {
    return this.name.length >= 3 && this.name.length <= 15;
}, "Name must be between 3 and 15 symbols!");
cubeSchema.path('description').validate(function () {
    return this.description.length >= 20 && this.description.length <= 300;
}, "Description must be between 20 and 300 symbols!");
cubeSchema.path('imageUrl').validate(function () {
    return this.imageUrl.startsWith('http')
        && this.imageUrl.endsWith('.jpg')
        || this.imageUrl.endsWith('.png');
}, "Image URL should start with http and end with .jpg or .png");
cubeSchema.path('difficulty').validate(function () {
    return this.difficulty >= 1 && this.difficulty <= 6;
}, "Difficulty should be between 1 and 6");

// cubeSchema.methods.getInfo = function(){
//     return `Name: ${this.name} -> Level: ${this.difficulty}`;
// }
// cubeSchema.methods.getDescription = function(){
//     return `Description: ${this.description}`;
// }
const Cube = mongoose.model('Cube', cubeSchema);
module.exports = Cube;