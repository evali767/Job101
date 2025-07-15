// view application details -- user sees this after clicking on company name of job posting
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function ApplicationDetail({ applications, setApplications }) {
  const { id } = useParams();   //gets ID from URL
  const navigate = useNavigate();
  const app = applications.find(a => a.id === Number(id)); //find current application by matching ID
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(app);

  // updates job application info by replacing old entry with new formData
  const handleSave = () => {
    setApplications(applications.map(a =>
      a.id === Number(id) ? formData : a
    ));
    setIsEditing(false); //exit editing mode when done
  };


  // updates form fields: takes event e and extracts name + value from the changed input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="application-detail">
      <Navbar />
      <div className="detail-container">
        <h1>{app.company}</h1>

        {/* edit mode */}
        {isEditing ? (
          <form>
            <div className="form-group">
              <label>Company:</label>
              <input
                name="company"
                value={formData.company}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Position:</label>
              <input
                name="position"
                value={formData.position}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Job Posting Link:</label>
              <input
                type="url"
                name="link"
                value={formData.link || ''}
                onChange={handleChange}
                placeholder="https://example.com/job-posting"
              />
            </div>
            <div className="form-group">
              <label>Status:</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Apply">Need to Apply</option>
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
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
            <div className="action-buttons">
              <button type="button" onClick={handleSave}>Save</button>
              <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </form>
        ) : (
          <div className="detail-view">
            <p><strong>Position:</strong> {app.position}</p>
            <p><strong>Status:</strong> {app.status}</p>
            <p><strong>Date Applied:</strong> {app.date}</p>
            {/* job posting link */}
            {formData.link && (
              <p>
                <strong>Job Posting:</strong>{' '}
                <a
                  href={formData.link}
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
              <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}