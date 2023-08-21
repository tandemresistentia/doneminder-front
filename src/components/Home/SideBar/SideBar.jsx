import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { formatDistanceToNow } from 'date-fns';

import './SideBar.css';
import Logo from '../../../assets/Home/logo.png'
import BASE_URL from '../../config'
import Weather from './Weather/weather.jsx';
/* ----------------Images --------------*/
import Calendar from '../../../assets/Home/SideBar/calendar.png'
import Overview from '../../../assets/Home/SideBar/overview.png'
import OverviewOn from '../../../assets/Home/SideBar/overview-on.png'
import CalendarOn from '../../../assets/Home/SideBar/calendar-on.png'
import TickMark from '../../../assets/Home/SideBar/tick-mark.png'
import Award from '../../../assets/Home/SideBar/award.png'
/* ----------------Images --------------*/
const SideBar = ({toggleOverview,toggleCalendar}) => {
    /* ----------------Overview and Calendar State --------------*/
  const [isOverviewPressed, setIsOverviewPressed] = useState(true);
  const [isCalendarPressed, setIsCalendarPressed] = useState(false);

    const toggleOverviewOn = () => {
    setIsOverviewPressed(true);
    setIsCalendarPressed(false);
    toggleOverview();
  };

  const toggleCalendarOn = () => {
    setIsCalendarPressed(true);
    setIsOverviewPressed(false);
    toggleCalendar();
  };

    /* ----------------Overview and Calendar State --------------*/

    /* ------------------------Fetch Tasks ----------------------*/
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
      // Fetch tasks from the API
      async function fetchTasks() {
        try {
          const response = await axios.get(`${BASE_URL}/api/tasks/finished`, {
            headers: {
              Authorization: `token ${localStorage.getItem('authToken')}`,
            },
          });
    
          // Sort tasks by date before setting them
          const sortedTasks = response.data.sort((b, a) => new Date(b.time) - new Date(a.time));
    
          setTasks(sortedTasks.map(task => ({
            ...task,
            truncatedDescription:
              task.description.split(' ').slice(0, 4).join(' ') +
              (task.description.split(' ').length > 4 ? '...' : ''),
          })));
        } catch (error) {
          console.error('Error fetching tasks', error);
        }
      }
    
      fetchTasks();
    }, []);
    /* ------------------------Fetch Tasks ----------------------*/

  return (
  <div className='app-sidebar'>
    <img className='sidebar-logo' src={Logo} alt='logo'/>
    <div className='sidebar-buttons'>
      <button className='sidebar-button-part' onClick={toggleOverviewOn}>
      <img
          src={isOverviewPressed ? OverviewOn : Overview}
          alt='overview'
          className={`image-transition ${isOverviewPressed ? 'active' : ''}`}
        />
      </button>
          <button className='sidebar-button-part' onClick={toggleCalendarOn}>
          <img
          src={isCalendarPressed ? CalendarOn : Calendar}
          alt='Calendar'
          className={`image-transition ${isCalendarPressed ? 'active' : ''}`}
        />
      </button>
    </div>
    <div className='recent-tasks'>
        <div className='recent-tasks-title-group'>
        <img src={TickMark}/>
        <h3 className='recent-tasks-title'>Recently Finished</h3>
        </div>
        <ul className='sidebar-task-ul'>
          {tasks
            .slice(-3)
            .map(task => (
              <li key={task.id} className='sidebar-task-li'>
                <span className='sidebar-task-description'>{task.truncatedDescription}</span>
                <div className='sidebar-time-group'>
                <span  className='sidebar-task-date'>{task.date}</span>
                <img src={Award}/>
                <span  className='sidebar-task-time'>{task.time}</span>
                </div>
              </li>
            ))}
        </ul>
      </div>

  </div>
  );
};

export default SideBar;