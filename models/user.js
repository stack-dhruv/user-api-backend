const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserModel = new Schema({
    firstName:String,
    lastName:String,
    email:String,
    dob:Date,
    hobbies: [{
        type: Schema.Types.ObjectId,
        ref: 'hobbies'
    }],
    password : {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('users', UserModel);