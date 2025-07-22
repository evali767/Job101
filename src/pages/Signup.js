import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

function Signup() {
  //variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Creates user profile from email
  const SignUpUser = async (email, name, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      //Adds user to db
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        joined: serverTimestamp(),
      });
      navigate("/dashboard");
    } catch (error) {
      //gives an error message based on the type of error
      const errorCode = error.code;
      const errorMessage = error.message;
      
      switch (errorCode) {
        case "auth/weak-password":
          setError("Password is too weak. It should be at least 6 characters.");
          break;
        case "auth/invalid-email":
          setError("Invalid email address.");
          break;
        default:
          setError("Signup error: " + errorMessage);
          break;
      }
    }
  };

  //checks the fields are filled
  const handleSignup = async () => {
    if (!email || !password || !name) return setError("Please fill in all fields");
    await SignUpUser(email, name, password);
  };

  return (
    <div className="login-container">
      <h2>Sign Up</h2>
      {error && 
        <p style={{color: "red"}}>{error}</p>
      }
      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Create Account</button>
      <button onClick={() => navigate("/")}>Return</button>
    </div>
  );
}

export default Signup;
