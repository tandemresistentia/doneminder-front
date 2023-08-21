import React, { useEffect, useState } from 'react'
import './Overview.css'
import '../Upper/Upper'
import Upper from '../Upper/Upper'
import Login from '../../../Auth/Login/LoginForm'
import BASE_URL from '../../../config'
import axios from 'axios'
import { format, parseISO } from 'date-fns';

import AddNew from '../../../../assets/Home/NewTask/add-new.png'
import DecorTask from '../../../../assets/Home/Overview/decor-task.png'
import EndTask from '../../../../assets/Home/Overview/end-task.png'
const Overview = ({toggleNewtask,showNewtask}) => {
  /* ------------------------Toggle Login ----------------------*/
  const [showLogin, setShowLogin] = useState(false);
  const toggleShowLogin = () => {
    setShowLogin(!showLogin);
  }
  /* ------------------------Toggle Login ----------------------*/
  /* ------------------------isLoggedIn ----------------------*/
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      setIsLoggedIn(true);
    }
  },[]);
  /* ------------------------isLoggedIn ----------------------*/
  /* ------------------------Fetch Tasks ----------------------*/
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from the API
    async function fetchTasks() {
      try {
        const response = await axios.get(`${BASE_URL}/api/tasks/`,{
          headers: {
            Authorization: `token ${localStorage.getItem('authToken')}`,
          },
        });
        // Sort tasks by date before setting them
        const sortedTasks = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));

        setTasks(sortedTasks);
      } catch(error) {
        console.error('Error fetching tasks', error);
      }
    }
    fetchTasks();
  },[]);
  /* ------------------------Fetch Tasks ----------------------*/
  /* ------------------------End Tasks ----------------------*/
  const handleEndTask = async (taskId, taskDescription) => {
    try {
      const data = {
        task_id: taskId, // Sending the task ID as part of the request body
      };

      // Mark the task as completed
      await axios.patch(`${BASE_URL}/api/tasks/`, data, {
        headers: {
          Authorization: `token ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json', // Specify content type as JSON
        },
      });

      // Create a finished task with the original description and current date/time
      const currentDate = new Date();
      const formattedDate = format(currentDate, 'yyyy-MM-dd');
      const finishedTaskData = {
        description: taskDescription,
        date: formattedDate,
      };

      // Send a request to create the finished task
      await axios.post(`${BASE_URL}/api/tasks/finished`, finishedTaskData, {
        headers: {
          Authorization: `token ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
      });

      // Update the tasks state to exclude completed task
      const updatedTasks = tasks.filter(task => task.description !== taskDescription);
      setTasks(updatedTasks);
      window.location.reload();
    } catch (error) {
      console.error('Error ending task', error);
    }
  };
  /* ------------------------End Tasks ----------------------*/
  return (
    <div className='app-overview'>
      <div className='app-overview-upper'>
      <Upper title='Overview'/>
      {isLoggedIn ? (
            <button className='new-task-button' onClick={toggleNewtask}>
            <img src={AddNew}/>
            <p>Create new task</p>
            </button>
            ):(
        <div>
          <button className='new-task-button' onClick={toggleShowLogin}>
            <img src={AddNew}/>
            Create new task
          </button>
          {showLogin && <Login/>}
        </div>
      )}
      </div>
      <div className='overview-items'>
      {tasks.map((task) => (
        <div key={task.id} className='task-item'>
          <div className='task-description-group'>
            <img src={DecorTask}/>
            <p className='task-value-big'>{task.description}</p>
          </div>
          <p className='task-value'>{task.time}</p>
          <p className='task-value'>{task.date}</p>
          <button className='button-task' onClick={() => handleEndTask(task.id, task.description)}><img src={EndTask}/></button>
        </div>
  ))}
  </div>
    </div>
  )
}

export default Overview