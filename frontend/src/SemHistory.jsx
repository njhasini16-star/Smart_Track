import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CourseInfo from "./CourseInfo";
import { useBasketWise } from "./basketWiseStore.jsx";
 
function handleSubmitCluster(e, next) {
    e.preventDefault();
    next(true);
}

function handleSubmitCourse(e, addCourseToSemester, semId, courses, courseIndex, cluster, setShowCluster, setShowCourse, setCluster, setCourse, grade, setGrade, setBasketWise, basketWise ) {
    e.preventDefault();
    const index = parseInt(courseIndex, 10);
    const selectedCourse = courses[cluster][index];
    selectedCourse.grade = grade;
    const alreadyExists = basketWise[cluster].some(c => c.code === selectedCourse.code);
    setBasketWise(prev => ({...prev, [cluster]:(!alreadyExists ? [...prev[cluster], selectedCourse]: prev[cluster])}))
    addCourseToSemester(semId, selectedCourse);
    setShowCluster(false);
    setShowCourse(false);
    setCluster("Institute level Courses");
    setCourse("0");
    setGrade(8);
}

function handleSubmitNewCourse(e, addCourseToSemester, semId, course, setShowNewCourse, setShowCluster, setNewCourse, setCluster, grade, setGrade, setBasketWise, cluster, basketWise) { 
    e.preventDefault();
    course.grade = grade;
    const alreadyExists = basketWise[cluster].some(c => c.code === course.code);
    setBasketWise(prev => ({...prev, [cluster]:(!alreadyExists ? [...prev[cluster], course]: prev[cluster])}))
    addCourseToSemester(semId, course);
    setShowNewCourse(false);
    setShowCluster(false);
    setNewCourse({code:"", name:"", credits:""});
    setCluster("Institute level Courses")
    setGrade(8);
}

function SelectCluster({cluster, setCluster, next}) { 
    
    const handleChange = (event) => {
        setCluster(event.target.value);
        next(false);
    }

    return (<>
        <p>Select Cluster</p>
        <form onSubmit={(e) => handleSubmitCluster(e, next)}>
            <select value={cluster} onChange={handleChange}>
                <option value="Institute level Courses">Institute level Courses</option>
                <option value="Discipline Core Courses">Discipline Core Courses</option>
                <option value="Discipline Electives">Discipline Electives</option>
                <option value="HSS Basket">HSS Basket</option>
                <option value="Math Basket">Math Basket</option>
                <option value="Materials Basket">Materials Basket</option>
                <option value="Science Basket">Science Basket</option>
                <option value="Open Electives">Open Electives</option> 
            </select>
            <input type="submit" className="block"/>
        </form>
        </>
    );
}

function SelectCourse({semId, courses, course, setCourse, cluster, addingNewCourse, setShowCourse, setShowNewCourse, addCourseToSemester, setCluster, setShowCluster, grade, setGrade, setBasketWise, basketWise}) {
    
    const handleChange = (event) => {
        setCourse(event.target.value);
    }
    const handleChangeGrade = (e) => {
        setGrade(e.target.value);
    }

    return (<>
        <p>Select Course</p>
        <form onSubmit={(e) => handleSubmitCourse(e, addCourseToSemester, semId, courses, course, cluster, setShowCluster, setShowCourse, setCluster, setCourse, grade, setGrade, setBasketWise, basketWise)}> 
            <select value={course} onChange={handleChange}>
                {courses[cluster].map((c, idx) => 
                    <option key={idx} value={idx}>{c.code}{" "}{c.name}{" "}({c.credits} credits)</option>
                )}
            </select>
            <select value={grade} onChange={handleChangeGrade}>
                <option value={11}>11</option>
                <option value={10}>10</option>
                <option value={9}>9</option>
                <option value={8}>8</option>
                <option value={7}>7</option>
                <option value={6}>6</option>
                <option value={5}>5</option>
                <option value={4}>4</option>
                <option value={3}>3</option>
                <option value={2}>2</option>
                <option value={1}>1</option>
                <option value={0}>0</option>

            </select>
            <button type="button" onClick={() => addingNewCourse(setShowCourse, setShowNewCourse)}>+ New</button>
            <input type="submit" className="block"/>
        </form>
        </>
    );
}


function AddNewCourse({newCourse, setNewCourse, addCourseToSemester, semId, setShowNewCourse, setShowCluster, setCluster, grade, setGrade, setBasketWise, cluster, basketWise}) {
    const handleChangeGrade = (e) => {
        setGrade(e.target.value);
    }
    return(
        <form onSubmit={(e) => handleSubmitNewCourse(e, addCourseToSemester, semId, newCourse, setShowNewCourse, setShowCluster, setNewCourse, setCluster, grade, setGrade, setBasketWise, cluster, basketWise)}> 
        <label>Course Code:
            <input className="block"
                type="text" 
                value={newCourse.code}
                onChange={(e) => setNewCourse(prev => ({
    ...prev,
    code: e.target.value}))}/>
        </label>
        <label>Course Name:
            <input className="block"
                type="text" 
                value={newCourse.name}
                onChange={(e) => setNewCourse(prev => ({
    ...prev,
    name: e.target.value}))}/>
        </label>
        <label>Course Credits:
            <input className="block"
                type="text" 
                value={newCourse.credits}
                onChange={(e) => setNewCourse(prev => ({
    ...prev,
    credits: e.target.value}))}/>
        </label>
        <select value={grade} onChange={handleChangeGrade}>
                <option value={11}>11</option>
                <option value={10}>10</option>
                <option value={9}>9</option>
                <option value={8}>8</option>
                <option value={7}>7</option>
                <option value={6}>6</option>
                <option value={5}>5</option>
                <option value={4}>4</option>
                <option value={3}>3</option>
                <option value={2}>2</option>
                <option value={1}>1</option>
                <option value={0}>0</option>

            </select>
        <input type="submit"/>
        </form>
    );
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
        {showCluster && <SelectCluster next={setShowCourse} cluster={cluster} setCluster={setCluster}/>}
        
        {showCourse && <SelectCourse semId={semId} addCourseToSemester={addCourseToSemester} courses={courses} 
        course={course} addingNewCourse={addingNewCourse} setCourse={setCourse} cluster={cluster} setShowCourse={setShowCourse} 
        setShowNewCourse={setShowNewCourse} setCluster={setCluster} setShowCluster={setShowCluster} grade={grade} setGrade={setGrade}
        setBasketWise={setBasketWise} basketWise={basketWise}/>} 
        
        {showNewCourse && <AddNewCourse newCourse={newCourse} setNewCourse={setNewCourse} addCourseToSemester={addCourseToSemester} 
        semId={semId} setShowNewCourse={setShowNewCourse} setShowCluster={setShowCluster} setCluster={setCluster} grade={grade} 
        setGrade={setGrade} setBasketWise={setBasketWise} cluster={cluster} basketWise={basketWise} />}
        
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