import { useState, useEffect } from "react";

function Registration() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [disciplines, setDisciplines] = useState([]);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [discipline, setDiscipline] = useState("");

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
                disciplineId: discipline
            })
        })
        if (!res.ok) {
            alert(data.error);
            return;
}
        } catch(err) {
            console.error(err);
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <input required type="text" value={username} placeholder="username"
            onChange={(e) => setUsername(e.target.value)}/>

            <input required type="email" value={email} placeholder="email"
            onChange={(e) => setEmail(e.target.value)}/>

            <input minLength={8} required type="password" value={password} placeholder="password"
            onChange={(e) => setPassword(e.target.value)}/>

            <input minLength={8} required type="password" value={confirmPassword} placeholder="confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}/>

            <select required value={discipline} onChange={(e) => setDiscipline(e.target.value)}>
                <option value="">Select your discipline</option>
                {disciplines.map(d => 
                    <option key={d.id} value={d.id}>{d.name}</option>
                )}
            </select>

            <button type="submit">register</button>
        </form>
    )
}

export default Registration;