import React from "react";
import "./scss/main.scss";
import Home from "./page/home/Home";
import Login from "./page/studentLogin/StudentLogin";
import {BrowserRouter as Router, Route,Routes } from "react-router-dom";
import Profile from "./page/studentProfile/StudentProfile";
import AdminLogin from "./page/AdminLogin/AdminLogin";
import AdminProfile from "./page/adminProfile/AdminProfile";


const App=() =>{
  return (
    <div >
    <Router>
   
      <Routes>
        {/* <Route path="/" element={ <Home/>}/> */}
        {/* <Route path="/login" element={<Login/>} /> */}
        {/* <Route path="/" element={<Profile/>}/> */}
        {/* <Route path="/adminLogin" element={<AdminLogin/>} /> */} 
        {/* <Route path="/" element={ <Home/>}/>
        {/* <Route path="/login" element={<Login/>} /> */}
         <Route path="/profile" element={<Profile/>}/> 
       {/* <Route path="/adminLogin" element={<AdminLogin/>} /> */}
        {/* <Route path="/adminProfile" element={<AdminProfile/>} /> */}
        {/* <Route path="/" element={<Profile/>} /> */}
        
      </Routes>
    </Router>
    
   
     
     </div>
  );
}

export default App;
