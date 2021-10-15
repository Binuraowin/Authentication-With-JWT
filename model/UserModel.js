const mongoose = require('mongoose')

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id:{type:String, required: true},
    name:{type:String, required: true},
    email:{type:String, required: true},
    password:{type:String, required: true},
    date:{type:Date, required: true, default: Date.now},
});

module.exports = mongoose.model('User',userSchema);