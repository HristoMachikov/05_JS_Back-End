const { Schema, model } = require('mongoose');

const articleSchema = new Schema({
    title: {
        type: Schema.Types.String,
        required: [true, 'Title required'],
        unique: true
    },
    description: {
        type: Schema.Types.String,
        required: [true, 'Description required']
    },
    createdAt: {
        type: Schema.Types.String,
    },
    // usersEnrolled: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    authorId: { type: Schema.Types.String }
});

articleSchema.path('title').validate(function (v) {
    return v.length >= 4;
    // && v.length <= 15;
}, "Title must be at least 4 characters long!");
articleSchema.path('description').validate(function (v) {
    return v.length >= 20;
    // && v.length <= 300;
}, "Description must be at least 20 characters long!");

const Article = model('Article', articleSchema);
module.exports = Article;