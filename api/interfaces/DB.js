// Dependencies
const mongoose = require( 'mongoose' );

// Schema
const Task = require( '../Schemas/Task' );

// Functions
async function newTask ( taskInfos ) {
    try {
        const task = await Task.create( taskInfos );
        await task.save();
        console.log( "Task created" );
        return "done";
    } catch ( e ) {
        console.log( e.message );
    }
};

async function getTasks () {
    try {
        const taskList = await Task.find()
        console.log( taskList );
        return taskList;
    } catch ( e ) {
        console.log( e.message );
    }
};

async function getTaskByFilter ( filter ) {
    try {
        const filteredTaskList = await Task.find( filter );
        console.log( filteredTaskList );
        return filteredTaskList;
    } catch ( e ) {
        console.log( e.message );
    }
};

async function updateTask ( rdm , dataToUpdate ) {
    try {
        await Task.updateOne( { rdm: rdm , task: dataToUpdate } );
        console.log( "Task updated" );
        return "done";
    } catch ( e ) {
        console.log( e.message );
        return "error";
    }
};

async function deleteTask ( rdm ) {
    try {
        await Task.deleteOne( { rdm: rdm } );
        console.log( "Task deleted" );
        return "done";
    } catch ( e ) { 
        console.log( e.message );
        return "error";
    }
};

// Exports
module.exports = {
    newTask,
    getTasks,
    getTaskByFilter,
    updateTask,
    deleteTask
};