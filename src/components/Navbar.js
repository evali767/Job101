// src/components/Navbar.js
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/applications">Applications</Link>
      <Link to="/calendar">Calendar</Link>
      <Link to="/" onClick={() => alert("Will implement logout later")}>
        Logout
      </Link>
    </nav>
  );
}