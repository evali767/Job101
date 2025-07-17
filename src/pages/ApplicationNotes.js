// users can take notes under each job application
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { auth, db } from "../firebase";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function ApplicationNotes() {
    const { id } = useParams();  //get app ID from URL
    const navigate = useNavigate();
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [important, setImportant] = useState("")
    const [todo, setTodo] = useState("")

    // notes initialized as an array
    const [notes, setNotes] = useState([]) 
    useEffect(()=>{
            const fetchNotes = onAuthStateChanged(auth, async (user) => {
                try{
                    const user = auth.currentUser;
                    const documents = await getDocs(collection(db, "users", user.uid, "aplications", id, "notes"));
    
                    const documentsDicts = documents.docs.map( doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
    
                    setNotes(documentsDicts);
    
                }catch(error){
                    console.error("Error getting aplications", error);
                };
            });
            return () => fetchNotes();
        }, [id]);
    
    const applyNote = async(e) => {
        e.preventDefault();

        try{
            const user = auth.currentUser;
            await addDoc(collection(db, "users", user.uid, "aplications", id, "notes"), {title:title, body:body, important:important, todo:todo});
            navigate(0)
        }catch(error){
            alert("updating data error" , error);
        };
        
    };

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
                                onChange={(e) =>  setTitle(e.target.value )}
                                required
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Body:</label>
                                <textarea
                                    name="body"
                                    onChange={(e) =>  setBody(e.target.value )}
                                    rows="4"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Important:</label>
                                <textarea
                                    name="important"
                                    onChange={(e) =>  setImportant(e.target.value )}
                                    rows="4"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>To Do:</label>
                            <textarea
                                name="todo"
                                onChange={(e) =>  setTodo(e.target.value )}
                                rows="2"
                            />
                        </div>

                        <button onClick={(e) =>handleNote(e)}>Save Note</button>
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