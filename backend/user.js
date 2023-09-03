const mongoose = require('mongoose');

const schema = mongoose.Schema({
    Name: { type: String },
    Email: { type: String, required: true },
    Password: { type: String, required: true },
});
const Users = mongoose.model('Users',schema);
module.exports = Users;