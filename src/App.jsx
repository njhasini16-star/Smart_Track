import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { NavLink } from "react-router-dom";

import Dashboard from "./Dashboard"
import BasketTracking from "./BasketTracking"
import SemesterPlanning from "./SemesterPlanning"
import CourseHistory from "./CourseHistory"
import SemHistory from './SemHistory';

export default function App() {

  return (
  <BrowserRouter >
      <nav className="bg-[rgba(0,0,0,0.784)] m-0 flex fixed  top-0 flex-col md:flex-row lg:flex-col text-white h-full md:justify-center md:h-auto md:w-full lg:w-fit lg:h-full navbar">
          <NavLink
          className="links shadow flex-shrink-0" 
          style={({isActive}) => ({backgroundColor: isActive ? "whitesmoke" : "",
            color: isActive ? "black" : "",})}
          to="/">
          DASHBOARD 
          </NavLink>

          <NavLink 
          className="links shadow flex-shrink-0" 
          style={({isActive}) => ({backgroundColor: isActive ? "whitesmoke" : "",
            color: isActive ? "black" : "",})}
          to="/basket-tracking">
          BASKET TRACKING
          </NavLink>

          <NavLink 
          className="links shadow flex-shrink-0" 
          style={({isActive}) => ({backgroundColor: isActive ? "whitesmoke" : "",
            color: isActive ? "black" : "",})}
          to="/semester-planning">
          SEMESTER PLANNING
          </NavLink>

          <NavLink 
          className="links shadow flex-shrink-0" 
          style={({isActive}) => ({backgroundColor: isActive ? "whitesmoke" : "",
            color: isActive ? "black" : "",})}
          to="/course-history">
          COURSE HISTORY
          </NavLink>
      </nav>

      <Routes >
        <Route path="/" element={<Dashboard />} />
        <Route path="/basket-tracking" element={<BasketTracking />} />
        <Route path="/semester-planning" element={<SemesterPlanning />} />
        <Route path="/course-history" element={<CourseHistory />} > 
          <Route path=":semId" element={<SemHistory/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
);
}

