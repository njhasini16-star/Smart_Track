import DonutChart from "./DonutChart";

function Dashboard() {
  return (<div>
    <div className="pseudo"></div>
    <h1>Dashboard</h1>
    <DonutChart completed={60} remaining={30} pending={18}/>
    </div>);
}
export default Dashboard;