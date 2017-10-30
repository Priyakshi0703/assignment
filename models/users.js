var mongoose = require('mongoose');

// Define our users schema
var UsersSchema = new mongoose.Schema({     
    user_id: {type:String, unique:true},               
    name: {type: String},
    address:{type: String},
    email: {type: String,unique:true},
    phone_number: {type: Number},
    father_name:{type: String},
    created_at: {type: Date, default: Date.now},
});



module.exports = mongoose.model('User',UsersSchema);