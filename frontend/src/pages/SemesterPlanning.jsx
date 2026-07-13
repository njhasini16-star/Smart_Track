import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Search from "../components/search";
import CourseTable from "../components/CourseTable";
import { getPlannedCourses, addPlannedCourse, deletePlannedCourse } from "../api/PlannedCourses";

function SemesterPlanning() {
  const { currentSem, disciplineCode} = useOutletContext();

  const [selectedSem, setSelectedSem] = useState(currentSem+1)
  const [refreshBasketCredits, setRefreshBasketCredits] = useState(0);
  const [plannedSemesters, setPlannedSemesters] = useState(() => {
    const semesters = {};

  for (let sem = currentSem + 1; sem <= 8; sem++) {
    semesters[sem] = [];}
  return semesters;
  });

  const isPlanned = sem => plannedSemesters[sem].length>0;
  
  const creditLoad = plannedSemesters[selectedSem].reduce((sum, course) => sum+course.credits, 0);
  
  async function fetchPlannedCourses() {
  try {

    const data = await getPlannedCourses(selectedSem);

    setPlannedSemesters(prev => ({
      ...prev,
      [selectedSem]: data,
    }));

  } catch (err) {
    console.error(err);
  }
}

  useEffect(() => {
  fetchPlannedCourses();
}, [selectedSem]);

  async function handleAddCourse(course, activeFilter) {
    try {
      
      await addPlannedCourse({
        courseId: course.id,
        semester: selectedSem,
        basket: activeFilter
      })

      await fetchPlannedCourses();

      setRefreshBasketCredits(prev => prev +1);
    } catch(err) {
      console.error(err);
    }}

async function handleDeleteCourse(courseId) {
  try {
      await deletePlannedCourse(courseId);
      await fetchPlannedCourses();
      setRefreshBasketCredits(prev => prev + 1)
    } catch(err) {
      console.error(err);
    }}
  
  return (<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    <div className="lg:ml-60 mx-3 ">
      <div className="pseudo"></div>
    
    <h1 className="my-2 text-3xl font-bold">Semester-Planning</h1>
    <div className="flex lg:flex-col mt-3">
    <div className="timeline inline-flex flex-col lg:flex-row items-center w-fit absolute mt-0">
      {Array.from({ length: 8-currentSem }, (_, i) => (<button key={i}
      className={`sem-link ${i+1+currentSem===selectedSem ? "sem-link-current" : !isPlanned(i+1+currentSem) ? "sem-link-future": ""}`}
      onClick={() => setSelectedSem(currentSem + i + 1)}>
      Sem{currentSem + i + 1}
    </button> )
  )}</div>
    <div className="flex flex-col ml-6 lg:ml-0 mr-2 w-full">
    <div className="mb-4 bg-white rounded-2xl border border-slate-600 overflow-hidden lg:my-4 xl:w-5/6">
      <h2 className="bg-slate-600 text-white text-center py-1">Planned Courses</h2>
      <h2 className="py-2 mx-3 bg-slate-200 w-fit px-4 my-3 rounded-full border border-slate-600 text-slate-600"> {creditLoad} Credits</h2>
      <Search onSelectCourse={handleAddCourse} discipline={disciplineCode} mode="Planned" refreshBasketCredits={refreshBasketCredits}/>
      <div className="m-3">
      <CourseTable courses= {plannedSemesters[selectedSem]} onDelete={handleDeleteCourse}/>
      </div>
    </div>
    <div className="inline-block lg:block lg:my-3 lg:mx-0 w-full">
      
    </div> 
    </div>
    </div>
  </div>
  </div>);
  
}
export default SemesterPlanning;
