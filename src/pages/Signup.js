import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("")
  const navigate = useNavigate();

  const SignUpUser = async(email, name, password) => {
    try{
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user

      await setDoc(doc(db, "users", user.uid), {name:name, email:email, joined:serverTimestamp()})
      navigate("/dashboard");

    }catch(error){
      console.error("Signup error:", error.message);
      alert("Signup error: " + error.message);
      navigate('/')
    }
  };

  const handleSignup = async () => {
    if (!email || !password || !name) return alert("Please fill in all fields");
    await SignUpUser(email, name, password);
  };

  return (
    <div className="login-container"> 
      <h2>Sign Up</h2>
      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input placeholder="email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleSignup}>Create Account</button>
      <button onClick={() => navigate('/')}>Return</button>
    </div>
  );
}

export default Signup;
