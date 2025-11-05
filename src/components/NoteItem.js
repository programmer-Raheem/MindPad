import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const { deleteNote } = useContext(noteContext);
  const { note, updateNote, showAlert } = props; // Destructure showAlert

  const handleDelete = () => {
    deleteNote(note._id);
    if (showAlert) {
      showAlert("Note deleted successfully!", "danger");
    }
  };

  const handleEdit = () => {
    if (updateNote) {
      updateNote(note); // Open the edit modal
    }
    if (showAlert) {
      showAlert("Note edit triggered!", "info");
    }
  };

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          {note.tag && <p className="text-muted">Tag: {note.tag}</p>} {/* ✅ Display tag */}
          <i
            className="fa-solid fa-trash mx-2 text-danger"
            style={{ cursor: "pointer" }}
            onClick={handleDelete}
          ></i>
          <i
            className="fa-solid fa-pen-to-square mx-2 text-primary"
            style={{ cursor: "pointer" }}
            onClick={handleEdit}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
