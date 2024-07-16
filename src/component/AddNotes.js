import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
const AddNotes = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("Note added Successfully", "success");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div>
        
        <div className="addnote  my-3">
          <h2>Add a Note</h2>
          <form>
            <div className="input mb-3">
              <label htmlFor="title" className="form-label">
                Title:-
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                aria-describedby="title"
                minLength={5}
                required
                value={note.title}
                onChange={onChange}
              />
            </div>
            <div className="input mb-3">
              <label htmlFor="description" className="form-label">
                Description: -
              </label>
              <textarea
                type="text"
                rows={10}
                className=" form-control"
                id="description"
                name="description"
                value={note.description}
                minLength={5}
                required
                onChange={onChange}
              />
            </div>

            <div className="input mb-3">
              <label htmlFor="tag" className="form-label">
                Tag:-
              </label>
              <input
                type="text"
                className="form-control"
                id="tag"
                name="tag"
                value={note.tag}
                onChange={onChange}
              />
            </div>

            <button
              type="button"
              disabled={note.title.length < 5 || note.description.length < 5}
              className="btn btn-outline-primary"
              onClick={handleClick}
            >
              Add Note
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNotes;
