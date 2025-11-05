import React, { useState, useContext } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
  const { addNote } = useContext(noteContext);
  const { showAlert } = props;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleClick = async (e) => {
    e.preventDefault();

    if (note.title.trim().length < 3) {
      showAlert("Title must be at least 3 characters long!", "warning");
      return;
    }

    if (note.description.trim().length < 5) {
      showAlert("Description must be at least 5 characters long!", "warning");
      return;
    }

    const success = await addNote(
      note.title.trim(),
      note.description.trim(),
      note.tag.trim()
    );

    if (success) {
      setNote({ title: "", description: "", tag: "" });
    }
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const isDisabled =
    note.title.trim().length < 3 || note.description.trim().length < 5;

  return (
    <div className="container my-3">
      <h2>Add Note</h2>
      <form>
        <div className="form-group my-2">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            onChange={onChange}
            required
            minLength={3}
            placeholder="Enter at least 3 characters"
          />
        </div>

        <div className="form-group my-2">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            onChange={onChange}
            required
            minLength={5}
            placeholder="Enter at least 5 characters"
          />
        </div>

        <div className="form-group my-2">
          <label htmlFor="tag">Tag</label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={onChange}
            placeholder="Optional"
          />
        </div>

        <button
          type="button" // ✅ prevent page refresh
          className="btn btn-primary my-3"
          onClick={handleClick}
          disabled={isDisabled}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
