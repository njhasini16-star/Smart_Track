import { useState } from "react";
import CourseInfo from "./CourseInfo";

const courses = CourseInfo("CSE");
const allCourses = courses["Open Electives"];
const filters = ["Open Electives", "Institute level Courses", "Discipline Core Courses", 
  "Discipline Electives", "Science Basket", "HSS Basket", "Math Basket", "Materials Basket"];

function Search({search, setSearch, courseFilter, setCourseFilter, plannedSemesters, selectedSem, setPlannedSemesters, activeFilter, setActiveFilter}) {

  const query = search.replace(/\s/g, "").toLowerCase();

  const filteredCourses = courseFilter.filter((course) => (
    course.name.replace(/\s/g, "").toLowerCase().includes(query)
    || course.code.replace(/\s/g, "").toLowerCase().includes(query)));

  return(
    <div className="w-fit flex">

      <div className="inline-flex flex-col mr-3">
      {filters.map((filter, idx) => ( filter === "Open Electives"?
        <button className={`block text-left p-1 hover:bg-gray-100 ${activeFilter==="All" && "text-teal-700"}`} key={idx} 
        onClick={() => {setCourseFilter(allCourses); setActiveFilter("All");}}>All</button> :
        
        <button className={`block text-left p-1 hover:bg-gray-100 ${activeFilter===filter && "text-teal-700"}`} key={idx} 
        onClick={() => {setCourseFilter(courses[filter]); setActiveFilter(filter);}}>{filter}</button>
      ))}
      </div>
      <div className="inline-flex flex-col">
      <input type="text" value={search} placeholder="Search Course..." 
      onChange={(e) => setSearch(e.target.value)} className="w-full ml-auto mr-0 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"/>
  
      <ul className="h-70 w-fit overflow-y-auto inline-flex flex-col">
      {query && filteredCourses.map((course, idx) => (
        <li key={idx} className="w-100 flex flex-col py-2 border-b border-gray-300">
          <div className="flex font-medium">{course.code}
          <button onClick={() => setPlannedSemesters(prev => {
  if (
    prev[selectedSem].some(
      c => c.code === course.code
    )
  ) {
    return prev;
  }

  return {
    ...prev,
    [selectedSem]: [...prev[selectedSem], course]
  };
})} className="rounded bg-teal-600 ml-auto px-2 text-white text-sm mr-3 ">+ Add</button>
</div>
<div className="text-gray-600">{course.name}</div> 
</li>
      ))}
      
      </ul>
      </div>
    </div>
  );
} 

function SemesterPlanning({currentSem}) {
  const [selectedSem, setSelectedSem] = useState(currentSem+1)
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState(allCourses);
  const [activeFilter, setActiveFilter] = useState("All");
  const [plannedSemesters, setPlannedSemesters] = useState(() => {
    const semesters = {};
  for (let sem = currentSem + 1; sem <= 8; sem++) {
    semesters[sem] = [];}
  return semesters;
  });

  const isPlanned = sem => plannedSemesters[sem].length>0;
  
  const creditLoad = plannedSemesters[selectedSem].reduce((sum, course) => sum+course.credits, 0);
  console.log(plannedSemesters)
  
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
      <table>
       <thead>
        <tr>
          <th>Code</th>
          <th>Course</th>
          <th>Credits</th>
          <th>Action</th>
        </tr>
       </thead>
       <tbody>
      {isPlanned(selectedSem)? plannedSemesters[selectedSem].map((course) => (<tr key={course.code}>
        <td>{course.code}</td>
        <td>{course.name}</td>
        <td>{course.credits}</td>
        <td><button onClick={() => (setPlannedSemesters(prev => ({...prev, [selectedSem]:(prev[selectedSem].filter(checkCourse => 
          checkCourse.code !== course.code))})))}>Delete</button></td>
        </tr>)):<tr> <td className="text-gray-500" colSpan={4}>No courses planned yet <br/>Search and add courses below</td></tr>}
      </tbody>
      </table>
    </div>
    <div className="inline-block lg:block lg:my-3 lg:mx-0">
      <Search search={search} setSearch={setSearch} courseFilter={courseFilter} 
      setCourseFilter={setCourseFilter} plannedSemesters={plannedSemesters} selectedSem={selectedSem}
      setPlannedSemesters={setPlannedSemesters} activeFilter={activeFilter} setActiveFilter={setActiveFilter}/>
    </div> 
    </div>
    </div>
  </div>);
  
}
export default SemesterPlanning;