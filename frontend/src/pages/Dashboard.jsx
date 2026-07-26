import { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

import DonutChart from "../components/DonutChart";
import SemSummary from "../components/SemSumTable";
import AcademicProgress from "../components/AcademicProgress";
import { getAllCompletedCourses } from "../api/completedCourses";
import { getAllPlannedCourses } from "../api/plannedCourses";

function Dashboard() {
  const {disciplineCode, user, currentSem, joiningYear} = useOutletContext();
  const discipline = disciplineCode;

  const navigate = useNavigate();
  
  const [completedCourses, setCompletedCourses] = useState({});
  const [plannedCredits, setPlannedCredits] = useState(0);
  const [basketOverview, setBasketOverview] = useState({});

  const gradeConversion = {'A+':11, 'A':10, 'A-':9, 'B':8, 'B-':7, 'C':6, 'C-':5,
    'D':4, 'D-':3, 'E':2, 'E-':1
  };

  const GraduationRequirements = {"AI":173, "CL":173, "CE":171, "CSE":173,
     "EE":173, "ICDT":173, "MSE":173, "ME":173};

  async function Logout() {
    const API_URL = import.meta.env.VITE_API_URL;
    const res = await fetch(`${API_URL}/logout`, {
      method: 'POST',
      credentials: "include"
    })
    if (res.ok) {
    navigate("/login");
    }
  }

  async function fetchCompletedCourses() {
  try {
  const data = await getAllCompletedCourses();

  const grouped = {};

data.forEach(course => {
  if (!grouped[course.semester]) {
    grouped[course.semester] = [];
  }
  grouped[course.semester].push(course);
});
  setCompletedCourses(grouped);

  const groupedBasketWise = {};

  data.forEach(course => {
    groupedBasketWise[course.basket] = [...(groupedBasketWise[course.basket] || []), course];
  });

  setBasketOverview(groupedBasketWise);

} catch(err) {
    console.error(err);
  }}
  
  async function fetchPlannedCredits() {
  try {
  const data = await getAllPlannedCourses();

  const totalSum = data.reduce((sum, course) => sum + Number(course.credits), 0);

  setPlannedCredits(totalSum);
  
  } catch(err) {
    console.error(err);
  }

}
  useEffect(() => {
    fetchCompletedCourses();
    fetchPlannedCredits();
    console.log(semInfo)
  }, [])
  const semInfo = [];

  Array.from({length:currentSem-1}, (_, i) => { 
  if (completedCourses[i+1]) {
  const validCourses = completedCourses[i+1].filter(
    course => course.grade !== "P" && course.grade !== "F"
  );

  const totalCredits = completedCourses[i+1].reduce(
    (sum, course) => sum + Number(course.credits),
    0
  );
  
  const GradePointCredits = validCourses.reduce(
    (sum, course) => sum + Number(course.credits),
    0
  );

  const totalGradePoints = validCourses.reduce(
    (sum, course) =>
      sum + Number(course.credits) * gradeConversion[course.grade],
    0
  );

  const rawGpa = totalGradePoints / GradePointCredits;
  
  semInfo.push({
    sem: i+1,
    credits: totalCredits,
    rawGpa,
    gpa: rawGpa.toFixed(2),
    highlights: "none",
    validCredits: GradePointCredits
  });
} else {
  semInfo.push({
    sem: i+1,
    credits: NaN,
    rawGpa: NaN,
    gpa: NaN,
    highlights: "none",
    validCredits: NaN
  })
}
});  
  const otherBaskets = Object.fromEntries(
  Object.entries(basketOverview).filter(
    ([key, value]) => key !== "Open Electives" && 
    key !== "Discipline Core Courses" &&
    key !== "Discipline Electives")
  );

  const allCourses = Object.values(otherBaskets).flat();
  const otherBasketCredits = allCourses.reduce( (sum, course) => sum + course.credits, 0)
  const coreCredits =
  (basketOverview["Discipline Core Courses"] || []).reduce(
    (sum, course) => sum + Number(course.credits),
    0
  );
  const electiveCredits =
  (basketOverview["Discipline Electives"] || []).reduce(
    (sum, course) => sum + Number(course.credits),
    0
  );

  const GradePointGrandTotal = semInfo.reduce((sum, sem) => sum + Number(sem.rawGpa===sem.rawGpa ? sem.rawGpa : 0)*Number(sem.validCredits ? sem.validCredits : 0), 0);
  console.log(GradePointGrandTotal);

  const GrandTotalValidCredits = semInfo.reduce(
  (sum, sem) => sum + (Number.isNaN(sem.validCredits) ? 0 : sem.validCredits),
  0
);

const TotalCompletedCredits = semInfo.reduce(
  (sum, sem) => sum + (Number.isNaN(sem.credits) ? 0 : sem.credits),
  0
);

  const cgpa = (GradePointGrandTotal / GrandTotalValidCredits).toFixed(2);
  const remainingCredits = GraduationRequirements[discipline] - TotalCompletedCredits - plannedCredits;

  return (<>
    <div className="pseudo hidden md:block"></div>
    <div className="p-2 flex flex-col lg:ml-60 m-2">
    <div className="flex content-end p-2 flex-col sm:flex-row gap-2 sm:gap-0">
    <h1 className="text-3xl font-extrabold tracking-tight font-[Manrope]">Dashboard</h1>
    <h1 className="md:text-xl sm:ml-auto sm:self-center sm:text-right text-lg">Welcome, {user.username}</h1>
    </div>
    <div className="flex px-2">
    <h1 className="text-xl py-2" >Track your progress</h1>
    <button onClick={Logout} className="ml-auto block bg-slate-600 border text-white px-2 rounded-lg">Log out</button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:w-full lg:gap-4 my-4">
    
    <DonutChart completed={TotalCompletedCredits} remaining={remainingCredits} pending={plannedCredits}/>  
    <AcademicProgress core={coreCredits} electives={electiveCredits} baskets={otherBasketCredits} cgpa={cgpa}/>
    <SemSummary args={semInfo} joiningYear={joiningYear}/>
    </div>
    </div>
    </>
    );
}
export default Dashboard;