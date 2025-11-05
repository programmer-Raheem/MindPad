import { useState } from 'react';
import NoteContext from './notecontext';

const NoteState = (props) => {
  const host = "http://localhost:5000"; // 🔗 your backend base URL

  const [notes, setNotes] = useState([]);

  // 🟢 Fetch all notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjhmYTcyNWFiMzM3NDZiMzRiNDlhNmNmIn0sImlhdCI6MTc2MTMyODcyMX0.xfcoX4LOzIs5jUTMkiSJTZbHOag-Rl86f1_hmd5wIbk",
      },
    });

    const json = await response.json();
    setNotes(json);
  };

  // 🟢 Add a new note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjhmYTcyNWFiMzM3NDZiMzRiNDlhNmNmIn0sImlhdCI6MTc2MTMyODcyMX0.xfcoX4LOzIs5jUTMkiSJTZbHOag-Rl86f1_hmd5wIbk",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();
    setNotes(notes.concat(note)); // ✅ append the new note
  };

  // 🟠 Delete a note
  const deleteNote = async (id) => {
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjhmYTcyNWFiMzM3NDZiMzRiNDlhNmNmIn0sImlhdCI6MTc2MTMyODcyMX0.xfcoX4LOzIs5jUTMkiSJTZbHOag-Rl86f1_hmd5wIbk",
      },
    });

    console.log("🗑️ Deleting the note with id:", id);

    // ✅ Update local state after deleting
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  };

  // 🟣 Edit (Update) a note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjhmYTcyNWFiMzM3NDZiMzRiNDlhNmNmIn0sImlhdCI6MTc2MTMyODcyMX0.xfcoX4LOzIs5jUTMkiSJTZbHOag-Rl86f1_hmd5wIbk",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json(); // ✅ fixed (added 'await' + correct variable name)

    console.log("✏️ Updated note:", json);

    // ✅ Update state locally (no need to re-fetch all)
    const newNotes = notes.map((note) => {
      if (note._id === id) {
        return { ...note, title, description, tag };
      }
      return note;
    });

    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
  