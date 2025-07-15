import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// routes
import Login from "./pages/Login";
import Navbar from './components/Navbar';
import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";
import JobSearch from "./pages/JobSearch";

import './App.css'; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="app">
        {isLoggedIn && <Navbar />}
        <Routes>
          <Route path="/" element={
            <Login onLogin={() => setIsLoggedIn(true)} />
          } />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/jobsearch" element={<JobSearch />} />
        </Routes>
      </div>
    </Router>
  );
}



export default App;