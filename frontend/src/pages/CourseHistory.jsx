import { Outlet, NavLink, useOutletContext, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

function CourseHistory() {
  const context = useOutletContext(); 
  const {currentSem} = useOutletContext();
  const navigate = useNavigate();
  const location = useLocation();
  const activeChipRef = useRef(null);
  
  useEffect(() => {
    if (location.pathname === "/course-history") {
      navigate(`/course-history/${currentSem - 1}`, { replace: true });
    }
  }, [currentSem, location.pathname, navigate]);

  useEffect(() => {
  activeChipRef.current?.scrollIntoView({
    behavior: 'smooth',
    inline: 'center', 
    block: 'nearest'  
  });
}, [location]);

  return ( <>
    <div className="pseudo hidden md:block"></div>
    <div className="lg:ml-55">
      <h1 className="text-3xl font-extrabold p-2 tracking-tight font-[Manrope] mx-2">Course History</h1>
      <div className="flex m-3 flex-col">
        <div className="w-full overflow-x-auto p-2 pb-4 pt-3">
      <nav className="timeline inline-flex flex-row items-center w-fit absolute" style={{ "--progress": `${((currentSem - 1) / 7) * 100}%` }}>
        {Array.from({ length: 8 }, (_, i) => {
  const semester = i + 1;
  const isFuture = semester >= currentSem;

  return isFuture ? (
    <div
      key={semester}
      className="sem-link !text-base sem-link-future"
    >
      S{semester}
    </div>
  ) : (
    <NavLink
      key={semester}
      ref={"/course-history/" + semester === location.pathname  ? activeChipRef : null}
      to={`/course-history/${semester}`}
      className={`sem-link !text-base ${
        "/course-history/" + semester === location.pathname ? "sem-link-current" : ""
      }`}
    >
      S{semester}
    </NavLink>
  );
})}
      </nav>
      </div>
      <div className="inline-flex lg:block h-fit w-full ">
        <Outlet context={context} />
      </div>
      </div>
    </div>
    </>);
}
export default CourseHistory;