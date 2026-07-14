import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavLink, Outlet, useOutletContext } from "react-router-dom";

import Dashboard from "./pages/Dashboard"
import BasketTracking from "./pages/BasketTracking"
import SemesterPlanning from "./pages/SemesterPlanning"
import CourseHistory from "./pages/CourseHistory"
import SemHistory from './pages/SemHistory';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Registration from './pages/Registration';

export default function App() {

  function AppLayout() {
    const context = useOutletContext();
    return( <>
    <nav className="bg-[rgba(0,0,0,0.784)] m-0 flex fixed  top-0 flex-col md:flex-row lg:flex-col text-white h-full md:justify-center md:h-auto md:w-full lg:w-fit lg:h-full navbar">
      <NavLink
        className={({ isActive }) =>
    `links shadow flex-shrink-0 ${
      isActive ? "bg-blue-500" : ""
    }`}
        to="/">
        DASHBOARD 
      </NavLink>

      <NavLink 
        className={({ isActive }) =>
    `links shadow flex-shrink-0 ${
      isActive ? "bg-blue-500" : ""
    }`}

        to="/basket-tracking">
        BASKET TRACKING
      </NavLink>

      <NavLink 
        className={({ isActive }) =>
    `links shadow flex-shrink-0 ${
      isActive ? "bg-blue-500" : ""
    }`}
        
        to="/semester-planning">
        SEMESTER PLANNING
      </NavLink>

      <NavLink 
        className={({ isActive }) =>
    `links shadow flex-shrink-0 ${
      isActive ? "bg-blue-500" : ""
    }`}
        to="/course-history">
        COURSE HISTORY
      </NavLink>
      </nav>
      <Outlet context={context}/>
      </>

    )
  }
  return (
  <BrowserRouter >
      <Routes >
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Registration/>}/>
          <Route element={<ProtectedRoute/>}>
            <Route element={<AppLayout/>}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/basket-tracking" element={<BasketTracking />} />
              <Route path="/semester-planning" element={<SemesterPlanning />} />
              <Route path="/course-history" element={<CourseHistory />} > 
                <Route path=":semId" element={<SemHistory />}/>
              </Route>
            </Route>
          </Route>
      </Routes>
    </BrowserRouter>
);
}

