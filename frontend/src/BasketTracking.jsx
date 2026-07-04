import { useState, useEffect } from "react";
import { getAllCompletedCourses } from "./api/completedCourses";
import { getCourses } from "./api/courses";

function BasketTracking({discipline}) {

  const [selectedBasket, setSelectedBasket] = useState("Discipline Electives");
  const [courses, setCourses] = useState({});
  const [completedCourses, setCompletedCourses] = useState({});

async function  fetchCourses(discipline) {
  try {
  let data = await getCourses();

  data = data.filter(course => !course.discipline || course.discipline === discipline)
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
  {fetchBasketWiseCourses();
    fetchCourses(discipline);
  },
[discipline])

const baskets = ["Institute level Courses", "Discipline Core Courses", "Discipline Electives",
  "Open Electives", "Science Basket", "Math Basket", "Materials Basket", "HSS Basket"
]

const basketTotalCredits = {"Institute level Courses":31, 
  "Open Electives":20, "Science Basket":8, "Math Basket":10, 
  "Materials Basket":3, "HSS Basket":20};

  if (discipline === "AI") {
    basketTotalCredits["Discipline Core Courses"] = 44;
    basketTotalCredits["Discipline Electives"] = 24;
  }

  if (discipline === "CL") {
    basketTotalCredits["Discipline Core Courses"] = 42;
    basketTotalCredits["Discipline Electives"] = 24;
  }

  if (discipline === "CE") {
    basketTotalCredits["Discipline Core Courses"] = 42;
    basketTotalCredits["Discipline Electives"] = 24;
  }

  if (discipline === "CSE") {
    basketTotalCredits["Discipline Core Courses"] = 36;
    basketTotalCredits["Discipline Electives"] = 30;
  }

  if (discipline === "EE") {
    basketTotalCredits["Discipline Core Courses"] = 43;
    basketTotalCredits["Discipline Electives"] = 24;
  }
  
  if (discipline === "ICDT") {
    basketTotalCredits["Discipline Core Courses"] = 44;
    basketTotalCredits["Discipline Electives"] = 24;
  }

  if (discipline === "MSE") {
    basketTotalCredits["Discipline Core Courses"] = 42;
    basketTotalCredits["Discipline Electives"] = 24;
  }

  if (discipline === "ME") {
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
    colour = "red";
  } else if (percentage < 70) {
    colour = "orange";
  } else if (percentage < 99) {
    colour = "blue";
  } else {
    colour = "green";
  }
  
  return( <div onClick={onClick} className={`bg-indigo-100 w-full p-6 rounded-lg hover:shadow-lg ${selectedBasket === basket ? "ring-3 ring-indigo-400 shadow-xl" : ""}`}>
    <p className="text-center mb-3 text-xl font-semibold">{basket}</p>
    <div className="text-lg mb-1">{rounded}% Completed</div>

    <div className={`inline-flex h-4 flex-shrink-0 ${percentage >= 100 ? "rounded-full" : "rounded-l-full"}`} 
    style={{width:`${((completedCredits/basketTotalCredits[basket])*45)*4}px`, backgroundColor:`${colour}`}}></div>

    <div className={`inline-flex bg-slate-300 h-4 flex-shrink-0 mr-2 ${percentage === 0 ? "rounded-full" : "rounded-r-full"}`} style={{width:`${(45-(completedCredits/basketTotalCredits[basket])*45)*4}px`}}></div>
    <div >{completedCredits}/{basketTotalCredits[basket]} Credits</div>
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
    <p className="mb-2">Completed Courses</p>
    <table className="bg-emerald-50 rounded-lg w-full overflow-hidden table-auto">
      <thead >
      <tr className="bg-emerald-200">
        <th className="w-23">Code</th>
        <th>Name</th>
        <th className="w-20">Credits</th>
        <th className="w-18">Grade</th>
      </tr>
      </thead>
      <tbody>
        {completedCourses[basket]?.length > 0 ? 
  completedCourses[basket].map((course, idx) => <tr key = {idx}>
    <td className="whitespace-nowrap !px-4 !py-3 text-center">{course.course_code}</td>
    <td className="!px-4 !py-3">{course.name}</td>
    <td className="!px-4 !py-3 text-center">{course.credits}</td>
    <td className="!px-4 !py-3 text-center">{course.grade}</td>
  </tr> ) : <tr><td className="text-center" colSpan={4}>No courses completed yet</td></tr>}
    </tbody>
    </table>
    </div>
    <div className="w-full">
    <p className="mb-2">Remaining Courses</p>
    <table className="bg-amber-50 rounded-lg overflow-hidden table-fixed w-full">
      <thead>
      <tr className="bg-amber-200 rounded-t-lg">
        <th className="rounded-tl-lg w-23">Code</th>
        <th>Name</th>
        <th className="rounded-tr-lg w-20">Credits</th>
      </tr>
      </thead>
      <tbody>
        {remaining.length > 0 ? 
  remaining.map((course, idx) => <tr key = {idx}>
    <td className="whitespace-nowrap !px-4 !py-3 text-center">{course.course_code}</td>
    <td className="!px-4 !py-3 ">{course.name}</td>
    <td className="!px-4 !py-3 text-center">{course.credits}</td>
  </tr> ) : <tr><td className="text-center" colSpan={3}>No courses remaining</td></tr>}
    </tbody>
    </table>
    </div>
  </div>
  </>
  );
}

  return (<div className="lg:ml-55 xl:ml-60">
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
    </div>);
}
export default BasketTracking;