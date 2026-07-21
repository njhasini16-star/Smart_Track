import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Search from "../components/search";
import CourseTable from "../components/CourseTable";
import { getPlannedCourses, addPlannedCourse, deletePlannedCourse } from "../api/plannedCourses";
import useToast from "../hooks/useToast";
import Toast from "../components/Toast";
import writeXlsxFile from "write-excel-file/browser";
import { getCourseOfferings, getTimeSlots } from "../api/timetable";

function SemesterPlanning() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const { currentSem, disciplineCode} = useOutletContext();
  const {toast, showToast} = useToast();

  const [selectedSem, setSelectedSem] = useState(currentSem)
  const [refreshBasketCredits, setRefreshBasketCredits] = useState(0);

  const [timeSlots, setTimeSlots] = useState({});
  const [courseOfferings, setCourseOfferings] = useState([]);
  const [showTimetable, setShowTimetable] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const [plannedSemesters, setPlannedSemesters] = useState(() => {
    const semesters = {};

  for (let sem = currentSem ; sem <= 8; sem++) {
    semesters[sem] = [];}
  return semesters;
  });

  const isPlanned = sem => plannedSemesters[sem].length>0;
  
  const creditLoad = plannedSemesters[selectedSem].reduce((sum, course) => sum+course.credits, 0);
  
  async function fetchPlannedCourses() {
  try {

    const data = await getPlannedCourses(selectedSem);

    setPlannedSemesters(prev => ({
      ...prev,
      [selectedSem]: data,
    }));

  } catch (err) {
    console.error(err);
  }
}

async function fetchTimeSlots() {
    try {
      const data = await getTimeSlots();
      setTimeSlots(data);

    } catch(err) {
      console.error(err);

      showToast({
        message: "Internal server error.",
        type: "error"
      })
    }
  }

  async function fetchCourseOfferings() {
    try {
      const today = new Date();
      const currentYear = today.getFullYear();

      const academicYear =
      currentSem % 2 !== 0
    ? `${currentYear}-${String(currentYear + 1).slice(-2)}`
    : `${currentYear - 1}-${String(currentYear).slice(-2)}`;

      const term = currentSem%2 !== 0 ? "I" : "II";

      const data = await getCourseOfferings(academicYear, term);
    
      setCourseOfferings(data);
    } catch(err) {
      console.error(err);

      showToast({
        message: "Internal server error.",
        type: "error"
      })
    }
  }

  const timetableCourses = courseOfferings?.filter(offering =>
  plannedSemesters[currentSem].some(course =>
    course.id === offering.course_id
  )); 
  const slotCourses = {};

  timetableCourses.forEach(course => {
  course.slots.forEach(slotCode => {
    if (!slotCourses[slotCode]) {
      slotCourses[slotCode] = [];
    }

    slotCourses[slotCode].push(course);

  });
});
  const conflicts = Object.entries(slotCourses)
  .filter(([slot, courses]) => {
    const uniqueCourses = new Set(
      courses.map(course => course.course_id)
    );

    return uniqueCourses.size > 1;
  });

 async function exportPlannedCourses() {
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
      backgroundColor: "#F8FAFC",
      alignVertical: "center",
      borderColor: "#1E293B",
      borderStyle: "thin",
      height: 25
    }
    const rows = [
      [
        {value: "Code", ...headerStyle},
        {value: "Course", ...headerStyle},
        {value: "Credits", ...headerStyle},
        {value: "Basket", ...headerStyle}
      ]
    ]
    plannedSemesters[selectedSem].forEach(course => {
      rows.push([
        {value: course.course_code, align: "center", ...bodyStyle},
        {value: course.name, align: "left", ...bodyStyle},
        {value: course.credits, align: "center", ...bodyStyle},
        {value: course.basket, align: "left", ...bodyStyle}
      ]);
    })
    const object = await writeXlsxFile(rows, {
      filePath: "planned-courses.xlsx",
      sheet: "Planned Courses",
      columns: [
        { width: 10 },
        { width: 50 }, 
        { width: 10 }, 
        { width: 25 }  
      ]
    });
    const blob = await object.toBlob();

    const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `semester-${selectedSem}-planned-courses.xlsx`;

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

  useEffect(() => {
  fetchPlannedCourses();
  fetchTimeSlots();
  fetchCourseOfferings();

}, [selectedSem]);

  useEffect(() => {
  if (showTimetable && conflicts.length > 0) {
    showToast({
      message: "Timetable conflict detected.",
      type: "error"
    });
  }
}, [conflicts.length, showTimetable]);
  
  async function exportTimetable() {
    const horizontalHeaderStyle = {
      textColor: "#ffffff",
      backgroundColor: "#475569",
      fontWeight: "bold",
      align: "center",
      alignVertical: "center",
      height: 20,
      borderColor: "#1E293B",
      borderStyle: "thin"
    }
    const verticalHeaderStyle = {
      backgroundColor: "#94A3B8",
      fontWeight: "bold",
      align: "center",
      alignVertical: "center",
      borderColor: "#1E293B",
      borderStyle: "thin"
    }

    const bodyStyle = {
      align: "center",
      alignVertical: "center",
      borderColor: "#1E293B",
      borderStyle: "thin",
      wrap: true,
      height: 50
    }

  const rows = [];
  const headerRow = [
    { value: "", ...horizontalHeaderStyle}
  ];

  timeSlots.slice(0, 6).forEach(slot => {
    headerRow.push({
      value: `${slot.start_time.slice(0, 5)} - ${slot.end_time.slice(0, 5)}`,
      ...horizontalHeaderStyle
    });
  });

  rows.push(headerRow);

  // Timetable rows
  days.forEach((day, index) => {
    const row = [
      {
        value: day,
        ...verticalHeaderStyle
      }
    ];

    timeSlots
      .slice(index * 6, 6 + index * 6)
      .forEach(slot => {
        const courses = slotCourses[slot.code] || [];

        row.push({
          value: courses
            .map(course => `${course.course_code} (${course.language})`)
            .join("\n"),
            backgroundColor: `${conflicts.find(conflict => conflict[0]===slot.code) ? "#FEE2E2" : "#F8FAFC"}`,
            ...bodyStyle
        });
      });

    rows.push(row);
  });

  const object = await writeXlsxFile(rows, {
    sheet: "Timetable",
    columns: [
      {width: 10},
      {width: 20},
      {width: 20},
      {width: 20},
      {width: 20},
      {width: 20},
      {width: 20}
    ]
  });

  const blob = await object.toBlob();

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `semester-${selectedSem}-timetable.xlsx`;

  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(url);
}

    function Timetable() {
      return(
        <div className="fixed inset-0 left-51 md:left-0 md:top-[50px] lg:top-0 lg:left-51 z-5 bg-black/40 flex transition-all">
          <div className="relative top-10 m-4 ml-auto rounded-xl bg-white pb-5 max-w-6xl w-[90%] h-fit overflow-hidden">
            <div className="bg-slate-600 w-full p-1 text-center text-white">Semester {selectedSem} Timetable
            <button
          onClick={() => setShowTimetable(false)}
          className="absolute right-4 cursor-pointer"
        >✕</button> 
        </div>
        <div className="m-4">
        <table className="overflow-hidden !border-1 !border-slate-800 w-full">
  <thead>
    <tr className="bg-slate-600 text-white text-sm">
      <th></th>
      {timeSlots.slice(0,6)?.map(slot => (
        <th key={slot.code}>
          {slot.start_time.slice(0,5)} - {slot.end_time.slice(0, 5)}
        </th>
      ))}
    </tr>
  </thead>

  <tbody>
    {days.map((day, index) => (
      <tr key={day}>
        <th className={`bg-slate-200 font-semibold text-slate-700 `}>{day}</th>

        {timeSlots.slice(0 + index*6, 6 + index*6)?.map(slot => (
          <td key={slot.code} className="h-24 bg-slate-50/50 hover:bg-slate-100 transition-colors">
            {slotCourses[slot.code]?.map(course => (
    <div key={course.id}>
      {course.course_code} ({course.language})
    </div>
  ))}
  <div className="text-red-600">{conflicts.find(conflict => conflict[0]===slot.code) && "conflict!"}</div>
          </td>
        ))}
      </tr>
    ))}
  </tbody>
</table>
</div>
          <button onClick={exportTimetable} className="text-blue-600 p-1 mx-3 cursor-pointer">Export as Excel</button>
          </div>
        </div>
      );
    }

  async function handleAddCourse(course, activeFilter) {
    try {
      
      await addPlannedCourse({
        courseId: course.id,
        semester: selectedSem,
        basket: activeFilter
      })

      await fetchPlannedCourses();

      showToast({
        message: `Added ${course.course_code || course.name } to 
        ${activeFilter === "All / Open Electives" ? "Open Electives" : activeFilter}.`,

        type: "success"
      })
      console.log(plannedSemesters[selectedSem])
      setRefreshBasketCredits(prev => prev +1);
    } catch(err) {
      console.error(err);

      showToast({
        message: `Failed to add ${course.course_code || course.name }`,
        type: "error"
      })
    }}

async function handleDeleteCourse(course) {
  try {
      await deletePlannedCourse(course.id);
      await fetchPlannedCourses();
 
      showToast({
        message: `Removed ${course.course_code || course.name}.`,
        type: "info"
      })
      setRefreshBasketCredits(prev => prev + 1)
    } catch(err) {
      console.error(err);

      showToast({
        message: `Failed to remove ${course.course_code || course.name}.`,
        type: "error"
      })
    }}
  
  return (<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    <div className="lg:ml-60 mx-3 ">
      <div className="pseudo"></div>
    {toast && <Toast toast={toast}/>}
    <h1 className="my-2 text-3xl font-bold">Semester-Planning</h1>
    <div className="flex lg:flex-col mt-3">
    <div className="timeline inline-flex flex-col lg:flex-row items-center w-fit absolute mt-0">
      {Array.from({ length: 8-currentSem +1 }, (_, i) => (<button key={i}
      className={`sem-link ${i+currentSem===selectedSem ? "sem-link-current" : !isPlanned(i+currentSem) ? "sem-link-future": ""}`}
      onClick={() => setSelectedSem(currentSem + i)}>
      Sem{currentSem + i}
    </button> )
  )}</div>
    <div className="flex flex-col ml-6 lg:ml-0 mr-2 w-full">
    <div className="mb-4 bg-white rounded-2xl border border-slate-600 overflow-hidden lg:my-4 xl:w-5/6">
      <h2 className="bg-slate-600 text-white text-center py-1">Planned Courses</h2>
      {selectedSem==currentSem && <button onClick={() => setShowTimetable(true)} className="mx-3 text-right text-blue-600 cursor-pointer">View Timetable</button>}
      {showTimetable && <Timetable/>}
      <h2 className="py-2 mx-3 bg-slate-200 w-fit px-4 my-3 rounded-full border border-slate-600 text-slate-600"> {creditLoad} Credits</h2>
      <Search onSelectCourse={handleAddCourse} discipline={disciplineCode} mode="Planned" refreshBasketCredits={refreshBasketCredits}/>
      <div className="m-3">
        <button onClick={exportPlannedCourses} className="text-blue-600 p-1 cursor-pointer">Export as Excel</button>
      <CourseTable courses= {plannedSemesters[selectedSem]} onDelete={handleDeleteCourse}/>
      </div>
    </div>
    <div className="inline-block lg:block lg:my-3 lg:mx-0 w-full">
      
    </div> 
    </div>
    </div>
  </div>
  </div>);
  
}
export default SemesterPlanning;
