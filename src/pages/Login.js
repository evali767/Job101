import { useState } from "react";
import { auth, provider } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export let accessToken = undefined;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      alert("Login error: " + error.message);
    }
  };

  const googleProvider = new GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/calendar');

const loginWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        accessToken = credential.accessToken;

        // stored in local computer, never do this in a real app
        localStorage.setItem('googleAccessToken', accessToken);

        const user = result.user;
        console.log('Logged in user:', user);
        navigate("/dashboard");

    })
    .catch((error) => {
      console.error('Login error:', error.message);
    });
  };

  return (
    <div className="login-container"> 
      <h2>Login</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Log In</button>
      <button onClick={loginWithGoogle}>Login with Google</button>
      <p>Don't have an account? <a href="/Signup">Sign Up</a></p>
    </div>
  );
}

export default Login;