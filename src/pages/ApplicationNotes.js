// users can take notes under each job application
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { auth, db } from "../firebase";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

// This page displays the notes of a specific application.
// Users can create new notes or view old ones.
export default function ApplicationNotes() {
  const { id } = useParams(); //get app ID from URL
  const navigate = useNavigate();
  // variables for notes
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [important, setImportant] = useState("");
  const [todo, setTodo] = useState("");

  // notes initialized
  const [notes, setNotes] = useState([]);

  //fetches the notes from the user
  useEffect(() => {
    const fetchNotes = onAuthStateChanged(auth, async (user) => {
      try {
        const user = auth.currentUser; //gets user credentials
        const documents = await getDocs(
          collection(db, "users", user.uid, "aplications", id, "notes")
        );

        const documentsDicts = documents.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setNotes(documentsDicts); //sets the notes
      } catch (error) {
        console.error("Error getting aplications", error);
      }
    });
    return () => fetchNotes();
  }, [id]);

  //applies data entered to database
  const applyNote = async (e) => {
    e.preventDefault(); //prevents website to reload

    try {
      const user = auth.currentUser;
      await addDoc(
        collection(db, "users", user.uid, "aplications", id, "notes"),
        { title: title, body: body, important: important, todo: todo }
      );
      navigate(0);
    } catch (error) {
      alert("updating data error", error);
    }
  };

  // If requiered fields filled updated database
  const handleNote = async (e) => {
    if (!title || !body) return alert("Please fill in all fields");
    await applyNote(e);
  };

  return (
    <div className="application-notes">
      <Navbar />
      <div className="notes-container">
        <h1>Notes</h1>

        <div className="notes-layout">
          {/* display existing notes */}
          <div className="notes-list">
            {notes.length > 0 ? (
              notes.map((note, index) => (
                <div key={index} className="note-card">
                  <div className="note-header">
                    <h3>{note.title || "Untitled Note"}</h3>
                    <span className="note-date">{note.date || ""}</span>
                  </div>
                  <div className="note-content">
                    <div className="note-body">
                      <h4>Notes:</h4>
                      <p>{note.body}</p>
                    </div>
                    <div className="note-important">
                      <h4>Important:</h4>
                      <p>{note.important || "-"}</p>
                    </div>
                  </div>
                  <div className="note-todo">
                    <h4>To Do:</h4>
                    <p>{note.todo || "-"}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No notes yet. Add your first note below.</p>
            )}
          </div>

          {/* new note form */}
          <div className="new-note-form">
            <h2>Add New Note</h2>
            <div className="form-group">
              <label>Title:</label>
              <input
                id="title"
                type="text"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Body:</label>
                <textarea
                  id="body"
                  name="body"
                  onChange={(e) => setBody(e.target.value)}
                  rows="4"
                  required
                />
              </div>

              <div className="form-group">
                <label>Important:</label>
                <textarea
                  id="important"
                  name="important"
                  onChange={(e) => setImportant(e.target.value)}
                  rows="4"
                />
              </div>
            </div>

            <div className="form-group">
              <label>To Do:</label>
              <textarea
                id="todo"
                name="todo"
                onChange={(e) => setTodo(e.target.value)}
                rows="2"
              />
            </div>

            <button onClick={(e) => handleNote(e)}>Save Note</button>
          </div>
        </div>

        <button
          className="back-button"
          onClick={() => navigate(`/application/${id}`)}
        >
          Back to Application
        </button>
      </div>
    </div>
  );
}
