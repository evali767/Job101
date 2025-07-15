// Login Page
import { useNavigate } from 'react-router-dom';

export default function Login() {
//allows us to switch pages 
  const navigate = useNavigate();

//   submit button triggers this function
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("This will connect to Firebase later on");
    //navigate to dashboard after logging in
    navigate('/dashboard'); 
  };

  return (
    <div className="login-container">
      <h1>Job Application Tracker</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email (any value works)"
          required
        />
        <input
          type="password"
          placeholder="Password (any value works)"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}