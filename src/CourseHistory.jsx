import { Outlet, NavLink } from "react-router-dom";

function CourseHistory() {
  return (
    <div className="lg:ml-55">
      {/* <div className="pseudo"></div> */}
      <h1 className="mt-13">Course-History</h1>
      <div className="flex m-5 lg:flex-col">
      <nav className="timeline inline-flex flex-col lg:flex-row items-center w-fit absolute bg-green-100">
        <NavLink className="sem-link" to="/course-history/semester-1">Sem1</NavLink>
        <NavLink className="sem-link" to="/course-history/semester-2">Sem2</NavLink>
        <NavLink className="sem-link" to="/course-history/semester-3">Sem3</NavLink>
        <NavLink className="sem-link" to="/course-history/semester-4">Sem4</NavLink>
        <NavLink className="sem-link" to="/course-history/semester-5">Sem5</NavLink>
        <NavLink className="sem-link" to="/course-history/semester-6">Sem6</NavLink>
        <NavLink className="sem-link" to="/course-history/semester-7">Sem7</NavLink>
        <NavLink className="sem-link" to="/course-history/semester-8">Sem8</NavLink>
      </nav>
      <div className="inline-flex lg:block h-fit w-fit bg-gray-300 ">
        <Outlet/>
      </div>
      </div>
    </div>);
}
export default CourseHistory;