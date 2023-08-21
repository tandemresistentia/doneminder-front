import React, { useState } from 'react'
import './NewTask.css'
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

import Upper from '../../Upper/Upper'
import axios from 'axios';
import BASE_URL from '../../../../config';
import { format, parseISO } from 'date-fns';


import MinusNew from '../../../../../assets/Home/NewTask/minus-new.png'
import Check from '../../../../../assets/Home/NewTask/check.png'
const Newtask = ({toggleNewtask,showNewtask}) => {

  /* ------------------------Task Info ----------------------*/
  const [taskDescription, setTaskDescription] = useState('');
  const [selectedTime, setSelectedTime] = useState('12:00');
  const [value, onChange] = useState(new Date());

  const handleTaskDescriptionChange = (event) => {
    setTaskDescription(event.target.value);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleDueDateChange = (date) => {
    //Check if the selected date is not earlier than the current date
    const currentDate = new Date();
    if (date < currentDate) {
      return;
    }
    onChange(date);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      
      // Format the date and time
      const formattedDate = format(value, 'yyyy-MM-dd');
      const taskDataToSend = {
        description: taskDescription,
        time: selectedTime, // Use the formatted time
        date: formattedDate, // Use the formatted date
      };
      
      const taskInfo = await axios.post(`${BASE_URL}/api/tasks/`, taskDataToSend, {
        headers: {
          Authorization: `token ${token}`,
          'Content-Type': 'application/json',
        },
      });
      window.location.reload();
    }
    catch(error){
      console.log('Error',error)
    }
  }
  /* ------------------------Task Info ----------------------*/


  return (
    <div className='app-overview'>

      <Upper title='New Task'/>
      <button className='new-task-button' onClick={toggleNewtask}>
        <img src={MinusNew}/>
        <p>Create new task</p>
            </button>
      <form className='newstask-general-group'>
        <div className='newtask-form-group'>
          <div className='form-input-group'>
        <p  className='form-text-style'>Description</p>
        <textarea
          className='form-text-area-style'
          value={taskDescription}
          onChange={handleTaskDescriptionChange}
        />
        </div>
        <div className='form-input-group'>
        <p className='form-text-style'>Due Date</p>
        <DatePicker
          className='form-data-style'
          value={value}
          onChange={handleDueDateChange}
      />
      </div>
        <div className='form-input-group'>
        <p  className='form-text-style'>Time</p>
        <TimePicker
         className='form-data-style'
          value={selectedTime}
          onChange={handleTimeChange}
        />
        </div>

      </div>
        <button type='submit' onClick={handleSubmit} className='button-create-task'><img src={Check}/>Start task</button>
      </form>
    </div>
  )
}

export default Newtask