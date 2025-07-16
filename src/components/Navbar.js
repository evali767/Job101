import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

export default function Navbar() {

    const handleSignout = async () => {
        await signOut(auth)
    }
  return (
    <nav className="navbar">
    <div id="logo">Job101</div>
    <div className="nav-links">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/calendar">Calendar</Link>
      <Link to="/jobsearch">Job Search</Link>
      <Link to="/" onClick={(handleSignout)}>
        Logout
      </Link>
    </div>
    </nav>
  );
}