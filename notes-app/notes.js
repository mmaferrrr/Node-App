const chalk = require('chalk'); //import chalk module for styled logs
const fs = require('fs'); //import file system module for interacting with files

//Adds a new note to json file
const addNote = (title, body) => {
    const notes = loadNotes(); //loads preexisting notes
    const duplicateNote = notes.filter((note) => note.title === title) //finds if new note title already exists

    if (!duplicateNote) { //checks if duplicate was found
        //Adds new note if duplicate was not found
        notes.push({
            title: title,
            body: body,
        })
        saveNotes(notes); //Adds new note with preexisting notes
        console.log('New note added!'); //logs status
    } else {
        console.log('Note title taken!') //logs status
    }
}

//Removes a note passed by user
const removeNotes = (title) => {
    const notes = loadNotes(); //loads preexisting notes
    const notesToKeep = notes.filter((note) => note.title !== title);

    if (notes.length !== keptNotes.length) {
        console.log(chalk.green.inverse(`Note removed: ${title}!`)) //logs status
        saveNotes(notesToKeep);
    } else console.log(chalk.red.inverse('No note found!')); //logs status

}

const readNote = (title) => {
    const notes = loadNotes(); //loads preexisting notes
    const note = notes.find(note => note.title === title) //Finds note from user input
    if (note) { //checks if note was found
        console.log(chalk.inverse(note.title)); // logs title of note
        console.log(note.body) //logs body of note
    } else {
        console.log(chalk.red.inverse("Note not found!")); //logs status if note was not found
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes); //converts notes object to json string
    fs.writeFileSync('notes.json', dataJSON); //writes json string into json file
}

const listNotes = () => {
  const notes = loadNotes(); //loads preexisting notes

  console.log(chalk.inverse('Your notes')); //logs status

  notes.forEach((note) => {
      console.log(note.title) //logs each note title in the data.json file
  });
}

//recieves notes data from json
const loadNotes = () => {
    //Reads data from json file or handles error
    try {
        const dataBuffer = fs.readFileSync('notes.json'); // reads notes.json 
        const dataJSON = dataBuffer.toString(); //turns data into string
        return JSON.parse(dataJSON); //turns json string into object
    } catch (err) {
        return []; //returns empty array if error retrieving json
    }
}

//exports relevant methods
module.exports = {
    addNote: addNote,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNote: readNote
}