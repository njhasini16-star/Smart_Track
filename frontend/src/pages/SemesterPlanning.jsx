import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Search from "../components/search";
import CourseTable from "../components/CourseTable";
import { getPlannedCourses, addPlannedCourse, deletePlannedCourse } from "../api/PlannedCourses";
import useToast from "../hooks/useToast";
import Toast from "../components/Toast";

function SemesterPlanning() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const { currentSem, disciplineCode} = useOutletContext();
  const {toast, showToast} = useToast();

  const [selectedSem, setSelectedSem] = useState(currentSem)
  const [refreshBasketCredits, setRefreshBasketCredits] = useState(0);

  const [timeSlots, setTimeSlots] = useState({});
  const [courseOfferings, setCourseOfferings] = useState([]);
  const [showTimetable, setShowTimetable] = useState(false);

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
      const res = await fetch('http://localhost:3000/time-slots');
      const data = await res.json();

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

      const res = await fetch(`http://localhost:3000/course-offerings?academic_year=${academicYear}&term=${term}`);
      const data = await res.json();

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

  console.log(conflicts);


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
