import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
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
    navigate("/");
} catch(err) {
  console.error(err);
}
  }

  return(<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50
to-indigo-100 flex justify-center items-center">
    <div className="bg-white w-88 h-fit p-10 shadow-2xl rounded-2xl ">
      <h1 className="text-2xl font-bold">Smart Track</h1>
      <h3 className="mb-3 text-gray-400">Academic Planning Made Simple</h3>
      <h3 className="text-lg">Welcome back!</h3>
      <h3 className="mb-6">Sign in to continue.</h3>
  <form onSubmit={handleSubmit}>
    <div className="my-3">
    <input required className="w-full border border-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition rounded-lg py-2 px-3" type="email" placeholder="Email" 
    value={email} onChange={(e) => setEmail(e.target.value)}/>
    </div>
    <div className="my-3">
    <input className="w-full border border-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition rounded-lg py-2 px-3" required type="password" placeholder="Password"
    value={password} onChange={(e) => setPassword(e.target.value)}/>
    </div>
    <div className="mt-3 text-center w-full bg-blue-600 hover:bg-blue-700 rounded-lg py-2 px-3 text-white">
    <input type="submit" value="Login"></input>
    </div>
    <p className="mt-3 text-center text-sm text-gray-600">
  New to Smart Tack?{" "}
  <Link
    to="/register"
    className="font-medium text-blue-500 hover:text-blue-600 hover:underline"
  >
    Sign up
  </Link>
</p>
  </form>
  </div>
  </div>);
}

export default Login;