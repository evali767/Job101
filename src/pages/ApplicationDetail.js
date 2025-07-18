// view application details -- user sees this after clicking on company name of job posting
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function ApplicationDetail() {
  //All variables needed
  const { id } = useParams(); //id for the collection in use
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("");
  const [link, setLink] = useState("");
  const [date, setDate] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  // updates job application info by replacing with new information
  useEffect(() => {
    const fetchData = onAuthStateChanged(auth, async (user) => {
      try {
        const user = auth.currentUser;
        const document = await getDoc(
          doc(db, "users", user.uid, "aplications", id)
        );
        const data = document.data();

        setCompany(data.company);
        setPosition(data.position);
        setStatus(data.status);
        setLink(data.link);
        setDate(data.date);
        setIsEditing(false);
      } catch (error) {
        console.error("Error getting application data", error);
      }
    });
    return () => fetchData();
  }, [id]);

  // updates form fields: takes event e and extracts name + value from the changed input
  const handleSave = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    try {
      await setDoc(doc(db, "users", user.uid, "aplications", id), {
        company: company,
        position: position,
        status: status,
        link: link,
        date: date,
      });
      setIsEditing(false);
    } catch (error) {
      alert("updating data error", error);
    }
  };

  return (
    <div className="application-detail">
      <Navbar />
      <div className="detail-container">
        <h1>{company}</h1>

        {/* edit mode */}
        {isEditing ? (
          <form>
            <div className="form-group">
              <label>Company:</label>
              <input
                id="company"
                name="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Position:</label>
              <input
                id="position"
                name="position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Job Posting Link:</label>
              <input
                id="link"
                type="url"
                name="link"
                value={link || ""}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://example.com/job-posting"
              />
            </div>
            <div className="form-group">
              <label>Status:</label>
              <select
                id="status"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
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
                id="date"
                type="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="action-buttons">
              <button type="button" onClick={handleSave}>
                Save
              </button>
              <button type="button" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="detail-view">
            <p>
              <strong>Position:</strong> {position}
            </p>
            <p>
              <strong>Status:</strong> {status}
            </p>
            <p>
              <strong>Date Applied:</strong> {date}
            </p>
            {/* job posting link */}
            {link && (
              <p>
                <strong>Job Posting:</strong>{" "}
                <a
                  href={link}
                  target="_blank" //open link in new tab
                  rel="noopener noreferrer" //protects against security vulnerbilities
                  className="job-link"
                >
                  View Job Posting
                </a>
              </p>
            )}

            {/* user can edit, navigate to notes under the job app, or go to dash */}
            <div className="action-buttons">
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button onClick={() => navigate(`/application/${id}/notes`)}>
                View/Add Notes
              </button>
              <button onClick={() => navigate("/dashboard")}>
                Back to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
