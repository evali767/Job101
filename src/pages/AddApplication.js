// page to add new job application to track
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { auth, db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

export default function AddApplication() {
    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [status, setStatus] = useState("Need to apply")
    const [link, setUrl] = useState("")
    const [date, setDate] = useState("")

    const navigate = useNavigate();


    const handleAplication = async (e) => {
        e.preventDefault();

      const user = auth.currentUser
      try{
        await addDoc(collection(db, "users", user.uid, "aplications"), {company:company, position:position, status:status, link:link, date:date})
        navigate("/dashboard");
      }catch(error){
        alert("updating data error" , error)
      }
        
        
    };

    return (
        <div className="add-application">
            <Navbar />
            <h1>Add New Application</h1>
            <form onSubmit={handleAplication}>
                <div className="form-group">
                    <label>Company:</label>
                    <input
                        type="text"
                        onChange={(e) =>  setCompany(e.target.value )}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Position:</label>
                    <input
                        type="text"
                        onChange={(e) =>  setPosition(e.target.value )}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Job Posting Link:</label>
                    <input
                        type="url"
                        onChange={(e) =>  setUrl(e.target.value )}
                        placeholder="https://example.com/job-posting"
                    />
                </div>

                <div className="form-group">
                    <label>Status:</label>
                    {/* dropdown menu */}
                    <select
                        onChange={(e) =>  setStatus(e.target.value )}
                        required
                    >
                        <option value="Apply">Need to Apply</option>
                        <option value="Applied">Applied</option>
                        <option value="Interview">Interview</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Offer">Offer</option>
                    </select>
                    
                </div>

                <div className="form-group">
                    <label>Date:</label>
                    <input
                        type="date"
                        onChange={(e) =>  setDate(e.target.value )}
                    />
                </div>

                <button type="submit">Save Application</button>
            </form>
        </div>
    );
}