import React, { useState } from 'react';
import './Home.css';
import SideBar from './SideBar/SideBar';
import Content from './Content/Content';
const Home = () => {
  const [showOverview, setShowOverview] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showNewtask, setShowNewtask] = useState(false);

  const toggleOverview = () => {
    setShowOverview(true);
    setShowCalendar(false);
    setShowNewtask(false);
  };

  const toggleCalendar = () => {
    setShowCalendar(true);
    setShowOverview(false);
    setShowNewtask(false);
  };

  
  const toggleNewtask = () => {
    setShowNewtask(!showNewtask);
    setShowOverview(!showOverview);
  }

  return (
    <div className="home-app">
      <SideBar toggleOverview={toggleOverview} toggleCalendar={toggleCalendar} />
      <Content 
      showOverview={showOverview} 
      showCalendar={showCalendar}
      toggleNewtask={toggleNewtask}
      showNewtask={showNewtask}
      />
    </div>
  );
};

export default Home;