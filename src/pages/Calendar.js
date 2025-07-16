import { useEffect, useState } from "react";

import Navbar from '../components/Navbar';

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const accessToken = localStorage.getItem('googleAccessToken');

  console.log(accessToken);

  useEffect(() => {
      if (accessToken) {
        const now = new Date();
        const oneYearFromNow = new Date();
        oneYearFromNow.setDate(now.getDay() + 10);
        const timeMax = oneYearFromNow.toISOString();  

        fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?singleEvents=true&orderBy=startTime&timeMax=${timeMax}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }})
        .then(res => {
          return res.json();
        }).then(data => {
          console.log(data.items);
          data.items.reverse();
          setEvents(data.items)
        });
    }
  }, accessToken)

    return (
      <div className="calendar">
        <Navbar />
        <h1>Calendar</h1>
        <div className="calendar-placeholder">
          <p>This will connect to Google Calendar API later.</p>
          <div className="mock-event">
            <p><strong>Interview</strong></p>
            <p>June 15, 2023 - 2:00 PM</p>
            {events.map((event, index) => (
              <div key={index}>
                <p><strong>{event.summary}</strong></p>
                <p>{event.start.date ? event.start.date : event.start.dateTime}</p>
              </div>)
            )}
          </div>
        </div>
      </div>
    );
  }
