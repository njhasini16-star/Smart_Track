import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useToast from "../hooks/useToast";
import Toast from "../components/Toast";

function Registration() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [disciplines, setDisciplines] = useState([]);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [discipline, setDiscipline] = useState("");
    const [rollnum, setRollnum] = useState("");
    const {toast, showToast} = useToast();
    const API_URL = import.meta.env.VITE_API_URL;

    async function getDisciplines() {
        try {
        const res = await fetch(`${API_URL}/disciplines`);
        const data = await res.json();
        setDisciplines(data);

        } catch(err) {
            console.error(err);
            showToast({
                message: "Internal server error",
                type: "error"
            })
        }
    }

    useEffect(() => {
        getDisciplines();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        const normalizedEmail = email.trim().toLowerCase();
        const normalizedUsername = username.trim();
        if (!normalizedUsername) {
            showToast({
                message: "Username required.",
                type: "error"
            })
            return;
        }

        if (!normalizedEmail) {
            showToast({
                message: "Email required.",
                type: "error"
            })
            return;
        }

        if (!normalizedEmail.endsWith("@iitgn.ac.in")) {
            showToast({
                message: "Please register using your IITGN email address.",
                type: "error"
            })
            return;
        }

        if(!/^\d{8}$/.test(rollnum)) {
            showToast({
                message: "Roll number should contain exactly 8 digits",
                type: "error"
            })
            return;
        }

        if(!password) {
            showToast({
                message: "Password required.",
                type: "error"
            })
            return;
        }

        if (password.length < 8) {
            showToast({
                message: "Password must be at least 8 characters long.",
                type: "error"
            });
            return;
        }

        if (!confirmPassword) {
            showToast({
                message: "Confirm password required.",
                type: "error"
            })
            return;
        }
        if (password !== confirmPassword) {
            showToast({
                message: "Passwords do not match!",
                type: "error"
            })
            return;
        }
        if (!discipline) {
            showToast({
                message: "Select your discipline.",
                type: "error"
            })
            return;
        }

        try {

        const res = await fetch(`${API_URL}/register`, {
            method:'POST',
            headers: {
            "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                username: normalizedUsername,
                email: normalizedEmail,
                password: password,
                disciplineId: discipline,
                rollnum
            })
        })
        const data = await res.json();

        if (!res.ok) {
            showToast({
                message: `${data.error}`,
                type: "error"
            })
            return;
        }
        navigate("/login");
        
        } catch(err) {
            console.error(err);
            showToast({
                message: "Internal server error",
                type: "error"
            })
        }
    }

    return(<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50
to-indigo-100 flex justify-center items-center">
    {toast && <Toast toast={toast}/>}
    <div className="bg-white rounded-2xl p-10 shadow-2xl">
        <h1 className="text-2xl font-bold">Smart Track</h1>
      <h3 className="mb-3 text-gray-400">Academic Planning Made Simple</h3>
      <h3 className="my-3">Create your account</h3>
        <form onSubmit={handleSubmit}>
            <input className="block w-full border border-gray-400 focus:border-blue-400 focus:ring-2 
            focus:ring-blue-200 my-2 transition rounded-lg py-2 px-3" 
            
            type="text" value={username} placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}/>

            <input className="block w-full border border-gray-400 focus:border-blue-400 focus:ring-2 
            focus:ring-blue-200 my-2 transition rounded-lg py-2 px-3" 
            
            type="email" value={email} placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}/>

            <input className="block w-full border border-gray-400 focus:border-blue-400 focus:ring-2 
            focus:ring-blue-200 my-2 transition rounded-lg py-2 px-3" 
            
            type="text" placeholder="Roll number" value={rollnum}
            onChange={(e) => setRollnum(e.target.value)}/>

            <input className="block w-full border border-gray-400 focus:border-blue-400 focus:ring-2 
            focus:ring-blue-200 my-2 transition rounded-lg py-2 px-3" 
            
            type="password" value={password} placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}/>

            <input className="block w-full border border-gray-400 focus:border-blue-400 focus:ring-2 
            focus:ring-blue-200 my-2 transition rounded-lg py-2 px-3" 
            
            type="password" value={confirmPassword} placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}/>
            
            <select className="block border border-gray-400 focus:border-blue-400 focus:ring-2 
            focus:ring-blue-200 my-2 transition rounded-lg py-2 px-2"
            
            value={discipline} onChange={(e) => setDiscipline(e.target.value)}>

                <option value="" className="text-gray-600">Select your discipline</option>
                {disciplines.map(d => 
                    <option key={d.id} value={d.id}>{d.name}</option>
                )}
            </select>

            <button className="block mt-3 text-center w-full bg-blue-600 hover:bg-blue-700 rounded-lg py-2 px-3 text-white cursor-pointer" 
            type="submit">Register</button>

            <p className="mt-3 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                to="/login"
                className="font-medium text-blue-500 hover:text-blue-600 hover:underline">
                  Log in
                </Link>
            </p>

        </form>
        </div>
        </div>
    )
}

export default Registration;