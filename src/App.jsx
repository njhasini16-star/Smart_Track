import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { NavLink } from "react-router-dom";

import Dashboard from "./Dashboard"
import BasketTracking from "./BasketTracking"
import SemesterPlanning from "./SemesterPlanning"
import CourseHistory from "./CourseHistory"

export default function App() {

  return (
  <BrowserRouter >
      <nav className="bg-[rgba(0,0,0,0.784)] m-0 flex fixed  top-0 flex-col md:flex-row text-white h-full md:justify-center md:h-auto md:w-full">
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
          to="/BasketTracking">
          BASKET TRACKING
          </NavLink>

          <NavLink 
          className="links shadow flex-shrink-0" 
          style={({isActive}) => ({backgroundColor: isActive ? "whitesmoke" : "",
            color: isActive ? "black" : "",})}
          to="/SemesterPlanning">
          SEMESTER PLANNING
          </NavLink>

          <NavLink 
          className="links shadow flex-shrink-0" 
          style={({isActive}) => ({backgroundColor: isActive ? "whitesmoke" : "",
            color: isActive ? "black" : "",})}
          to="/CourseHistory">
          COURSE HISTORY
          </NavLink>
      </nav>

      <Routes >
        <Route path="/" element={<Dashboard />} />
        <Route path="/BasketTracking" element={<BasketTracking />} />
        <Route path="/SemesterPlanning" element={<SemesterPlanning />} />
        <Route path="/CourseHistory" element={<CourseHistory />} />
      </Routes>
    </BrowserRouter>
  
);
}

