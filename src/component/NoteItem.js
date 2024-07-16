import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div className=" form-control ">
      <div className="noteitem card-body">
        <h5 className="card-title mb-2">{note.title}</h5>
        <p className="card-text mb-2">{note.description} </p>
        <h6 className="card-text mb-4">{note.tag} (tag)</h6>
        <div className="d-flex icon ">
          <p className="card-text">{new Date(note.timeStamp).toGMTString()}</p>
          <i
            className=" fa-solid fa-trash mx-2 d-flex "
            onClick={() => {
              deleteNote(note._id);
              props.showAlert("Deleted Successfully", "success");
            }}
          ></i>
          <i
            className=" fa-regular fa-pen-to-square "
            onClick={() => {
              updateNote(note);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
