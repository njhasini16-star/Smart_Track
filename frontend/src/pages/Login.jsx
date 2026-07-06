import { useState } from "react";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    alert("Login attempted");
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