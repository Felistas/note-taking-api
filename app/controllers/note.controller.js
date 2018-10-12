const Note = require('../models/note.model.js');

exports.create = (req, res) =>{
    //validate request
    if(!req.body.content){
        return res.status(400).send({
            message : "Note content cannot be empty"
        })
    }

    //create note
    const note = new Note({
        title: req.body.title || 'Untitled Note',
        content: req.body.content
    })

    //save the note
    note.save()
    .then(data => {
        res.status(200).send(data);
    }).catch(err=>{
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the Note'
        });
    });

};

//find a single note
exports.findOne = (req, res) => {
    Note.findById(req.params.noteId)
    .then(note => {
        if(!note){
            return res.status(404).send({
                message:"Note with Id" + req.params.noteId + "note found"
            });
        }
        res.status(200).send(note);
    
    }).catch(err => {
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        return res.status(500).send({
            message:"Error retrieving note with id " + req.params.noteId
        });
    });
};

//retrieve all notes
exports.findAll = (req, res)=>{
    Note.find()
    .then(notes=>{
        res.send(notes);
    }).catch(err=>{
        res.status(500).send({
            message:err.message || "Some error occured during data processing"
        })
    })
}

//update a specific note
exports.update = (req, res)=>{
    if(!req.body.content){
        res.status(400).send({
            message: "Content cannot be empty"
        })
    }
    Note.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title,
        content: req.body.content
    }, {new:true})
    .then(note => {
        if(!note){
            return res.status(404).send({
                message:"Requested note not found"
            })
        }
        res.send(note);
    }).catch(err =>{
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "Note with requested Id not found"
            });
        }
        return res.status(500).send({
            message:"Error updating note"
        })
    })

}