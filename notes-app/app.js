const yargs = require('yargs'); //import yargs module for retrieving filtered input
const notes = require('./notes.js'); //import notes.js module for interacting with notes app

yargs.version('1.1.0'); //custom yargs version

//Create add command
yargs.command({
    command: 'add', //Name the command
    describe: 'Add new note', //Description for add command
    builder: { //Commands settings
        title: {
            describe: 'Note title', // argument description
            demandOption: true, //require title
            type: 'string' //set allowed data
        },
        body: {
            describe: 'Note body', // argument description
            demandOption: true, //require body
            type: 'string' //set allowed data
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);
    }
});

//Create remove command
yargs.command({
    command: 'remove', //Name the command
    describe: 'Remove a note', //Description for remove command
    builder: {
        title: {
            describe: 'title to be removed', //argument description
            demandOption: true, //require title
            type: 'string' //set allowed data
        }
    },
    handler(argv) {
        notes.removeNotes(argv.title);
    }
});

//Create read command
yargs.command({
    command: 'read', //Name the command
    describe: 'Reads a note', //Description for read command
    builder: {
        title: {
            describe: '', //argument description
            demandOption: true, //require title
            type: 'string' //set allowed data
        }
    },
    handler(argv) {
        notes.readNote(argv.title);
    }
});

//Create list command
yargs.command({
    command: 'list', //Name the command
    describe: 'Lists out all notes',
    builder: {
        title: {
            describe: '', //argument description
            demandOption: true, //require title
            type: 'string' //set allowed data
        }
    },
    handler() {
        notes.listNotes();
    }
});

yargs.parse(); //Runs the program