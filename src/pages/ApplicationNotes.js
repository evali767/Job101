// users can take notes under each job application
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function ApplicationNotes({ applications, setApplications }) {
    const { id } = useParams();  //get app ID from URL
    const navigate = useNavigate();
    const app = applications.find(a => a.id === Number(id)); //find matching app to ID

    // notes initialized as an array
    const [notes, setNotes] = useState(() => {
        // if no notes yet, initialize new array
        if (!app.notes) return [];
        if (Array.isArray(app.notes)) return app.notes;
        return [];
    });

    // new note being typed
    const [newNote, setNewNote] = useState({
        title: '',
        body: '',
        important: '',
        todo: '',
        date: new Date().toLocaleDateString() //auto sets to today's date
    });

    // update notes array with new note and updates parent state
    const saveNote = () => {
        if (!newNote.title || !newNote.body) return; // require at least title and body

        const updatedNotes = [...notes, newNote];
        setApplications(applications.map(a =>
            a.id === Number(id) ? { ...a, notes: updatedNotes } : a
        ));
        setNotes(updatedNotes); //update local state
        setNewNote({ //reset form
            title: '',
            body: '',
            important: '',
            todo: '',
            date: new Date().toLocaleDateString()
        });
    };

    // dynamically updates new note when typing 
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewNote({
            ...newNote,
            [name]: value
        });
    };

    return (
        <div className="application-notes">
            <Navbar />
            <div className="notes-container">
                <h1>Notes for {app.company}</h1>

                <div className="notes-layout">
                    {/* display existing notes */}
                    <div className="notes-list">
                        {notes.length > 0 ? (
                            notes.map((note, index) => (
                                <div key={index} className="note-card">
                                    <div className="note-header">
                                        <h3>{note.title || 'Untitled Note'}</h3>
                                        <span className="note-date">{note.date || ''}</span>
                                    </div>
                                    <div className="note-content">
                                        <div className="note-body">
                                            <h4>Notes:</h4>
                                            <p>{note.body}</p>
                                        </div>
                                        <div className="note-important">
                                            <h4>Important:</h4>
                                            <p>{note.important || '-'}</p>
                                        </div>
                                    </div>
                                    <div className="note-todo">
                                        <h4>To Do:</h4>
                                        <p>{note.todo || '-'}</p>
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
                                type="text"
                                name="title"
                                value={newNote.title}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Body:</label>
                                <textarea
                                    name="body"
                                    value={newNote.body}
                                    onChange={handleInputChange}
                                    rows="4"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Important:</label>
                                <textarea
                                    name="important"
                                    value={newNote.important}
                                    onChange={handleInputChange}
                                    rows="4"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>To Do:</label>
                            <textarea
                                name="todo"
                                value={newNote.todo}
                                onChange={handleInputChange}
                                rows="2"
                            />
                        </div>

                        <button onClick={saveNote}>Save Note</button>
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