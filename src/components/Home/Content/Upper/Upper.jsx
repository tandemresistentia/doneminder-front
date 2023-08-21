import React, { useEffect, useState } from 'react'
import './Upper.css'
import Login from '../../../Auth/Login/LoginForm'
  /* ------------------------Images ----------------------*/
import OverviewUp from '../../../../assets/Home/Upper/overview-up.png'
import LogIn from '../../../../assets/Home/Upper/log-in.png'
import Account from '../../../../assets/Home/Upper/account.png'
  /* ------------------------Images ----------------------*/
const Upper = ({title}) => {
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
  /* ------------------------Manage Log OUT ----------------------*/
  const [showLogout,setShowLogout] = useState(false);
  const toggleShowLogOut = () => {
    setShowLogout(!showLogout);
  }
  const handleLogout = () => {
    // Clear the authToken from localStorage and update isLoggedIn state
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setShowLogout(false); // Hide the Logout button
    window.location.reload()
  };
  /* ------------------------Manage Log OUT ----------------------*/
  
  return (
    <div className='app-upper'>
    <div className='overview-upper'>
      <div className='overview-title-group'>
        <img src={OverviewUp}/>
        <p className='overview-title'>{title}</p>
      </div>
    {isLoggedIn ? (
      <div className='account-button-group'>
      <button className='account-button' onClick={toggleShowLogOut}><img src={Account}/></button>
      {showLogout && <button className='logout-button' onClick={handleLogout}>Logout</button>}
      </div>
    ) : (
    <button className='account-button' onClick={toggleShowLogin}></button>
    )}
    </div>
    <div>
    {showLogin && <Login/>}
    </div>
  </div>

  )
}

export default Upper