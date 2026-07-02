import { Outlet, NavLink } from "react-router-dom";

function CourseHistory({currentSem}) {
  console.log(currentSem)
  return (
    <div className="lg:ml-55">
      {/* <div className="pseudo"></div> */}
      <h1 className="mt-13">Course-History</h1>
      <div className="flex m-5 lg:flex-col">
      <nav className="timeline inline-flex flex-col lg:flex-row items-center w-fit absolute" style={{ "--progress": `${((currentSem - 1) / 7) * 100}%` }}>
        {Array.from({ length: 8 }, (_, i) => (
  <NavLink
    key={i + 1}
    className={`sem-link ${currentSem == i+1 ? "sem-link-current" : currentSem < i+1 ? "sem-link-future" : "" }`}
    to={`/course-history/${i + 1}`}>
    Sem{i + 1}
  </NavLink>
))}
      </nav>
      <div className="inline-flex lg:block h-fit w-fit bg-gray-300 ">
        <Outlet/>
      </div>
      </div>
    </div>);
}
export default CourseHistory;