// page to add new job application to track
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

// receive setApplications as a prop so that main applications list can be updated when new one is added
export default function AddEvent({ setApplications }) {
    // state management
    // naviagte function to change routes
    const navigate = useNavigate();
    const location = useLocation();
    const accessToken = localStorage.getItem('googleAccessToken');

    const [formData, setFormData] = useState({
        startDateTime: (new Date),
        endDateTime: (new Date),
        summary: "", // title of the event
        description: "",
        location: ""
    });
    const handleSubmit = (e) => {
        e.preventDefault();

        const { summary, description, startDateTime, endDateTime, location } = formData;

        console.log(formData);

        createCalendarEvent(accessToken, summary, description, startDateTime + "T00:00:00.000Z", endDateTime + "T23:59:59.999Z", location)
            .then(() => navigate('/calendar')) // go back to calendar after submitting);
            .catch(() => navigate("/"));
    };

    return (
        <div className="add-application">
            <Navbar />
            <h1>Add New Event</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Start Time:</label>
                    <input
                        type="date"
                        value={formData.startDateTime}
                        onChange={(e) => setFormData({ ...formData, startDateTime: e.target.value })}
                        required="true"
                    />
                </div>

                <div className="form-group">
                    <label>End time:</label>
                    <input
                        type="date"
                        value={formData.endDateTime}
                        onChange={(e) => setFormData({ ...formData, endDateTime: e.target.value })}
                        required="true"
                    />
                </div>

                <div className="form-group">
                    <label>Title:</label>
                    <input
                        type="text"
                        value={formData.summary}
                        onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                        placeholder="My Event"
                        required="true"
                    />
                </div>

                <div className="form-group">
                    <label>Description:</label>
                    <input
                        type="text"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Description"
                        required="true"
                    />
                </div>

                <div className="form-group">
                    <label>Location:</label>
                    <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="Location"
                        required="true"
                    />
                </div>

                <button type="submit">Save Event</button>
            </form>
        </div>
    );
}

const createCalendarEvent = async (accessToken, summary, description, startDateTime, endDateTime, location) => {
  if (!accessToken) {
    console.error('No access token available');
    return;
  }

  const eventData = {
    summary: summary,
    description: description,
    location: location, 
    start: {
      dateTime: startDateTime,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    end: {
      dateTime: endDateTime, 
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }
  };

  try {
    console.log("at: ", accessToken);
    const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const createdEvent = await response.json();
    console.log('Event created successfully:', createdEvent);
    return createdEvent;
    
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};