const { Schema, model } = require('mongoose');

const tokenBlacklistSchema = new Schema({
    token: { type: Schema.Types.String },
});

module.exports = model('TokenBlacklist', tokenBlacklistSchema);