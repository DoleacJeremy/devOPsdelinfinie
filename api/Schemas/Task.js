// Dependencies
const mongoose = require( 'mongoose' );

// Task
const Task = new mongoose.Schema({
    rdm: String,
    task: String
});

// Export
module.exports = mongoose.model( "task" , Task , "tasks" );