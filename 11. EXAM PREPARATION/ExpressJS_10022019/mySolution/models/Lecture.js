const { Schema, model } = require('mongoose');

const lectureSchema = new Schema({
    title: {
        type: Schema.Types.String,
        required: [true, 'Title required']
    },
    videoUrl: {
        type: Schema.Types.String,
        required: [true, 'Video Url required']
    },
    course: { type: Schema.Types.String }
});

const Lecture = model('Lecture', lectureSchema);
module.exports = Lecture;