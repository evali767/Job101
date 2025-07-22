import { useState } from "react";
import { auth, provider, db } from "../firebase";
import {signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider,} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

export let accessToken = undefined;

// This page allows users to login to the website.
function Login() {
  //variables for log in
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Handles Login
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message)
    }
  };

  const googleProvider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/calendar");

  // Handles Log in with google
  const loginWithGoogle = async () => {
    try {

      // pop up of google sign in
      const result = await signInWithPopup(auth, provider);

      //checks the credentials from the pop up
      const credential = GoogleAuthProvider.credentialFromResult(result);
      accessToken = credential.

      localStorage.setItem("googleAccessToken", accessToken);

      
      const user = result.user;
      navigate("/dashboard");

      // Check if Firestore user doc exists
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      //if no user create his database
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          joined: serverTimestamp(),
        });
      }
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && 
        <p style={{color: "red"}}>{error}</p>
      }
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button onClick={handleLogin}>Log In</button>
      <button onClick={loginWithGoogle}>Login with Google</button>
      <p>
        Don't have an account? <a href="/Signup">Sign Up</a>
      </p>
    </div>
  );
}

export default Login;
