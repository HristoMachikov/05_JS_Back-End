const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accessoarySchema = new Schema({
    name: { type: Schema.Types.String, required: true },
    description: { type: Schema.Types.String, required: true },
    imageUrl: { type: Schema.Types.String, required: true },
    cubes: [{ type: Schema.Types.ObjectId, ref: 'Cube' }]
})

accessoarySchema.path('name').validate(function () {
    return this.name.length >= 3 && this.name.length <= 15;
}, "Name must be between 3 and 15 symbols!");
accessoarySchema.path('description').validate(function () {
    return this.description.length >= 20 && this.description.length <= 300;
}, "Description must be between 20 and 300 symbols!");
accessoarySchema.path('imageUrl').validate(function () {
    return this.imageUrl.startsWith('http')
        && this.imageUrl.endsWith('.jpg')
        || this.imageUrl.endsWith('.png');
}, "Image URL should start with http and end with .jpg or .png");

const Accessoary = mongoose.model('Accessoary', accessoarySchema);
module.exports = Accessoary;