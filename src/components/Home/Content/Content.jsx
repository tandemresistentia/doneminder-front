import React from 'react'
import './Content.css'
import Overview from './Overview/Overview'
import Calendar from './Calendar/Calendar'
import Newtask from './Overview/NewTask/Newtask'
const Content = ({ showOverview, showCalendar,toggleNewtask,showNewtask }) => {
  
  return (
    <div className="app-content">
      {showOverview && <Overview  toggleNewtask={toggleNewtask} showNewtask={showNewtask}/>}
      {showCalendar && <Calendar />}
      {showNewtask && <Newtask       toggleNewtask={toggleNewtask} showNewtask={showNewtask}/>}
    </div>
  );
};

export default Content;

