import { useState, useEffect } from "react";
import Search from "./search";
import CourseTable from "./CourseTable";

function SemesterPlanning({currentSem}) {
  const [selectedSem, setSelectedSem] = useState(currentSem+1)
  const [plannedSemesters, setPlannedSemesters] = useState(() => {
    const semesters = {};
  for (let sem = currentSem + 1; sem <= 8; sem++) {
    semesters[sem] = [];}
  return semesters;
  });

  const isPlanned = sem => plannedSemesters[sem].length>0;
  
  const creditLoad = plannedSemesters[selectedSem].reduce((sum, course) => sum+course.credits, 0);
  console.log(plannedSemesters)
  
  async function fetchPlannedCourses(semester) {
  try {
    const res = await fetch(
      `http://localhost:3000/planned-courses/${semester}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch planned courses");
    }

    const data = await res.json();

    setPlannedSemesters(prev => ({
      ...prev,
      [semester]: data,
    }));
  } catch (err) {
    console.error(err);
    res.status(500).json({
    error: err.message,
  });
  }
}

  useEffect(() => {
  fetchPlannedCourses(selectedSem);
}, [selectedSem]);

  async function handleAddCourse(course, activeFilter) {
    try {
      const res = await fetch("http://localhost:3000/planned-courses", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: 1,
        courseId: course.id,
        semester: selectedSem,
        basket: activeFilter
      }),
      });

      if (!res.ok) {
        throw new Error("Failed to add course");
      }
      await fetchPlannedCourses(selectedSem);
    } catch(err) {
      console.error(err);
    }}

async function handleDeleteCourse(courseId) {
  try {
    const res = await fetch("http://localhost:3000/planned-courses", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        courseId: courseId
      }),
    });

    if (!res.ok) {
        throw new Error("Failed to delete course");
      }
      await fetchPlannedCourses(selectedSem);
    } catch(err) {
      console.error(err);
    }}
  

  
  return (
    <div className="lg:ml-60 mx-3">
      <div className="pseudo"></div>
    
    <h1 className="my-2 text-3xl font-bold">Semester-Planning</h1>
    <div className="flex mt-3">
    <div className="timeline inline-flex flex-col lg:flex-row items-center w-fit absolute mt-0">
      {Array.from({ length: 8-currentSem }, (_, i) => (<button key={i}
      className={`sem-link ${i+1+currentSem===selectedSem ? "sem-link-current" : !isPlanned(i+1+currentSem) ? "sem-link-future": ""}`}
      onClick={() => setSelectedSem(currentSem + i + 1)}>
      Sem{currentSem + i + 1}
    </button> )
  )}</div>
    <div className="flex flex-col mx-4">
    <div className="mb-4">
      <h2>Planned Courses</h2>
      <h2>Credit load: {creditLoad}</h2>
      <CourseTable courses= {plannedSemesters[selectedSem]} onDelete={handleDeleteCourse}/>
    </div>
    <div className="inline-block lg:block lg:my-3 lg:mx-0">
      <Search onSelectCourse={handleAddCourse} discipline={'CSE'}/>
    </div> 
    </div>
    </div>
  </div>);
  
}
export default SemesterPlanning;
