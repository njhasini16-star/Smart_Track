import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CourseInfo from "./CourseInfo";
import { useBasketWise } from "./basketWiseStore.jsx";

function AddCourseModal() {
    
}

function SemHistory({discipline}) {
    const {semId} = useParams();
    const [showCluster, setShowCluster] = useState(false);
    const [showCourse, setShowCourse] = useState(false);
    const [showNewCourse, setShowNewCourse] = useState(false)
    const [cluster, setCluster] = useState("Institute level Courses");
    const [course, setCourse] = useState("0");
    const [newCourse, setNewCourse] = useState({code:"", name:"", credits:""});
    const courses = CourseInfo(discipline);
    const [semesterCourses, setSemesterCourses] = useState({});
    const [grade, setGrade] = useState(8);
    const {basketWise, setBasketWise} = useBasketWise();
// Add a course to the current semester
function addCourseToSemester(semId, course) {
  setSemesterCourses(prev => {
    const existing = prev[semId] || [];
    // check by code (or any unique property)
    const alreadyAdded = existing.some(c => c.code === course.code);

    if (alreadyAdded) {
      return prev; // no change
    }
    
    return {
      ...prev,
      [semId]: [...existing, course]
    };
  });
}


    useEffect(() => {
    setShowCluster(false);
    setShowCourse(false);
    setShowNewCourse(false);
    setCluster("Institute level Courses");
    setCourse("0")
    setGrade(8);
    setNewCourse({code:"", name:"", credits:""})
  }, [semId]);
    
    function addCluster() {
        setShowCluster(true);
    }
    function addingNewCourse(current, next) {
    next(true);
    current(false);
}
useEffect(() => {
  console.log("Updated semesterCourses:", semesterCourses[semId]);
}, [semesterCourses, semId]);

const handleDelete = (idx) => {
    setSemesterCourses((prev) => {
      const updated = { ...prev };
      const updatedCourses = [...(updated[semId] || [])];
      updatedCourses.splice(idx, 1);
      updated[semId] = updatedCourses;
      return updated;
    });
  };

  const existing = semesterCourses[semId] || [];

    return (<div className="mx-8">
        <h1 className="mb-8">This is {semId}</h1>
        <button className="bg-blue-600 px-2" onClick={addCluster}>+ Add</button>
        
        <table>
            <thead>
        <tr>
            <th>Course Code</th>
            <th>Name</th>
            <th>Credits</th>
            <th>Grade</th>
        </tr>
        </thead>
        <tbody>
            {semesterCourses[semId]?.length > 0 ? (semesterCourses[semId].map((course, idx) => <tr key={idx}>
            <td >{course.code}</td>
            <td >{course.name}</td>
            <td >{course.credits}</td>
            <td >{course.grade}</td>
            <td><button onClick={() => handleDelete(idx) }>Delete</button></td>
            </tr>)) : (
          <tr>
            <td colSpan="4" style={{ textAlign: "center" }}>
              No courses added yet
            </td>
          </tr>
        )}
        </tbody>
        </table>
        </div>
    );
}
export default SemHistory;