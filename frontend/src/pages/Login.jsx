import { useState } from "react";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {

    e.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
      alert("email required");
      return;
    } 
    if (!password) {
      alert("Enter password");
      return;
    }
    try {
    const res = await fetch("http://localhost:3000/login", {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: normalizedEmail,
        password: password
      })
    })
    const data = await res.json();
    if (!res.ok) {
      alert(data.error);
      return;
  }
} catch(err) {
  console.error(err);
}
  }

  return(<form onSubmit={handleSubmit}>
    <input required type="email" placeholder="Email" 
    value={email} onChange={(e) => setEmail(e.target.value)}/>

    <input required type="password" placeholder="Password"
    value={password} onChange={(e) => setPassword(e.target.value)}/>

    <input type="submit" value="Login"></input>
  </form>);
}

export default Login;