import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// page componenets
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from './components/Navbar';
import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";
import JobSearch from "./pages/JobSearch";
import AddApplication from "./pages/AddApplication";
import ApplicationDetail from './pages/ApplicationDetail';
import ApplicationNotes from './pages/ApplicationNotes';

import './App.css';
import AddEvent from './pages/AddEvent';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [applications, setApplications] = useState([]);

  return (
    <Router>
      <div className="app">
        {isLoggedIn && <Navbar />}
        <Routes>
          <Route path="/" element={
            <Login onLogin={() => setIsLoggedIn(true)} />
          } />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/jobsearch" element={<JobSearch />} />
          <Route
            path="/add-application"
            element={<AddApplication setApplications={setApplications} />}
          />
          <Route
            path="/add-event"
            element={<AddEvent />}
          />
          <Route
            path="/application/:id"
            element={<ApplicationDetail/>}
          />
          <Route
            path="/application/:id/notes"
            element={<ApplicationNotes applications={applications} setApplications={setApplications} />}
          />
        </Routes>
      </div>
    </Router>
  );
}



export default App;