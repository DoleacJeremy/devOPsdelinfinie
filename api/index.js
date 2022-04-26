// Dependencies
const express = require( 'express' );
const cors = require( 'cors' );
const mongoose = require( 'mongoose' );
require( 'dotenv' ).config({ path: './.env' });

// Interfaces
const db = require( './interfaces/DB' );

// API server
const server = express();
server.use( cors() );
server.use( express.json() );

// Connect to the DB
mongoose.Promise = global.Promise;
mongoose.connect( process.env.DB_URI + "/" + process.env.DB_NAME , {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

// Routes
server.get( '/app/tasks' , ( req , res ) => {
    db.getTasks()
    .then( ( tasks ) => {
        res.json({ data: tasks });
    })
    .catch( () => {
        console.log( "Error" );
    })
});

server.post( '/app/task' , ( req , res ) => {
    const newTask = req.body;
    db.newTask( newTask )
    .then( ( status ) => {
        res.json({ status: status });
    })
    .catch( () => {
        console.log( "Error" );
    })
});

server.post( '/app/task_update' , ( req , res ) => {
    const rdm = req.body.rdm;
    const dataToUpdate = req.body.task;
    db.updateTask( rdm , dataToUpdate )
    .then( ( status ) => {
        res.json({ status: status });
    })
    .catch( () => {
        console.log( "Error" );
    })
});

server.post( '/app/task_delete' , ( req , res ) => {
    const rdm = req.body.rdm;
    console.log( "RDM : " + rdm );
    db.deleteTask( rdm )
    .then( ( status ) => {
        res.json({ status: status });
    })
    .catch( () => {
        console.log( "Error" );
    })
});

// API listener
server.listen( process.env.API_PORT , () => {
    if ( process.env.API_PORT == undefined || process.env.API_PORT == null ) {
        console.log( "API port is not setup in a .env file, please setup it to run the API" );
    } else {
        console.log( "API is running" );
    }
})