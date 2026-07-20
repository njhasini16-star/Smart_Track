import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoute() {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [disciplines, setDisciplines] = useState([]);

  useEffect(() => {
    async function loadData() {
      const API_URL = import.meta.env.VITE_API_URL;
    try {
      const userRes = await fetch(`${API_URL}/me`, {
        credentials: "include",
      });

      if (!userRes.ok) {
        return;
      }

      const userData = await userRes.json();
      setUser(userData);
    
      const disciplinesRes = await fetch("http://localhost:3000/disciplines");

      if (!disciplinesRes.ok) {
        return;
      }
      
      const disciplinesData = await disciplinesRes.json();
      setDisciplines(disciplinesData);

    } catch (err) {
      console.error(err);
      alert("Failed to load application data");
    } finally {
      setLoading(false);
    }
  }

  loadData();
  }, [])

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  const discipline = disciplines.find(
    (d) => d.id === user?.discipline_id
  );

  const joiningYear = 2000 + Number(user.roll_number.slice(0, 2));

const today = new Date();
const currentYear = today.getFullYear();
const month = today.getMonth(); // 0 = Jan

let currentSem;

if (month >= 7 && month <= 10) {
  currentSem = 2 * (currentYear - joiningYear) + 1;

} else if (month <= 3 || month === 11) {
  currentSem = 2 * (currentYear - joiningYear);

} else {
  currentSem = 2 * (currentYear - joiningYear) + 1;
}
currentSem = Math.max(1, Math.min(currentSem, 8));

const disciplineCode = discipline?.code;

    return(<Outlet context={{user, disciplineCode, currentSem}}/>);
}
export default ProtectedRoute;