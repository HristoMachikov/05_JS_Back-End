const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accessoarySchema = new Schema({
    name: { type: Schema.Types.String, required: [true, 'Name is required'] },
    description: { type: Schema.Types.String, required: [true, 'Description is required'] },
    imageUrl: { type: Schema.Types.String, required: [true, 'ImageUrl is required'] },
    cubes: [{ type: Schema.Types.ObjectId, ref: 'Cube' }]
})

accessoarySchema.path('name').validate(function (v) {
    return v.length >= 3 && v.length <= 15;
}, "Name must be between 3 and 15 symbols!");
accessoarySchema.path('description').validate(function (v) {
    return v.length >= 20 && v.length <= 300;
}, "Description must be between 20 and 300 symbols!");
accessoarySchema.path('imageUrl').validate(function (v) {
    return v.startsWith('http')
        && v.endsWith('.jpg')
        || v.endsWith('.png');
}, "Image URL should start with http and end with .jpg or .png");

const Accessoary = mongoose.model('Accessoary', accessoarySchema);
module.exports = Accessoary;