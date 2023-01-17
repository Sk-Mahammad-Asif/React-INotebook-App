const express = require('express');
const router =  express.Router();
const { body, validationResult } = require('express-validator');
var fetchuser = require('../middleware/fetchuser');
//const Note = require('../models/Note');
const Note = require('../models/Note');


//fetch all note those user already login 

//Route-1:  Get all notes using: GET "api/notes/fetchallnotes" . login required  
router.get('/fetchallnotes', fetchuser, async (req, res)=> {

    try{

        //find user notes for that particular user
        const notes = await Note.find({user: req.user.id});
        res.json(notes)
     }catch(error)
     {
        //for handling error message.
        console.error(error.message);
        res.status(500).send("Internal server error");
     }
})


//Route-2:  Add notes using: POST "api/notes/addnote" . login required  
router.post('/addnote', fetchuser, [

    // set valid name, email, password for exact length for i need.
     body('title', 'Enter a valid title ').isLength({ min: 3 }),
     body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
 
 ], async (req, res)=> {

    try{

        //fetching data from UI/api
        const {title, description, tag} = req.body;
        
        // If there are errors, return Bad request and the errors copying from here
        //https://express-validator.github.io/docs/
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //saving data in to database
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const saveNote = await note.save()


        res.json(saveNote)

    }catch(error)
    {
        //for handling error message.
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
})


//Route-3: Update existing notes using: PUT "api/notes/updatenote" . login required 
router.put('/updatenote/:id', fetchuser,  async (req, res)=> {

    const {title, description, tag} = req.body;
    //create a newNote object
    try{
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        //Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")}

        //matching user for 1:1 matching
        if(note.user.toString() != req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
        res.json({note});
    }catch(error)
    {
        //for handling error message.
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }

})


//Route-4: Delete existing notes using: Delete "api/notes/deletenote" . login required 
router.delete('/deletenote/:id', fetchuser,  async (req, res)=> {

    const {title, description, tag} = req.body;
    //create a newNote object
    try{
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        //Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")}

        //matching user for 1:1 matching
        if(note.user.toString() != req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"Success" : "Note has been deleted", note: note});
    }catch(error)
    {
        //for handling error message.
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }

})


module.exports = router