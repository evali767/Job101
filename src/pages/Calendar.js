import Navbar from '../components/Navbar';
export default function Calendar() {
    return (
      <div className="calendar">
        <Navbar />
        <h1>Calendar</h1>
        <div className="calendar-placeholder">
          <p>This will connect to Google Calendar API later.</p>
          <div className="mock-event">
            <p><strong>Interview</strong></p>
            <p>June 15, 2023 - 2:00 PM</p>
          </div>
        </div>
      </div>
    );
  }
