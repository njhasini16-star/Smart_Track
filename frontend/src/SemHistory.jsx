import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CourseTable from "./CourseTable.jsx";
import Search from "./search.jsx";

function SemHistory({discipline}) {
    const {semId} = useParams();
    const [completedCourses, setCompletedCourses] = useState({});

  async function fetchCompletedCourses(semId) {
  try {
  const res = await fetch( `http://localhost:3000/completed-courses/${semId}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch completed courses for ${semId}`);
  }

  const data = await res.json();

  setCompletedCourses(prev => ({
      ...prev,
      [semId]: data,
    }));
  } catch(err) {
    console.error(err);
  }
}

useEffect(() => {
  fetchCompletedCourses(semId);
}, [semId]);  

  async function handleAddCourse(course, activeFilter, grade) {
    try {
      console.log({
        courseId: course.id,
        courseCode: course.course_code,
        courseName: course.name,
        basket: activeFilter,
        grade: grade
});
      const res = await fetch("http://localhost:3000/completed-courses", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: 1,
        courseId: course.id,
        semester: semId,
        basket: activeFilter,
        grade: grade
      }),
      });

      if (!res.ok) {
        throw new Error("Failed to add course");
      }
      await fetchCompletedCourses(semId);

    } catch(err) {
      console.error(err);
    }}

  async function handleDeleteCourse(courseId) {
  try {
    const res = await fetch("http://localhost:3000/completed-courses", {
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
      await fetchCompletedCourses(semId);
    } catch(err) {
      console.error(err);
    }}
  

    return (<div className="mx-8">
        <h1 className="mb-8">This is {semId}</h1>
        
        <CourseTable courses= {completedCourses[semId] || []} onDelete={handleDeleteCourse}/>
        <Search onSelectCourse={handleAddCourse} discipline={discipline} mode="Completed"/>
        </div>
    );
}
export default SemHistory;