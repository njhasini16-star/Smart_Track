import DonutChart from "./DonutChart";
import SemSummary from "./SemSumTable";
import AcademicProgress from "./AcademicProgress";

function Dashboard() {
  const sem1 = {sem:1, credits:24, gpa:8.15, highlights:"none"};
  const sem2 = {sem:2, credits:26, gpa:8.09, highlights:"none"};
  return (<>
    <div className="pseudo w-auto"></div>
    <h1 className="w-auto bg-red-200 p-2 lg:ml-51">Smart Track Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 m-2 lg:w-3/4 lg:ml-auto lg:mr-8">
    <DonutChart completed={30} remaining={30} pending={18}/>  
    <AcademicProgress core={20} electives={10} baskets={26} cgpa={8.12}/>
    <SemSummary args={[sem1,sem2]}/>
    </div>
    </>
    );
}
export default Dashboard;