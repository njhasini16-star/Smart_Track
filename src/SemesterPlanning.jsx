import { useState } from "react";
import CourseInfo from "./CourseInfo";

const courses = CourseInfo("CSE");
const allCourses = courses["Open Electives"];

function SemesterPlanning({currentSem}) {
  const [selectedSem, setSelectedSem] = useState(currentSem+1)
  const [search, setSearch] = useState("");

  return (
    <div className="lg:ml-60">
      <div className="pseudo"></div>
    <h1>Semester-Planning</h1>
    <div className="timeline inline-flex flex-col lg:flex-row items-center w-fit absolute">
      {Array.from({ length: 8-currentSem }, (_, i) => (<button
      className="sem-link sem-link-future"
      onClick={() => setSelectedSem(currentSem + i + 1)}>
      Sem{currentSem + i + 1}
    </button>)
  )}</div>
    
  </div>);
}
export default SemesterPlanning;