module.exports = (app) => {
    const notes = require('..//controllers/note.controller.js');

    //create a new note
    app.post('/notes', notes.create);
}