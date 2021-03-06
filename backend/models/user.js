const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema(
    {
        username: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        department : {type : String, required: true},
        admin :{type: Boolean, required: true}
    }
);

module.exports = mongoose.model('User', userSchema);