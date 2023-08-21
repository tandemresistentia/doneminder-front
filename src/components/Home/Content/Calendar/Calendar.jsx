import React, { useState, useEffect } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Import calendar styles
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar'; // Import components
import moment from 'moment'; // Import date handling library
import './Calendar.css';
import Upper from '../Upper/Upper';
import BASE_URL from '../../../config';
import axios from 'axios';

const localizer = momentLocalizer(moment); // Initialize localizer with moment.js

const Calendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await axios.get(`${BASE_URL}/api/tasks/`, {
          headers: {
            Authorization: `token ${localStorage.getItem('authToken')}`,
          },
        });

        const taskEvents = response.data.map(task => {
          const [hour, minute] = task.time.split(':'); // Split task.time into hour and minute
          const eventDate = new Date(task.date);

          // Set the event time using the task's date and adjusted time
          eventDate.setHours(parseInt(hour, 10));
          eventDate.setMinutes(parseInt(minute, 10));

          return {
            title: task.description,
            start: eventDate,
            end: eventDate, // You can adjust the end time if needed
          };
        });

        setEvents(taskEvents);
      } catch (error) {
        console.error('Error fetching tasks', error);
      }
    }
    fetchTasks();
  }, []);

  return (
    <div className='app-calendar'>
      <Upper title='Calendar' />
      <div className='calendar-container'>
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 700 }} // Set the calendar height
        />
      </div>
    </div>
  );
};

export default Calendar;
