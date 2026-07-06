import { useState, useEffect } from "react";
import { getCourses } from "../api/courses";

function Search({discipline, onSelectCourse, mode}) {
  const [filters, setFilters] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All / Open Electives");
  const [grades, setGrades] = useState({})

  const gradeslist = ['P', 'A+', 'A', 'A-', 'B', 'B-', 'C', 'C-', 'D', 'D-', 'E', 'E-', 'F'];
  
  let showGrade;
  if (mode === "Completed") {
    showGrade = true;
  } 
  if (mode === "Planned") {
    showGrade = false;
  }
  
  useEffect(() => {
        async function fetchCourses() {
            try {
            const data = await getCourses();
  
            setAllCourses(data);
            
        } catch (err) {
            console.error(err);
        }} fetchCourses();}, [])
  
  useEffect(() => {
        async function fetchBaskets() {
          try {
            const res = await fetch("http://localhost:3000/baskets");
            const data = await res.json();
            setFilters([
            "All / Open Electives",
            ...data
              .filter(basket => basket.name !== "Open Electives")
              .map(basket => basket.name)
              ]);} catch (err) {
          console.error(err);
        }
      } fetchBaskets();}, [])

  const query = search.replace(/\s/g, "").toLowerCase();
  
  const searchResults = allCourses.filter(course => {

  const matchesDiscipline = 
    !course.discipline || 
    course.discipline === discipline;

  const matchesBasket =
    activeFilter === "All / Open Electives" ||
    course.baskets.includes(activeFilter);

  const matchesSearch =
    course.name.replace(/\s/g, "").toLowerCase().includes(query) ||
    course.course_code?.replace(/\s/g, "").toLowerCase().includes(query);
   if (activeFilter === 'All / Open Electives'){
    return matchesSearch
   }
  return matchesBasket && matchesSearch && matchesDiscipline;
});

  return(
    <div className="w-fit flex">

      <div className="inline-flex flex-col mr-3">
      {filters.map((filter) => ( 
        <button className={`block text-left p-1 hover:bg-gray-100 ${activeFilter===filter && "text-teal-700"}`} key={filter} 
        onClick={() => setActiveFilter(filter)}>{filter}</button>
      ))}
      </div>
      <div className="inline-flex flex-col">
      <input type="text" value={search} placeholder="Search Course..." 
      onChange={(e) => setSearch(e.target.value)} 
      className="w-full ml-auto mr-0 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"/>
  
      <ul className="h-70 w-fit overflow-y-auto inline-flex flex-col">
      {query && searchResults.map((course, idx) => (
        <li key={idx} className="w-100 flex flex-col py-2 border-b border-gray-300">

          <div className="flex font-medium">{course.course_code || 'TBD'}

          {showGrade && (<>
          <span>Grade:</span>
          <select
            value={grades[course.id] || "P"}
            onChange={(e) =>
    setGrades(prev => ({
      ...prev,
      [course.id]: e.target.value
    }))
    }>
            {gradeslist.map( (g) => (
              <option value={g} key={g}> {g} </option>
            ))}
            </select>
            </>)}

          <button
  onClick={() => {
    if (showGrade) {
      console.log({"course":course});
      onSelectCourse(course, activeFilter, grades[course.id]||"P");
    } else {
      onSelectCourse(course, activeFilter);
    }
    setSearch("");
  }}
          className="rounded bg-teal-600 ml-auto px-2 text-white text-sm mr-3 ">+ Add to {activeFilter === 'All / Open Electives' ? 'Open electives': activeFilter}</button>
</div>
<div className="text-gray-600">{course.name || 'TBD'}</div> 
</li>
      ))}
      
      </ul>
      </div>
    </div>
  );
} 

export default Search;