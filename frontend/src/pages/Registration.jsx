import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Registration() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [disciplines, setDisciplines] = useState([]);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [discipline, setDiscipline] = useState("");
    const [rollnum, setRollnum] = useState();

    async function getDisciplines() {
        try {
        const res = await fetch("http://localhost:3000/disciplines");
        const data = await res.json();
        setDisciplines(data);

        } catch(err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getDisciplines();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        console.log("Submitting...");

        if (password !== confirmPassword) {
            alert("password do not match!");
            return;
        }
        if (!discipline) {
            alert("Please select your discipline");
            return;
        }

        if (!email.trim().toLowerCase().endsWith("@iitgn.ac.in")) {
            alert("Please register using your IITGN email address.");
            return;
        }

        try {

        const res = await fetch("http://localhost:3000/register", {
            method:'POST',
            headers: {
            "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                username: username.trim(),
                email: email.trim().toLowerCase(),
                password: password,
                disciplineId: discipline,
                rollnum
            })
        })
        const data = await res.json();

        if (!res.ok) {
            alert(data.error);
            return;
        }
        navigate("/login");
        } catch(err) {
            console.error(err);
        }
    }

    return(<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50
to-indigo-100 flex justify-center items-center">
    <div className="bg-white rounded-2xl p-10 shadow-2xl">
        <h1 className="text-2xl font-bold">Smart Track</h1>
      <h3 className="mb-3 text-gray-400">Academic Planning Made Simple</h3>
      <h3 className="my-3">Create your account</h3>
        <form onSubmit={handleSubmit}>
            <input className="block w-full border border-gray-400 focus:border-blue-400 focus:ring-2 
            focus:ring-blue-200 my-2 transition rounded-lg py-2 px-3" 
            
            required type="text" value={username} placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}/>

            <input className="block w-full border border-gray-400 focus:border-blue-400 focus:ring-2 
            focus:ring-blue-200 my-2 transition rounded-lg py-2 px-3" 
            
            required type="email" value={email} placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}/>

            <input className="block w-full border border-gray-400 focus:border-blue-400 focus:ring-2 
            focus:ring-blue-200 my-2 transition rounded-lg py-2 px-3" 
            
            minLength={8} maxLength={8} required type="text" placeholder="Roll number" value={rollnum}
            onChange={(e) => setRollnum(e.target.value)}/>

            <input className="block w-full border border-gray-400 focus:border-blue-400 focus:ring-2 
            focus:ring-blue-200 my-2 transition rounded-lg py-2 px-3" 
            
            minLength={8} required type="password" value={password} placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}/>

            <input className="block w-full border border-gray-400 focus:border-blue-400 focus:ring-2 
            focus:ring-blue-200 my-2 transition rounded-lg py-2 px-3" 
            
            minLength={8} required type="password" value={confirmPassword} placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}/>
            
            <select className="block border border-gray-400 focus:border-blue-400 focus:ring-2 
            focus:ring-blue-200 my-2 transition rounded-lg py-2 px-2"
            
            required value={discipline} onChange={(e) => setDiscipline(e.target.value)}>

                <option value="" className="text-gray-600">Select your discipline</option>
                {disciplines.map(d => 
                    <option key={d.id} value={d.id}>{d.name}</option>
                )}
            </select>

            <button className="block mt-3 text-center w-full bg-blue-600 hover:bg-blue-700 rounded-lg py-2 px-3 text-white" 
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