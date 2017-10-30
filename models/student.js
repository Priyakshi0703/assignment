var mongoose = require('mongoose');

// Define our student schema
var StudentSchema = new mongoose.Schema({    
    student_id: {type:String, unique:true},                      
    stream: {type: String},
    section: {type: String},
    created_at: {type: Date, default: Date.now},
    university_id:{type:String}
});



module.exports = mongoose.model('Student',StudentSchema);