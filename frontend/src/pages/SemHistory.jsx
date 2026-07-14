import { useParams, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import CourseTable from "../components/CourseTable.jsx";
import Search from "../components/search.jsx";
import { getCompletedCourses, addCompletedCourse, deleteCompletedCourse } from "../api/completedCourses.js";

function SemHistory() {
    const {semId} = useParams();
    const [completedCourses, setCompletedCourses] = useState({});
    const { disciplineCode } = useOutletContext();
  async function fetchCompletedCourses() {
  try {

  const data = await getCompletedCourses(semId);
  setCompletedCourses(prev => ({
      ...prev,
      [semId]: data,
    }));

  } catch(err) {
    console.error(err);
  }
} 
  
useEffect(() => {
  fetchCompletedCourses();
}, [semId]);  

  async function handleAddCourse(course, activeFilter, grade) {
    try {
      
      await addCompletedCourse({
        courseId: course.id,
        basket: activeFilter,
        grade,
        semester:semId
      })
      await fetchCompletedCourses();

    } catch(err) {
      console.error(err);
    }}

  async function handleDeleteCourse(course) {
  try {
      await deleteCompletedCourse(course.id);
      await fetchCompletedCourses();
    } catch(err) {
      console.error(err);
    }}

    return (<div className="ml-4 lg:mx-0 lg:my-8 bg-white rounded-2xl border border-slate-600 overflow-hidden">
      <div className="bg-slate-600 text-white py-1 text-center">Completed Courses - Semester {semId}</div>
        <div className="my-3">
        <Search onSelectCourse={handleAddCourse} discipline={disciplineCode} mode="Completed"/>
        </div>
        <div className="m-3">
        <CourseTable courses= {completedCourses[semId] || []} onDelete={handleDeleteCourse}/>
        </div>
        </div>
    );
}
export default SemHistory;