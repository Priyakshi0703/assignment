// Load required packages
var mongoose = require('mongoose');

// Define our universitydetails schema
var UniversitySchema = new mongoose.Schema({
    university_id:{type:String},  
    university: {type: String},
    state: {type: String},
    created_at: {type: Date, default: Date.now},
});

// Export the Mongoose model
module.exports = mongoose.model('University', UniversitySchema);

