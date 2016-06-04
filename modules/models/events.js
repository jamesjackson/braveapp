// load the things we need
var mongoose = require('mongoose');
// define the schema for our events model
var eventsSchema = mongoose.Schema({
    name : { type : String, required : true },
    date : { type : Date, required : true },
    description : { type: String },
    sponsors : { type: String },
    address : { type: String },
    schedule : { type: String },
    map : { type: String }
});
// methods ======================

// add event

// list events

// create the model for users and expose it to our app
module.exports = mongoose.model('Events', eventsSchema);
