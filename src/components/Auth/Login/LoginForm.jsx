import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css'
import Register from '../../Auth/Signup/RegistrationForm'
import BASE_URL from '../../config';
import Google from '../../../assets/Login/google.png'
const LoginForm = () => {

  /* ------------------------Handle Login ----------------------*/
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/dj-rest-auth/login/`, formData);
      const token = response.data.key; // Extract the token from the response
      localStorage.setItem('authToken', token); // Store the token
      console.log('Login successful', response.data);
      window.location.reload()
    } catch (error) {
      console.error('Login failed', error);
    }
  };
  /* ------------------------Handle Login ----------------------*/


  /* ------------------------Toggle Registration ----------------------*/
  const [showRegister,SetShowRegister] = useState(false);

  const toggleShowRegister = () =>{
    SetShowRegister(!showRegister);
  }
  /* ------------------------Toggle Registration ----------------------*/


  return (
    
    <div className='app-login-group'>
      {showRegister ? (
      <Register/>
      ) : (
        <div className='app-login'>
        <div className='app-registration-leftside'>
          <div>
          <p className='app-registration-title'>Sign in to DoneMinder</p>
          <button className='app-registration-google'><img src={Google}/> Sign in with Google</button>
          </div>
          <p className='app-registration-already'>Not a Member?
          <button className='app-registration-already-button' onClick={toggleShowRegister}>Sign Up</button></p>
        </div>
        <div className='app-registration-middle-line'>
            <div className='line-1'/>
              <p className='middle-text-or'>Or</p>
            <div className='line-1'/>
        </div>
      <form className='login-form' onSubmit={handleSubmit}>
      <div className='form-input-container-group'>
        <label className='form-label-text'>Username</label>
        <input className='input-container-username' type="text" name="username" onChange={handleInputChange} />
        </div>
        <div className='form-input-container-group'>
        <label className='form-label-text'>Password</label>
        <input className='input-container-password' type="password" name="password" onChange={handleInputChange} />
        </div>
        <button className='form-input-submit' type="submit">Sign in</button>
      </form>
      </div>
      )}
    </div>
  );
};

export default LoginForm;