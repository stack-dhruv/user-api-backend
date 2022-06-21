const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const HobbyModel = new Schema({
    name:String
});

module.exports = mongoose.model('hobbies', HobbyModel);