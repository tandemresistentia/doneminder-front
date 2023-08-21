import React, { useState } from 'react';
import axios from 'axios';
import Login from '../../Auth/Login/LoginForm'
import './RegistrationForm.css'
import { GoogleLogin } from 'react-google-login';
import BASE_URL from '../../config';
import Google from '../../../assets/Login/google.png'

import GoogleAuth from '../GoogleAuth';
const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password1: '',
    password2: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password1: '',
    password2: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear previous errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/dj-rest-auth/registration/`, formData);
      console.log('Registration successful', response.data);
      window.location.reload()
    } catch (error) {
      console.error('Registration failed', error);

      // Update errors state with validation errors from the server
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      }
    }
  };

  const [showLogin, setShowLogin] = useState(false);

  const handleShowLogin = () => {
    setShowLogin(!showLogin);
  }

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
              <button className='app-registration-already-button' onClick={handleShowLogin}>Sign in</button>
            </p>
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
                <input
                  className='input-container-username'
                  type="text"
                  name="username"
                  onChange={handleInputChange}
                />
                <span className='error-message'>{errors.username}</span>
              </div>
              {/* Other input fields */}
              <button className='form-input-submit' type="submit">Create Account</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
