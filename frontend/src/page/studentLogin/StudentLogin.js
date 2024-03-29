// Login.js

import React, { useState } from 'react';
import ForgetModal from '../../modal/forgetPasswordModal/ForgetPasswordModal';
import OtpModal from '../../modal/otpVerificationModal/OtpVerificationModal';

import './studentLogin.scss';

const Login = () => {
  const [optModalOpen,setOtpModalOpen]=useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async() => {
    // Implement your login logic here
    const data = {
      Reg_no : registrationNumber,
      Password : password
    }
    try{
      const response = await fetch("http://localhost:5005/login",{
      method : 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(data)
    });
    const responseData = await response.json();
    if(responseData.success && !responseData.error) window.location.href ='/profile';
    else if(!responseData.success && !responseData.error) alert("Incorrect password! Try again...");
    else if(!responseData.success && responseData.error) alert("Registration no. doesn't exists !");
    }catch(err){
      console.log(err);
    }
  };

  return (
    <div className='login'>
    <div className="login-container">
      <div className="login-card">
        <h2 className='heading'>Student Login</h2>
       
        <br/>
       
        <div className="form-group">
          <label>Registration Number:</label>
          <input
            type="text"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <button onClick={handleLogin}>Submit</button>
          <button  className="openModalBtn"
        onClick={() => {
          setModalOpen(true);
        }}>Forgot Password</button>
        </div>
      </div>
    
    </div>
    {modalOpen && <ForgetModal setOpenModal={setModalOpen} setOtpModalOpen={setOtpModalOpen}/>}
    {optModalOpen && <OtpModal setOtpModalOpen={setOtpModalOpen} />}
   </div>
   
  );
};

export default Login;
