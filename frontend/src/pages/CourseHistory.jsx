import { Outlet, NavLink, useOutletContext, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

function CourseHistory() {
  const context = useOutletContext(); 
  const {currentSem} = useOutletContext();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    if (location.pathname === "/course-history") {
      navigate(`/course-history/${currentSem - 1}`, { replace: true });
    }
  }, [currentSem, location.pathname, navigate]);

  return (<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    <div className="pseudo"></div>
    <div className="lg:ml-55">
      <h1 className="text-3xl font-bold p-2">Course-History</h1>
      <div className="flex m-5 lg:flex-col">
      <nav className="timeline inline-flex flex-col lg:flex-row items-center w-fit absolute" style={{ "--progress": `${((currentSem - 1) / 7) * 100}%` }}>
        {Array.from({ length: 8 }, (_, i) => {
  const semester = i + 1;
  const isFuture = semester >= currentSem;

  return isFuture ? (
    <div
      key={semester}
      className="sem-link sem-link-future"
    >
      Sem{semester}
    </div>
  ) : (
    <NavLink
      key={semester}
      to={`/course-history/${semester}`}
      className={`sem-link ${
        semester === currentSem ? "sem-link-current" : ""
      }`}
    >
      Sem{semester}
    </NavLink>
  );
})}
      </nav>
      <div className="inline-flex lg:block h-fit w-fit ">
        <Outlet context={context} />
      </div>
      </div>
    </div>
    </div>);
}
export default CourseHistory;