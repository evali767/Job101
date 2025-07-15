// page to add new job application to track
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

// receive setApplications as a prop so that main applications list can be updated when new one is added
export default function AddApplication({ setApplications }) {
    // state management
    // naviagte function to change routes
    const navigate = useNavigate();
    const location = useLocation();
    // initial values of form fields
    const jobData = location.state || {};

    const [formData, setFormData] = useState({
        company: '',
        position: jobData.position || '',  // if coming from job search pg, there will be a job position
        status: 'Apply',
        date: '',
        link: jobData.link || ''  // if coming from job search pg, there will be a job link
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        const newApplication = {
            ...formData,
            id: Date.now(),
            notes: [] // initialize with empty notes array
        };
        setApplications(prev => [...prev, newApplication]);
        navigate('/dashboard'); // go back to dashboard after submitting
    };

    return (
        <div className="add-application">
            <Navbar />
            <h1>Add New Application</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Company:</label>
                    <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Position:</label>
                    <input
                        type="text"
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Job Posting Link:</label>
                    <input
                        type="url"
                        value={formData.link}
                        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                        placeholder="https://example.com/job-posting"
                    />
                </div>

                <div className="form-group">
                    <label>Status:</label>
                    {/* dropdown menu */}
                    <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
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
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                </div>

                <button type="submit">Save Application</button>
            </form>
        </div>
    );
}