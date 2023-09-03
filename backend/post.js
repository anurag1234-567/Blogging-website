const mongoose = require('mongoose');

const schema = mongoose.Schema({
    Title: { type: String, required: true },
    Author: { type: String, required: true },
    Content: { type: String, required: true },
    userId: { type: String, required: true },
    CreatedAt: {type:Date, default: Date.now }
});

const Posts = mongoose.model('Posts',schema);
module.exports = Posts;