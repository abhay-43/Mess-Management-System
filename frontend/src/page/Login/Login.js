// Login.js

import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async() => {
    // Implement your login logic here
    const data = {
      Reg_no : registrationNumber,
      Password : password
    }
    try{
      const response = await fetch("http://localhost:5000/login",{
      method : 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const responseData = await response.json();
    if(responseData) alert("Password matched !");
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
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
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
          <button onClick={handleForgotPassword}>Forgot Password</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
