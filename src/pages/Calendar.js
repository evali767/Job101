import { useEffect, useState } from "react";

import Navbar from '../components/Navbar';
import { useNavigate } from "react-router-dom";
import DatePicker from "../components/DatePicker";
import { Dropdown, DropdownButton, DropdownItem, DropdownItems } from "../components/Dropdown";

const maxResultsOptions = [5, 10, 20, 40, 50, 100];

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const accessToken = localStorage.getItem('googleAccessToken');

  const now = new Date();
  const maxTime = new Date();
  maxTime.setDate(now.getDate() + 7);
  const [startDate, setStartDate] = useState(now.toISOString());
  const [endDate, setEndDate] = useState(maxTime.toISOString());
  const [maxResults, setMaxResults] = useState(10);

  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setInput(e.target.value);
    }
  };

  console.log(accessToken);
  let navigate = useNavigate();

  useEffect((navigate) => {
    if (accessToken) {
      const fetchAllCalendarEvents = async () => {
        try {
          // Get all calendars
          const calendarsResponse = await fetch('https://www.googleapis.com/calendar/v3/users/me/calendarList', {
            headers: { 'Authorization': "Bearer " + accessToken }
          });
          const calendars = await calendarsResponse.json();
          console.log('Calendars found:', calendars.items?.length);

          const buildEventUrl = (calendarId) => {
            const params = new URLSearchParams({
              singleEvents: 'true',
              orderBy: 'startTime',
              timeMin: startDate,
              timeMax: endDate,
              maxResults: maxResults + maxResults,
            });

            params.append('timeZone', Intl.DateTimeFormat().resolvedOptions().timeZone);


            // Add search query if provided
            if (input.trim()) {
              params.append('q', input);
            }

            console.log(params);

            return `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?${params}`;
          };

          // Fetch all calendar events in parallel
          const eventPromises = calendars.items.map(calendar =>
            fetch(buildEventUrl(calendar.id), {
              headers: { 'Authorization': "Bearer " + accessToken }
            })
              .then(response => response.json())
              .then(events => events.items || [])
              .catch(error => {
                console.error(`Error fetching calendar ${calendar.summary}:`, error);
                return [];
              })
          );

          // Wait for all requests to complete
          const eventArrays = await Promise.all(eventPromises);

          // Flatten all events into one array
          const allEvents = eventArrays.flat();

          console.log(`Total events found: ${allEvents.length}`);

          // Sort events by start time
          allEvents.sort((a, b) => {
            const dateA = new Date(a.start?.dateTime || a.start?.date);
            const dateB = new Date(b.start?.dateTime || b.start?.date);
            return dateA - dateB;
          });

          console.log(allEvents);

          const limitedEvents = allEvents.slice(0, maxResults);

          setEvents(limitedEvents);

        } catch (error) {
          navigate("/");
        }
      };

      fetchAllCalendarEvents();
    } else {
      navigate("/");
    }
  }, [accessToken, input, startDate, endDate, maxResults])

  const handleSubmitEvent = async (event) => {
    navigate("/add-event")
  }


  return (
    <div className="calendar">
      <Navbar />
      <h1>Calendar</h1>
      <div className="calendar-placeholder">
        <div style={styles.container}>
          <input type="text" name="Search box" style={styles.input} onKeyDown={(e) => handleKeyDown(e)} />
        </div>
        <DatePicker onDateRangeChange={(start, end) => { setStartDate(start); setEndDate(end); }} />
        <Dropdown>
          <DropdownButton>{maxResults} / page</DropdownButton>
          <DropdownItems>
            {maxResultsOptions.map((option) => (
              <DropdownItem onClick={() => setMaxResults(option)}>
                {option}
              </DropdownItem>
            ))}
          </DropdownItems>
        </Dropdown>
        <button className="action-btn" onClick={handleSubmitEvent}>Create event</button>
        <div className="mock-event">
          {events.map((event, index) => (
            <div key={index} className="stat-card">
              <p><strong>{event.summary}</strong></p>
              <p>{event.start.date ? event.start.date  : event.start.dateTime.slice(0, -6).replace('T', " --- Start Time: ") }</p>
            </div>)
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: "20px auto"
  },
  input: {
    width: '40%',
    height: '50px',
    fontSize: '1.5rem',
    padding: '0 15px',
    borderRadius: '8px',
    border: '2px solid #999',
    outline: 'none',
  },
};