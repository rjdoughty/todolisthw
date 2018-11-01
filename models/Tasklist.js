const mongoose = require('mongoose');

/* ---  MODEL --- */

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;


var TasklistSchema = new Schema({

todoItem: {
    type: String,
    required: "Item is Required"
},
completed: {
    type: Boolean,
    default: false
},
checkbox: {
    type: String,
    default: "unchecked"
}


});

// create model , using Mongoose's model method
var Tasklist = mongoose.model("Task", TasklistSchema);
// Export the model
module.exports = Tasklist;