// Login.js

import React, { useState } from 'react';
import ForgetModal from '../../modal/forgetModal/ForgetModal';
import OtpModal from '../../modal/otpModal/OtpModal';

import './login.scss';

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
      body: JSON.stringify(data)
    });
    const responseData = await response.json();
    if(responseData) window.location.href ='/profile';
    else alert("Incorrect Password !")
    }catch(err){
      console.log(err);
    }
    
    // if(responseData == true){
      // window.location.href = "http://localhost:5000/";
    // }
    // alert( registrationNumber);
    // console.log('Password:', password);
  };

  const handleForgotPassword = () => {
    // Implement your forgot password logic here
    console.log('Forgot Password clicked');
  };

  return (
    <div className='login'>
    <div className="login-container">
      <div className="login-card">
        <h2>Student Login</h2>
        <div className="form-group">
          <label>Registration Number:</label>
          <input
            type="text"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
