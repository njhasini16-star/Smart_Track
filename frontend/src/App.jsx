import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavLink, Outlet, useOutletContext } from "react-router-dom";
import { LayoutDashboard, ListChecks, CalendarDays, History } from "lucide-react";

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
    <nav className={`
       md:flex md:flex-row md:h-fit md:w-full md:top-0 
       lg:flex-col lg:h-full lg:w-fit md:translate-x-0 
       bg-[rgba(0,0,0,0.784)] m-0 flex fixed bottom-0 w-full
       md:justify-center justify-evenly text-white h-fit
       z-100 lg:gap-2 lg:top-0 shadow-lg`}>

      <NavLink
        className={({ isActive }) =>
    `links shadow flex flex-col md:flex-row p-2 md:p-4 gap-1 ${
      isActive ? "bg-blue-500" : ""
    }`}
        to="/">
          <div className='md:inline-block'>
          <LayoutDashboard size={20} strokeWidth={2.2} />
          </div>
        <div className='text-[10px] sm:text-xs md:text-[14px]'>DASHBOARD </div>
      </NavLink>

      <NavLink 
        className={({ isActive }) =>
    `links shadow flex flex-col md:flex-row p-2 md:p-4 gap-1 ${
      isActive ? "bg-blue-500" : ""
    }`}

        to="/basket-tracking">
          <div className='md:inline-block'>
          <ListChecks size={20} strokeWidth={2.2} />
          </div>
        <div className='text-[10px] sm:text-xs md:text-[14px]'>BASKET TRACKING </div>
      </NavLink>

      <NavLink 
        className={({ isActive }) =>
    `links shadow flex flex-col md:flex-row p-2 md:p-4 gap-1 ${
      isActive ? "bg-blue-500" : ""
    }`}
        
        to="/semester-planning">
          <div className='md:inline-block'>
          <CalendarDays size={20} strokeWidth={2.2}/>
          </div>
        <div className='text-[10px] sm:text-xs md:text-[14px]'>SEMESTER PLANNING</div>
      </NavLink>

      <NavLink 
        className={({ isActive }) =>
    `links shadow flex flex-col md:flex-row p-2 md:p-4 gap-1 ${
      isActive ? "bg-blue-500" : ""
    }`}
        to="/course-history">
          <div className='md:inline-block'>
          <History size={20} strokeWidth={2.2} />
          </div>
        <div className='text-[10px] sm:text-xs md:text-[14px]'>COURSE HISTORY</div>
      </NavLink>
      </nav>
      <main className="pb-18 overflow-y-auto min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Outlet context={context}/>
      </main>
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