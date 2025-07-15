import { useState } from "react";
import { auth} from "../firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User signed up:", userCredential.user);
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error("Sign-up error:", error.message);
        alert(error.message);
      });
  };

  return (
    <div className="login-container"> 
      <h2>Sign Up</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleSignUp}>Create Account</button>
      <button onClick={navigate('/')}>Return</button>
    </div>
  );
}

export default Signup;
