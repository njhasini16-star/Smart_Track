import { useState, useEffect } from "react";
import { getCourses } from "../api/courses";
import { getAllCompletedCourses } from "../api/completedCourses";
import { getAllPlannedCourses } from "../api/PlannedCourses";
import { calculateBasketCredits } from "../utils/basketCredits";

function Search({discipline, onSelectCourse, mode, refreshBasketCredits}) {
  const [filters, setFilters] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All / Open Electives");
  const [grades, setGrades] = useState({})
  const [basketWiseCredits, setBasketWiseCredits] =useState({});
  const [completed, setCompleted] = useState([]);
  const [planned, setPlanned] = useState([]);

  const gradeslist = ['P', 'A+', 'A', 'A-', 'B', 'B-', 'C', 'C-', 'D', 'D-', 'E', 'E-', 'F'];
  
  const basketTotalCredits = {"Institute level Courses":31, 
  "Open Electives":20, "All / Open Electives":20, "Science Basket":8, "Math Basket":10, 
  "Materials Basket":3, "HSS Basket":20};

  if (discipline === "AI") {
    basketTotalCredits["Discipline Core Courses"] = 44;
    basketTotalCredits["Discipline Electives"] = 24;
  }

  if (discipline === "CL") {
    basketTotalCredits["Discipline Core Courses"] = 42;
    basketTotalCredits["Discipline Electives"] = 24;
  }

  if (discipline === "CE") {
    basketTotalCredits["Discipline Core Courses"] = 42;
    basketTotalCredits["Discipline Electives"] = 24;
  }

  if (discipline === "CSE") {
    basketTotalCredits["Discipline Core Courses"] = 36;
    basketTotalCredits["Discipline Electives"] = 30;
  }

  if (discipline === "EE") {
    basketTotalCredits["Discipline Core Courses"] = 43;
    basketTotalCredits["Discipline Electives"] = 24;
  }
  
  if (discipline === "ICDT") {
    basketTotalCredits["Discipline Core Courses"] = 44;
    basketTotalCredits["Discipline Electives"] = 24;
  }

  if (discipline === "MSE") {
    basketTotalCredits["Discipline Core Courses"] = 42;
    basketTotalCredits["Discipline Electives"] = 24;
  }

  if (discipline === "ME") {
    basketTotalCredits["Discipline Core Courses"] = 44;
    basketTotalCredits["Discipline Electives"] = 24;
  }


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
    useEffect(() => {
      async function fetchBasketWiseCourses() {
  try {
  const completed = await getAllCompletedCourses();
  setCompleted(completed);
  const planned = await getAllPlannedCourses();
  setPlanned(planned);

setBasketWiseCredits(calculateBasketCredits(completed, planned, filters));

  } catch(err) {
    console.error(err);
  }
} fetchBasketWiseCourses();} ,[filters, refreshBasketCredits]
    )

  const plannedCourseIds =  planned.map( plannedCourse => plannedCourse.id);
  const completedCourseIds = completed.map( completedCourse => completedCourse.course_id);

  const query = search.replace(/\s/g, "").toLowerCase();
  
  const initialSearchResults = allCourses.filter(course => {

  const matchesDiscipline = 
    !course.discipline || 
    course.discipline === discipline;

  const matchesBasket =
    activeFilter === "All / Open Electives" ||
    course.baskets.includes(activeFilter);

  const matchesSearch =
    course.name.replace(/\s/g, "").toLowerCase().includes(query) ||
    course.course_code?.replace(/\s/g, "").toLowerCase().includes(query);

  const freshSearch = (!plannedCourseIds?.includes(course.id)
  && !completedCourseIds?.includes(course.id));

   if (activeFilter === 'All / Open Electives'){
    return matchesSearch && freshSearch;
   }
  return matchesBasket && matchesSearch && matchesDiscipline && freshSearch;
});

  const searchResults =
  activeFilter === "All / Open Electives"
    ? initialSearchResults.filter(
        (course, index, self) =>
          index === self.findIndex(c => c.id === course.id)
      )
    : initialSearchResults;

  return(
    <div className="flex w-full mb-3">

      <div className="inline-flex flex-col ml-3 bg-slate-100 rounded-2xl overflow-hidden border border-slate-600">
        <div className="text-white bg-slate-600 text-center py-1">Basket Progress</div>
      {filters.map((filter) => ( 
        <button className={`block flex flex-row items-center text-left px-3 py-1 hover:bg-slate-400 hover:text-white hover:cursor-pointer ${activeFilter===filter && "bg-blue-500 text-white"}`} key={filter}
        onClick={() => setActiveFilter(filter)}> <div className="lg:mr-4 mr-2">{filter === activeFilter && <span className="text-xs">&#x25BA;</span>}{" "}{filter}</div>
       {mode === "Planned" && <div className={`${filter===activeFilter ? "text-white" : "text-slate-600"} text-sm font-semibold lg:inline-block lg:mr-3 ml-auto`}>{basketWiseCredits[filter]}/{basketTotalCredits[filter]}</div>}
        </button>
      ))}
      </div>
      <div className="inline-flex flex-col border border-slate-600 rounded-2xl bg-white overflow-hidden ml-auto h-fit mr-3">
      <input type="text" value={search} placeholder="Search Course..." 
      onChange={(e) => setSearch(e.target.value)} 
      className="w-full ml-auto px-4 py-2 border-b border-slate-600 rounded-2xl focus:outline-none focus:border-t-1 focus:border-x-1 focus:border-b-2"/>
  
      <ul className="h-70 w-fit overflow-y-auto inline-flex flex-col">
      {searchResults.map((course, idx) => (
        <li key={idx} className="bg-white w-90 flex flex-col py-2 pl-2 border-b border-slate-600">

          <div className="flex font-medium">{course.course_code || 'TBD'}

          {showGrade && (<>
          <select
          className="mx-4"
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
          className="rounded-md bg-blue-500 ml-auto px-2 text-white text-sm mr-3 hover:bg-blue-600 hover:cursor-pointer">+ Add</button>
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