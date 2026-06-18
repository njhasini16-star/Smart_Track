import { useBasketWise } from "./basketWiseStore.jsx";
import CourseInfo from "./CourseInfo.jsx"

const courses = CourseInfo();
function Card({basket, basketWise, basketCredits}) {
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
  
  return( <div className="bg-indigo-100 w-full p-6 rounded-lg hover:shadow-lg">
    <p className="text-center mb-3 text-xl font-semibold">{basket}</p>
    <div className="text-lg mb-1">{rounded}% Completed</div>
    <div className="inline-flex bg-green-500 h-4 flex-shrink-0" style={{width:`${((completedCredits/basketCredits)*35)*4}px`, backgroundColor:`${colour}`}}></div>
    <div className="inline-flex bg-slate-300 h-4 flex-shrink-0 mr-2" style={{width:`${(35-(completedCredits/basketCredits)*35)*4}px`}}></div>
    <div >{completedCredits}/{basketCredits} Credits</div>
    
    
  </div>
  );
}


function BasketTracking() {
  const { basketWise } = useBasketWise();
  console.log(basketWise);
  return (<div className="lg:ml-60">
    <div className="pseudo"></div>
    <h1>Basket-Tracking</h1>
      {/* <ul>
        {basketWise["Open Electives"]?.map(c => (
          <li key={c.code}>{c.code} - {c.name}</li>
        ))}
      </ul> */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 md:gap-3 sm:gap-6 mx-4 gap-4 md:mx-10">
      <Card basket={"Open Electives"} basketWise={basketWise} basketCredits={20}/>
      <Card basket={"Institute level Courses"} basketWise={basketWise} basketCredits={31}/>
      <Card basket={"Discipline Core Courses"} basketWise={basketWise} basketCredits={30}/>
      <Card basket={"Discipline Electives"} basketWise={basketWise} basketCredits={36}/>
      <Card basket={"Science Basket"} basketWise={basketWise} basketCredits={8}/>
      <Card basket={"Math Basket"} basketWise={basketWise} basketCredits={10}/>
      <Card basket={"Materials Basket"} basketWise={basketWise} basketCredits={3}/>
      <Card basket={"HSS Basket"} basketWise={basketWise} basketCredits={20}/>
      </div>
    </div>);
}
export default BasketTracking;