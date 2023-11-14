import React from "react";
import "./scss/main.scss";
import Home from "./page/home/Home";
import Login from "./page/Login/Login";
import {BrowserRouter as Router, Route,Routes } from "react-router-dom";
import Profile from "./page/profile/Profile";
import AdminLogin from "./page/AdminLogin/AdminLogin";
import AdminProfile from "./page/adminProfile/AdminProfile";
const App=() =>{
  return (
    <div >
    <Router>
   
      <Routes>
        <Route path="/" element={ <Home/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/adminLogin" element={<AdminLogin/>} />
        {/* <Route path="/" element={<AdminProfile/>} /> */}
        
      </Routes>
    </Router>
    
   
     
     </div>
  );
}

export default App;
