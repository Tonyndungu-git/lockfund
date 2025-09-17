import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { RxDashboard } from 'react-icons/rx';
import { CiViewList } from "react-icons/ci";
import { IoMdLogOut } from 'react-icons/io';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  const linkClasses = "flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-200";
  const activeLinkClasses = "bg-gray-300";

  return (
    <aside className="w-64 h-screen p-4 bg-white border-r">
      <h1 className="text-2xl font-bold text-indigo-600">LockFund</h1>
      <nav className="mt-8">
        <NavLink 
          to="/" 
          className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
        >
          <RxDashboard className="mr-3" /> Dashboard
        </NavLink>
        <NavLink 
          to="/schedules" 
          className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''} mt-2`}
        >
          <CiViewList className="mr-3" /> Schedules
        </NavLink>
        
        <button onClick={handleLogout} className={`${linkClasses} mt-4 w-full text-left`}>
          <IoMdLogOut className="mr-3" /> Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
