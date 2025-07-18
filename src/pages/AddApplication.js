import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { auth, db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

export default function AddApplication() {
  const location = useLocation();
  const jobData = location.state || {};
  //variables for aplication
  const [company, setCompany] = useState(jobData.company || "");
  const [position, setPosition] = useState(jobData.position || "");
  const [status, setStatus] = useState("Apply");
  const [link, setUrl] = useState(jobData.link || "");
  const [date, setDate] = useState("");

  const navigate = useNavigate();

  //inputs data towards db
  const handleAplication = async (e) => {
    e.preventDefault();

    const user = auth.currentUser; //user id
    try {
      //applies data to the db
      await addDoc(collection(db, "users", user.uid, "aplications"), {
        company: company,
        position: position,
        status: status,
        link: link,
        date: date,
      });
      navigate("/dashboard");//move to dashboard
    } catch (error) {
      alert("updating data error", error);
    }
  };

  return (
    <div className="add-application">
      <Navbar />
      <h1>Add New Application</h1>
      <form onSubmit={handleAplication}>
        {/* <form onSubmit={handleSubmit}> */}
        <div className="form-group">
          <label htmlFor="company">Company:</label>
          <input
            id="company"
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="position">Position:</label>
          <input
            id="position"
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="link">Job Posting Link:</label>
          <input
            id="link"
            type="url"
            value={link}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/job-posting"
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="Apply">Apply</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Rejected">Rejected</option>
            <option value="Offer">Offer</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Date Applied:</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button type="submit">Save Application</button>
      </form>
    </div>
  );
}
