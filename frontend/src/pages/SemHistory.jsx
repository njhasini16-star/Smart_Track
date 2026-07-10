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

  async function handleDeleteCourse(courseId) {
  try {
      await deleteCompletedCourse(courseId);
      await fetchCompletedCourses();
    } catch(err) {
      console.error(err);
    }}

    return (<div className="mx-8">
        <h1 className="mb-8">This is {semId}</h1>
        
        <CourseTable courses= {completedCourses[semId] || []} onDelete={handleDeleteCourse}/>
        <Search onSelectCourse={handleAddCourse} discipline={disciplineCode} mode="Completed"/>
        </div>
    );
}
export default SemHistory;