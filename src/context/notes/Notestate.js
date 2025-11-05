import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const { showAlert } = props;
  const [notes, setNotes] = useState([]);

  // 🟢 Helper: Get token
  const getAuthToken = () => localStorage.getItem("token");

  // 🟢 Fetch all notes
  const getNotes = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        showAlert && showAlert("Please login first!", "warning");
        return;
      }

      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.error("Error fetching notes:", error);
      showAlert && showAlert("Failed to fetch notes!", "danger");
    }
  };

  // 🟢 Add Note
  const addNote = async (title, description, tag) => {
    try {
      if (!title || !description) {
        showAlert && showAlert("Title and Description are required!", "warning");
        return false;
      }

      const token = getAuthToken();
      if (!token) {
        showAlert && showAlert("Please login first!", "warning");
        return false;
      }

      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ title, description, tag: tag || "General" }),
      });

      const json = await response.json();

      if (response.ok && json._id) {
        setNotes(notes.concat(json));
        showAlert && showAlert("Note added successfully!", "success");
        return true;
      } else {
        showAlert && showAlert("Failed to add note!", "danger");
        return false;
      }
    } catch (error) {
      console.error("Add note error:", error);
      showAlert && showAlert("Error adding note!", "danger");
      return false;
    }
  };

  // 🟠 Delete Note
  const deleteNote = async (id) => {
    try {
      const token = getAuthToken();
      if (!token) {
        showAlert && showAlert("Please login first!", "warning");
        return false;
      }

      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      if (!response.ok) throw new Error("Failed to delete note");

      const newNotes = notes.filter((note) => note._id !== id);
      setNotes(newNotes);
      showAlert && showAlert("Note deleted successfully!", "success");
      return true;
    } catch (error) {
      console.error("Delete note error:", error);
      showAlert && showAlert("Error deleting note!", "danger");
      return false;
    }
  };

  // 🟣 Edit Note
  const editNote = async (id, title, description, tag) => {
    try {
      const token = getAuthToken();
      if (!token) {
        showAlert && showAlert("Please login first!", "warning");
        return false;
      }

      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) throw new Error("Update failed");

      const newNotes = notes.map((note) =>
        note._id === id ? { ...note, title, description, tag } : note
      );
      setNotes(newNotes);
      showAlert && showAlert("Note updated successfully!", "success");
      return true;
    } catch (error) {
      console.error("Edit note error:", error);
      showAlert && showAlert("Failed to update note!", "danger");
      return false;
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
