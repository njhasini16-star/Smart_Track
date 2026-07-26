import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { getAllCompletedCourses } from "../api/completedCourses";
import { getCourses } from "../api/courses";

function BasketTracking() {
  const { disciplineCode } = useOutletContext();

  const [selectedBasket, setSelectedBasket] = useState("Discipline Electives");
  const [courses, setCourses] = useState({});
  const [completedCourses, setCompletedCourses] = useState({});

async function  fetchCourses() {
  try {
  let data = await getCourses();

  data = data.filter(course => !course.discipline || course.discipline === disciplineCode)
  const grouped = {};

  data.forEach(course => {
    course.baskets.forEach(basket => {
      grouped[basket] = [...(grouped[basket] || []), course];
  });
});

  setCourses(grouped);

  } catch(err) {
    console.error(err);
  }
}

async function fetchBasketWiseCourses() {
  try {
  const data = await getAllCompletedCourses();
  
  const grouped = {};

  data.forEach(course => {
    grouped[course.basket] = [...(grouped[course.basket] || []), course];
  });

setCompletedCourses(grouped);

  } catch(err) {
    console.error(err);
  }
}

useEffect(() => 
  {
    if (!disciplineCode) return;
    fetchBasketWiseCourses();
    fetchCourses();
  },
[disciplineCode])

const baskets = ["Institute level Courses", "Discipline Core Courses", "Discipline Electives",
  "Open Electives", "Science Basket", "Math Basket", "Materials Basket", "HSS Basket"
]

const basketTotalCredits = {"Institute level Courses":31, 
  "Open Electives":20, "Science Basket":8, "Math Basket":10, 
  "Materials Basket":3, "HSS Basket":20};

  if (disciplineCode === "AI") {
    basketTotalCredits["Discipline Core Courses"] = 44;
    basketTotalCredits["Discipline Electives"] = 24;
  }

  if (disciplineCode === "CL") {
    basketTotalCredits["Discipline Core Courses"] = 42;
    basketTotalCredits["Discipline Electives"] = 24;
  }

  if (disciplineCode === "CE") {
    basketTotalCredits["Discipline Core Courses"] = 42;
    basketTotalCredits["Discipline Electives"] = 24;
  }

  if (disciplineCode === "CSE") {
    basketTotalCredits["Discipline Core Courses"] = 36;
    basketTotalCredits["Discipline Electives"] = 30;
  }

  if (disciplineCode === "EE") {
    basketTotalCredits["Discipline Core Courses"] = 43;
    basketTotalCredits["Discipline Electives"] = 24;
  }
  
  if (disciplineCode === "ICDT") {
    basketTotalCredits["Discipline Core Courses"] = 44;
    basketTotalCredits["Discipline Electives"] = 24;
  }

  if (disciplineCode === "MSE") {
    basketTotalCredits["Discipline Core Courses"] = 42;
    basketTotalCredits["Discipline Electives"] = 24;
  }

  if (disciplineCode === "ME") {
    basketTotalCredits["Discipline Core Courses"] = 44;
    basketTotalCredits["Discipline Electives"] = 24;
  }

function Card({basket, onClick, selectedBasket}) {
  
  const basketCourses = completedCourses[basket] || [];

  const completedCredits = basketCourses.length > 0 ? 
  basketCourses.map(course => Number(course.credits)).reduce((acc, credits) => acc + credits, 0) : 0;
  
  const percentage = (completedCredits/basketTotalCredits[basket])*100;
  let rounded = percentage.toFixed(2);

  let colour;
  if (percentage < 30) {
    colour = "bg-red-400";
  } else if (percentage < 70) {
    colour = "bg-amber-400";
  } else if (percentage < 99) {
    colour = "bg-blue-400";
  } else {
    colour = "bg-emerald-400";
  }
  
  return( <div onClick={onClick} className={`bg-white border border-slate-600 border-2 w-full rounded-xl 
  overflow-hidden hover:shadow-lg flex flex-col items-center hover:-translate-y-[2px] 
  ${selectedBasket === basket ? "ring-3 ring-indigo-300 shadow-xl" : ""} transition-all duration-150 cursor-pointer`}>

    <p className="text-center text-sm md:text-lg bg-slate-600 w-full text-white py-1 px-1 hidden sm:block">{basket}</p>
    <p className="text-center text-sm md:text-lg bg-slate-600 w-full text-white py-1 px-1 sm:hidden">{basket === "Institute level Courses" ? "Institute level" : basket === "Discipline Core Courses" ? "Discipline Core" : basket }</p>
    <div className="rounded-t-xl w-full h-full flex flex-col items-center py-5 px-3">
    <div className="w-full max-w-50 mt-auto mb-3 h-4 bg-slate-300 rounded-full overflow-hidden">
  <div
    className={`h-full ${percentage >= 100 ? "rounded-full" : "rounded-l-full"} ${colour}`}
    style={{
      width: `${percentage}%`,
      
    }}
  />
</div>
    
    <div className="text-sm md:text-base">{completedCredits}/{basketTotalCredits[basket]} Credits</div>
    </div>
  </div>
  );
}

function BasketDetails({basket}) {

  const completedBasketCourses = completedCourses[basket] || [];
  
  const completedCredits = completedBasketCourses.length > 0 ? 
  completedBasketCourses.map(course => 
    Number(course.credits)).reduce((acc, credits) => acc + credits, 0) : 0;
  
  const basketCourses = courses[basket] || [];
  const remainingCredits = basketTotalCredits[basket] - completedCredits;
  let remaining = basketCourses.filter(
  course =>
    !completedBasketCourses.some(
      completed => completed.course_code === course.course_code
    )
);
  return( <>
    <h1 className="mt-3 text-2xl font-semibold">{basket}</h1>
    <div className="bg-slate-50 p-2 md:p-3 rounded-lg border my-3">
    <h2 className="text-emerald-700 font-medium">Credits completed: {completedCredits} / {basketTotalCredits[basket]}</h2>
    <h2 className="text-amber-700 font-medium">Credits remaining: {remainingCredits}</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 mt-2 gap-3 ">
    <div className="w-full overflow-x-auto">
    
    <table className={`bg-white rounded-lg w-full overflow-hidden table-fixed ${!completedCourses[basket]?.length > 0 ? "" : "min-w-130"}`}>
  <colgroup>
    <col className="w-18" />
    <col />
    <col className="w-17" />
    <col className="w-16" />
  </colgroup>
      <thead >
        <tr>
          <th colSpan={4} className="bg-slate-600 text-white">Completed Courses</th>
        </tr>
      <tr className="bg-slate-600 text-white">
        <th className="text-md md:text-base">Code</th>
        <th >Course</th>
        <th >Credits</th>
        <th >Grade</th>
      </tr>
      </thead>
      <tbody>
        {completedCourses[basket]?.length > 0 ? 
  completedCourses[basket].map((course, idx) => <tr key = {idx}>
    <td className="text-center text-sm md:text-base">{course.course_code || "TBD"}</td>
    <td className="md:!px-3 md:!py-4 text-sm md:text-base">{course.name || "TBD"}</td>
    <td className="text-center text-sm md:text-base">{course.credits || "TBD"}</td>
    <td className=" text-center text-sm md:text-base">{course.grade}</td>
  </tr> ) : <tr><td className="text-center text-sm md:text-base" colSpan={4}>No courses completed yet</td></tr>}
    </tbody>
    </table>
    </div>
    <div className="w-full overflow-x-auto">
    
    <table className={`bg-white rounded-lg overflow-hidden table-fixed w-full ${remaining.length > 0 ? "min-w-130" :""}`}>
      <colgroup>
    <col className="w-19" />
    <col />
    <col className="w-18" />
    
  </colgroup>
      <thead>
        <tr>
          <th colSpan={3} className="bg-slate-600 text-white">Remaining Courses</th>
        </tr>
      <tr className="bg-slate-600 text-white">
        <th className="w-23">Code</th>
        <th>Name</th>
        <th className="w-20">Credits</th>
      </tr>
      </thead>
      <tbody>
        {remaining.length > 0 ? 
  remaining.map((course, idx) => <tr key = {idx}>
    <td className="text-center w-20 text-sm md:text-base">{course.course_code || "TBD"}</td>
    <td className="md:!px-3 md:!py-3 text-sm md:text-base">{course.name || "TBD"}</td>
    <td className=" text-center text-sm md:text-base">{course.credits || "TBD"}</td>
  </tr> ) : <tr><td className="text-center text-sm md:text-base" colSpan={3}>No courses remaining</td></tr>}
    </tbody>
    </table>
    </div>
  </div>
  </>
  );
}

  return (
  <div className="lg:ml-55 xl:ml-60">
    <div className="mx-3 lg:ml-0 xl:ml-0 xl:mr-7">

      <div className="pseudo hidden md:block"></div>
    <h1 className="text-3xl font-extrabold py-3 tracking-tight font-[Manrope]">Basket Tracking</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 sm:gap-3 gap-2">
        {baskets.map(basket => 
          <Card key={basket} onClick={() => setSelectedBasket(basket)} basket={basket} selectedBasket={selectedBasket}/>
        )}
      </div>
      <BasketDetails basket={selectedBasket}/>
      </div>
    </div>);
}
export default BasketTracking;