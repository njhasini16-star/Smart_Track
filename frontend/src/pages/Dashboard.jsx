import { useEffect, useState } from "react";
import DonutChart from "../components/DonutChart";
import SemSummary from "../components/SemSumTable";
import AcademicProgress from "../components/AcademicProgress";
import { getAllCompletedCourses } from "../api/completedCourses";
import { getAllPlannedCourses } from "../api/PlannedCourses";

function Dashboard({discipline}) {

  const [completedCourses, setCompletedCourses] = useState({});
  const [plannedCredits, setPlannedCredits] = useState(0);
  const [basketOverview, setBasketOverview] = useState({});

  const gradeConversion = {'A+':11, 'A':10, 'A-':9, 'B':8, 'B-':7, 'C':6, 'C-':5,
    'D':4, 'D-':3, 'E':2, 'E-':1
  };

  const GraduationRequirements = {"AI":173, "CL":173, "CE":171, "CSE":173,
     "EE":173, "ICDT":173, "MSE":173, "ME":173};

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
  }, [])
  const semInfo = [];

  Object.keys(completedCourses).forEach(sem => {
  const validCourses = completedCourses[sem].filter(
    course => course.grade !== "P" && course.grade !== "F"
  );

  const totalCredits = completedCourses[sem].reduce(
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
    sem,
    credits: totalCredits,
    rawGpa,
    gpa: rawGpa.toFixed(2),
    highlights: "none",
    validCredits: GradePointCredits
  });
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

  const GradePointGrandTotal = semInfo.reduce((sum, sem) => sum + Number(sem.rawGpa)*Number(sem.validCredits), 0);

  const GrandTotalValidCredits = semInfo.reduce((sum, sem) => sum + sem.validCredits, 0)

  const TotalCompletedCredits = semInfo.reduce((sum, sem) => sum + sem.credits, 0);

  const cgpa = (GradePointGrandTotal / GrandTotalValidCredits).toFixed(2);
  const remainingCredits = GraduationRequirements[discipline] - TotalCompletedCredits - plannedCredits;
  console.log({
  completed: TotalCompletedCredits,
  pending: plannedCredits,
  remaining: 30
});
  return (<>
    <div className="pseudo w-auto"></div>
    <h1 className="w-auto bg-red-200 p-2 lg:ml-51">Smart Track Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 m-2 lg:w-3/4 lg:ml-auto lg:mr-8">
    <DonutChart completed={TotalCompletedCredits} remaining={remainingCredits} pending={plannedCredits}/>  
    <AcademicProgress core={coreCredits} electives={electiveCredits} baskets={otherBasketCredits} cgpa={cgpa}/>
    <SemSummary args={semInfo}/>
    </div>
    </>
    );
}
export default Dashboard;