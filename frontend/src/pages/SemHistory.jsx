import { useParams, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import CourseTable from "../components/CourseTable.jsx";
import Search from "../components/search.jsx";
import { getCompletedCourses, addCompletedCourse, deleteCompletedCourse } from "../api/completedCourses.js";
import useToast from "../hooks/useToast.js";
import Toast from "../components/Toast.jsx";

function SemHistory() {
    const {semId} = useParams();
    const [completedCourses, setCompletedCourses] = useState({});
    const { disciplineCode } = useOutletContext();
    const {toast, showToast} = useToast();
    const [refreshBasketCredits, setRefreshBasketCredits] = useState(0);

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

      showToast({
        message: `Added ${course.course_code || course.name} to ${activeFilter === "All / Open Electives" ? "Open Electives": activeFilter}.`,
        type: "success"
      });

      setRefreshBasketCredits(prev => prev + 1);

    } catch(err) {
      console.error(err);

      showToast({
        message: `Failed to add ${course.course_code || course.name}.`,
        type: "error"
      })
    }}

  async function handleDeleteCourse(course) {
  try {
      await deleteCompletedCourse(course.id);
      await fetchCompletedCourses();

      setRefreshBasketCredits(prev => prev+1);
      showToast({
        message: `Removed ${course.course_code || course.name}`,
        type:"info"
      })
      
    } catch(err) {
      console.error(err);

      showToast({
        message: `Failed to remove ${course.course_code || course.name}`,
        type: "error"
      })
    }}

    return (<>
    {toast && <Toast toast={toast}/>}
    <div className="ml-4 lg:mx-0 lg:my-8 bg-white rounded-2xl border border-slate-600 overflow-hidden">
      <div className="bg-slate-600 text-white py-1 text-center">Completed Courses - Semester {semId}</div>
        <div className="my-3">
        <Search onSelectCourse={handleAddCourse} discipline={disciplineCode} mode="Completed" refreshBasketCredits={refreshBasketCredits}/>
        </div>
        <div className="m-3">
        <CourseTable courses= {completedCourses[semId] || []} onDelete={handleDeleteCourse}/>
        </div>
        </div>
        </>
    );
}
export default SemHistory;