import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
    <div id="logo">Job101</div>
    <div className="nav-links">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/calendar">Calendar</Link>
      <Link to="/jobsearch">Job Search</Link>
      <Link to="/">Logout</Link>
    </div>
  </nav>
  );
}