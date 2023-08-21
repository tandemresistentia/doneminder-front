import React, { useState } from 'react';
import axios from 'axios';
import Login from '../../Auth/Login/LoginForm'
import './RegistrationForm.css'
import { GoogleLogin } from 'react-google-login';
import BASE_URL from '../../config';
import Google from '../../../assets/Login/google.png'

import GoogleAuth from '../GoogleAuth';
const RegistrationForm = () => {
  /* ------------------------Handle Registration ----------------------*/
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password1: '',
    password2: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/dj-rest-auth/registration/`, formData);
      console.log('Registration successful', response.data);
      window.location.reload()
    } catch (error) {
      console.error('Registration failed', error);
    }
  };
/* ------------------------Handle Registration ----------------------*/
const [showLogin,setShowLogin] = useState(false);

const handleShowLogin = () => {
  setShowLogin(!showLogin);
}
/* ------------------------Toggle Login ----------------------*/

  return (  
    <div className='app-login-group'>
      {showLogin ? (<Login/>) : (
      <div className='app-login'>
        <div className='app-registration-leftside'>
          <div className='app-registration-title-group'>
          <p className='app-registration-title'>Sign up to DoneMinder</p>
          <button className='app-registration-google'><img src={Google}/> Sign up with Google</button>
          </div>
          <p className='app-registration-already'>Already Registered?
          <button className='app-registration-already-button' onClick={handleShowLogin}>Sign in</button></p>
        </div>
        <div className='app-registration-middle-line'>
            <div className='line-1'/>
              <p className='middle-text-or'>Or</p>
            <div className='line-1'/>
        </div>
    <form className='form-group-max' onSubmit={handleSubmit}>
      <div className='form-input-container-username'>
      <div className='form-input-container-group'>
        <label className='form-label-text'>Username</label>
        <input className='input-container-username' type="text" name="username" onChange={handleInputChange} />
      </div>
      <div className='form-input-container-group'>
        <label className='form-label-text'>Email Address</label>
        <input className='input-container-email' type="email" name="email" onChange={handleInputChange} />
      </div>
      </div>
      <div className='form-input-container-group'>
        <label className='form-label-text'>Password</label>
        <input className='input-container-password' type="password" name="password1" onChange={handleInputChange} />
      </div>
      <div className='form-input-container-group'>
        <label className='form-label-text'>Confirm Password</label>
        <input className='input-container-password' type="password" name="password2" onChange={handleInputChange} />
      </div>
      <button className='form-input-submit' type="submit">Create Account</button>
    </form>
    </div>
    )}
    </div>
  );
};

export default RegistrationForm;
