// page to add new job application to track
import { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
import { useNavigate, useLocation} from 'react-router-dom';
import Navbar from '../components/Navbar';
import { auth, db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

export default function AddApplication() {
    const location = useLocation();
    const jobData = location.state || {};

    const [company, setCompany] = useState(jobData.company || "");
    const [position, setPosition] = useState(jobData.position || "");
    // assumes user still needs to apply
    const [status, setStatus] = useState("Need to apply")
    const [link, setUrl] = useState(jobData.link || "")
    const [date, setDate] = useState("")

//     // naviagte function to change routes
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
            {/* <form onSubmit={handleSubmit}> */}
                <div className="form-group">
                    <label>Company:</label>
                    <input
                        type="text"
                        value={company}
                        onChange={(e) =>  setCompany(e.target.value )}
                        // value={company}
                        // onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Position:</label>
                    <input
                        type="text"
                        value={position}
                        onChange={(e) =>  setPosition(e.target.value )}

                        // onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Job Posting Link:</label>
                    <input
                        type="url"
                        value={link}
                        onChange={(e) =>  setUrl(e.target.value )}

                        // onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                        placeholder="https://example.com/job-posting"
                    />
                </div>

                <div className="form-group">
                    <label>Status:</label>
                    {/* dropdown menu */}
                    <select
                        onChange={(e) =>  setStatus(e.target.value )}
                        required
                        // onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                        <option value="Apply">Apply</option>
                        <option value="Applied">Applied</option>
                        <option value="Interview">Interview</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Offer">Offer</option>
                    </select>

                </div>

                <div className="form-group">
                    <label>Date Applied:</label>
                    <input
                        type="date"
                        onChange={(e) =>  setDate(e.target.value )}

                        // onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                </div>

                <button type="submit">Save Application</button>
            </form>
        </div>
    );
}