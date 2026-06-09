import DonutChart from "./DonutChart";
import SemSummary from "./SemSumTable";

function Dashboard() {
  const sem1 = {sem:1, credits:24, gpa:8.15, highlights:"none"};
  const sem2 = {sem:2, credits:26, gpa:8.09, highlights:"none"};
  return (<div>
    <div className="pseudo"></div>
    <h1>Dashboard</h1>
    <DonutChart completed={30} remaining={30} pending={18}/>
    <div>
      <SemSummary args={[sem1,sem2]}/>
    </div>
    </div>);
}
export default Dashboard;