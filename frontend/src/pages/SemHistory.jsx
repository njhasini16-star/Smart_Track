import { useParams, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import CourseTable from "../components/CourseTable.jsx";
import Search from "../components/search.jsx";
import { getCompletedCourses, addCompletedCourse, deleteCompletedCourse } from "../api/completedCourses.js";
import useToast from "../hooks/useToast.js";
import Toast from "../components/Toast.jsx";
import writeXlsxFile from "write-excel-file/browser";

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
  
  async function exportCompletedCourses() {
  try {
    const headerStyle = {
      fontWeight: "bold",
      textColor: "#FFFFFF",
      backgroundColor: "#475569",
      align: "center",
      alignVertical: "center",
      borderColor: "#1E293B",
      borderStyle: "thin",
      height: 25
};  
    const bodyStyle = {
      alignVertical: "center",
      backgroundColor: "#F8FAFC",
      borderColor: "#1E293B",
      borderStyle: "thin",
      height: 25
    }
    const rows = [
      [
        {value: "Code", ...headerStyle},
        {value: "Course", ...headerStyle},
        {value: "Credits", ...headerStyle},
        {value: "Grade", ...headerStyle},
        {value: "Basket", ...headerStyle}
      ]
    ]
    completedCourses[semId].forEach(course => {
      rows.push([
        {value: course.course_code, align: "center", ...bodyStyle},
        {value: course.name, ...bodyStyle},
        {value: course.credits, align: "center", ...bodyStyle},
        {value: course.grade, align: "center", ...bodyStyle},
        {value: course.basket, ...bodyStyle}
      ]);
    })
    const object = await writeXlsxFile(rows, {
      filePath: "completed-courses.xlsx",
      sheet: "Completed Courses",
      columns: [
        {width: 10},
        {width: 50},
        {width: 10},
        {width: 10},
        {width: 25}
      ]
    } );
    const blob = await object.toBlob();

    const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `semester-${semId}-completed-courses.xlsx`;

  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(url);

     console.log("3. File exported");
  } catch(err) {
    console.log(err);
    showToast({
      message: "Could not export as excel.",
      type: "error"
    });
  }
  }

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
          <button onClick={exportCompletedCourses} className="text-blue-600 p-1 cursor-pointer">Export as Excel</button>
        <CourseTable courses= {completedCourses[semId] || []} onDelete={handleDeleteCourse}/>
        </div>
        </div>
        </>
    );
}
export default SemHistory;