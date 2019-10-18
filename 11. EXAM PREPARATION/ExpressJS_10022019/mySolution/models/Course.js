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
    lectures: [{ type: Schema.Types.ObjectId, ref: 'Lecture' }],
    usersEnrolled: [{ type: Schema.Types.ObjectId, ref: 'User' }]
    // creatorId: { type: Schema.Types.String }
});

courseSchema.path('description').validate(function (v) {
    return v.length <= 50;
}, "Description must be less than 50 symbols!");

const Course = model('Course', courseSchema);
module.exports = Course;