const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//ROUTE-1:  Get all the notes: GET "/api/notes/fatchallnotes". Login require
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
//ROUTE-2:  add a new note : POST "/api/notes/addnote". Login require
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "enter a minimum 3 charactors title").isLength({ min: 3 }),
    body("description", "enter a minimum 4 charactors description").isLength({min: 5})
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //If there are errors, return Bad request and the errors
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id
      })
      const saveNote = await note.save();
      res.json( saveNote );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
//ROUTE-3:  update an existing note: PUT "/api/notes/updatenews". Login require
router.put("/updatenews/:id", fetchuser, async (req, res) => {
  try {      
    const { title, description, tag } = req.body;
    //Creating a newNote Object
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    //Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});

    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
//ROUTE-4:  delete an existing note: DELETE "/api/notes/deletenote". Login require
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {      
    const { title, description, tag } = req.body;
    
    //Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);

    res.json({"Success": "Note has been deleted", note: note});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
