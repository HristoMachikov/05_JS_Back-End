const { Schema, model } = require('mongoose');

const courseSchema = new Schema({
    title: {
        type: Schema.Types.String,
        required: [true, 'Title required'],
        unique: true
    },
    description: {
        type: Schema.Types.String,
        required: [true, 'Description required']
    },
    imageUrl: {
        type: Schema.Types.String,
        required: [true, 'ImageUrl required']
    },
    isPublic: { type: Schema.Types.Boolean, default: false },
    // lectures: [{ type: Schema.Types.ObjectId, ref: 'Lecture' }],
    createdAt: {
        type: Schema.Types.String,
        required: [true, 'Date required']
    },
    usersEnrolled: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    creatorId: { type: Schema.Types.String }
});

courseSchema.path('title').validate(function (v) {
    return v.length >= 4;
    // && v.length <= 15;
}, "Title must be at least 4 characters long!");
courseSchema.path('description').validate(function (v) {
    return v.length >= 20;
    // && v.length <= 300;
}, "Description must be at least 20 characters long!");
courseSchema.path('imageUrl').validate(function (v) {
    return v.startsWith('http') || v.startsWith('https');
    //   && v.endsWith('.jpg')
    //   || v.endsWith('.png');
    //   }, "Image URL should start with http and end with .jpg or .png");
}, "Image URL should start with http or https");

const Course = model('Course', courseSchema);
module.exports = Course;