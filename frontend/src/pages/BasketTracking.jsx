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
  
  return( <div onClick={onClick} className={`bg-white border border-slate-600 border-2 w-full rounded-xl overflow-hidden hover:shadow-lg flex flex-col items-center hover:-translate-y-[2px] ${selectedBasket === basket ? "ring-3 ring-indigo-300 shadow-xl" : ""} transition-all duration-150 cursor-pointer`}>
    <p className="text-center mb-3 text-lg bg-slate-600 w-full text-white py-1">{basket}</p>
    <div className="rounded-t-xl w-full h-full flex flex-col items-center p-5 pt-3s">
    <div className="w-full max-w-50 mt-auto mb-3 h-4 bg-slate-300 rounded-full overflow-hidden">
  <div
    className={`h-full ${percentage >= 100 ? "rounded-full" : "rounded-l-full"} ${colour}`}
    style={{
      width: `${percentage}%`,
      
    }}
  />
</div>
    
    <div >{completedCredits}/{basketTotalCredits[basket]} Credits</div>
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
    <div className="bg-slate-50 p-3 rounded-lg border my-3">
    <h2 className="text-emerald-700 font-medium">Credits completed: {completedCredits} / {basketTotalCredits[basket]}</h2>
    <h2 className="text-amber-700 font-medium">Credits remaining: {remainingCredits}</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 mt-2 gap-3 ">
    <div className="w-full">
    
    <table className="bg-white rounded-lg w-full overflow-hidden table-fixed">
  <colgroup>
    <col className="w-18" />
    <col />
    <col className="w-17" />
    <col className="w-16" />
  </colgroup>
      <thead >
        <tr>
          <th colspan={4} className="bg-slate-600 text-white">Completed Courses</th>
        </tr>
      <tr className="bg-slate-600 text-white">
        <th >Code</th>
        <th>Course</th>
        <th >Credits</th>
        <th >Grade</th>
      </tr>
      </thead>
      <tbody>
        {completedCourses[basket]?.length > 0 ? 
  completedCourses[basket].map((course, idx) => <tr key = {idx}>
    <td className="text-center">{course.course_code}</td>
    <td className="!px-3 !py-4">{course.name}</td>
    <td className="text-center">{course.credits}</td>
    <td className=" text-center">{course.grade}</td>
  </tr> ) : <tr><td className="text-center" colSpan={4}>No courses completed yet</td></tr>}
    </tbody>
    </table>
    </div>
    <div className="w-full">
    
    <table className="bg-white rounded-lg overflow-hidden table-fixed w-full">
      <colgroup>
    <col className="w-18" />
    <col />
    <col className="w-18" />
    
  </colgroup>
      <thead>
        <tr>
          <th colspan={3} className="bg-slate-600 text-white">Remaining Courses</th>
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
    <td className="text-center w-20">{course.course_code}</td>
    <td className="!px-3 !py-3 ">{course.name}</td>
    <td className=" text-center">{course.credits}</td>
  </tr> ) : <tr><td className="text-center" colSpan={3}>No courses remaining</td></tr>}
    </tbody>
    </table>
    </div>
  </div>
  </>
  );
}

  return (<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
  <div className="lg:ml-55 xl:ml-60">
    <div className="mx-3 lg:ml-0 xl:ml-0 xl:mr-7">
    <div className="pseudo"></div>
    <h1 className="text-3xl font-bold my-3">Basket-Tracking</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 md:gap-3 sm:gap-6 gap-4">
        {baskets.map(basket => 
          <Card key={basket} onClick={() => setSelectedBasket(basket)} basket={basket} selectedBasket={selectedBasket}/>
        )}
      </div>
      <BasketDetails basket={selectedBasket}/>
      </div>
    </div>
    </div>);
}
export default BasketTracking;