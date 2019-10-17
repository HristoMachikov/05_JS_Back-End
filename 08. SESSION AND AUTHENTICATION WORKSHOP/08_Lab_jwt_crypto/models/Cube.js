const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cubeSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: [true, 'Name is required']
  },
  description: {
    type: Schema.Types.String,
    required: [true, 'Description is required']
  },
  imageUrl: {
    type: Schema.Types.String,
    required: [true, 'ImageUrl is required']
  },
  difficulty: { type: Schema.Types.Number },
  accessoaries: [{ type: Schema.Types.ObjectId, ref: 'Accessoary' }],
  creatorId: { type: Schema.Types.String }
})

cubeSchema.path('name').validate(function (v) {
  return v.length >= 3 && v.length <= 15
}, "Name must be between 3 and 15 symbols!");
cubeSchema.path('description').validate(function (v) {
  return v.length >= 20 && v.length <= 300;
}, "Description must be between 20 and 300 symbols!");
cubeSchema.path('imageUrl').validate(function (v) {
  return v.startsWith('http')
    && v.endsWith('.jpg')
    || v.endsWith('.png');
}, "Image URL should start with http and end with .jpg or .png");
cubeSchema.path('difficulty').validate(function (v) {
  return v >= 1 && v <= 6;
}, "Difficulty should be between 1 and 6");

// cubeSchema.methods.getInfo = function(){
//     return `Name: ${this.name} -> Level: ${this.difficulty}`;
// }
// cubeSchema.methods.getDescription = function(){
//     return `Description: ${this.description}`;
// }
const Cube = mongoose.model('Cube', cubeSchema);
module.exports = Cube;