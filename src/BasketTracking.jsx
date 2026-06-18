import { useBasketWise } from "./basketWiseStore.jsx";
import CourseInfo from "./CourseInfo.jsx"
import { useState } from "react";

const courses = CourseInfo("CSE");

const basketTotalCredits = {"Institute level Courses":31, "Discipline Core Courses":30, 
  "Discipline Electives":30, "Open Electives":20, "Science Basket":8, "Math Basket":10, 
  "Materials Basket":3, "HSS Basket":20};

function Card({basket, basketWise, basketCredits, onClick, selectedBasket}) {

  const completedCredits = basketWise[basket].length > 0 ? 
  basketWise[basket].map(course => Number(course.credits)).reduce((acc, credits) => acc + credits, 0) : 0;
  const percentage = (completedCredits/basketCredits)*100;
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
    style={{width:`${((completedCredits/basketCredits)*45)*4}px`, backgroundColor:`${colour}`}}></div>

    <div className={`inline-flex bg-slate-300 h-4 flex-shrink-0 mr-2 ${percentage === 0 ? "rounded-full" : "rounded-r-full"}`} style={{width:`${(45-(completedCredits/basketCredits)*45)*4}px`}}></div>
    <div >{completedCredits}/{basketCredits} Credits</div>
  </div>
  );
}

function BasketDetails({basket, basketWise}) {
  const completedCredits = basketWise[basket].length > 0 ? 
  basketWise[basket].map(course => Number(course.credits)).reduce((acc, credits) => acc + credits, 0) : 0;
  const remainingCredits = basketTotalCredits[basket] - completedCredits;
  let remaining = courses[basket].filter(
  course =>
    !basketWise[basket].some(
      completed => completed.code === course.code
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
        {basketWise[basket]?.length > 0 ? 
  basketWise[basket].map((course, idx) => <tr key = {idx}>
    <td className="whitespace-nowrap !px-4 !py-3 text-center">{course.code}</td>
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
    <td className="whitespace-nowrap !px-4 !py-3 text-center">{course.code}</td>
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

function BasketTracking() {
  const { basketWise } = useBasketWise();
  console.log(basketWise);

  const [selectedBasket, setSelectedBasket] = useState("Discipline Electives");

  return (<div className="lg:ml-55 xl:ml-60">
    <div className="mx-3 lg:ml-0 xl:ml-0 xl:mr-7">
    <div className="pseudo"></div>
    <h1 className="text-3xl font-bold my-3">Basket-Tracking</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 md:gap-3 sm:gap-6 gap-4">
      <Card onClick={() => setSelectedBasket("Open Electives")} basket={"Open Electives"} basketWise={basketWise} basketCredits={20} selectedBasket={selectedBasket}/>
      <Card onClick={() => setSelectedBasket("Institute level Courses")} basket={"Institute level Courses"} basketWise={basketWise} basketCredits={31} selectedBasket={selectedBasket}/>
      <Card onClick={() => setSelectedBasket("Discipline Core Courses")} basket={"Discipline Core Courses"} basketWise={basketWise} basketCredits={30} selectedBasket={selectedBasket}/>
      <Card onClick={() => setSelectedBasket("Discipline Electives")} basket={"Discipline Electives"} basketWise={basketWise} basketCredits={36} selectedBasket={selectedBasket}/>
      <Card onClick={() => setSelectedBasket("Science Basket")} basket={"Science Basket"} basketWise={basketWise} basketCredits={8} selectedBasket={selectedBasket}/>
      <Card onClick={() => setSelectedBasket("Math Basket")} basket={"Math Basket"} basketWise={basketWise} basketCredits={10} selectedBasket={selectedBasket}/>
      <Card onClick={() => setSelectedBasket("Materials Basket")} basket={"Materials Basket"} basketWise={basketWise} basketCredits={3} selectedBasket={selectedBasket}/>
      <Card onClick={() => setSelectedBasket("HSS Basket")} basket={"HSS Basket"} basketWise={basketWise} basketCredits={20} selectedBasket={selectedBasket}/>
      </div>
      <BasketDetails basket={selectedBasket} basketWise={basketWise}/>
      </div>
    </div>);
}
export default BasketTracking;