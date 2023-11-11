import React from "react";
import "./scss/main.scss";
import Home from "./page/home/Home";
import Login from "./page/Login/Login";
import {BrowserRouter as Router, Route,Routes } from "react-router-dom";
import Profile from "./page/profile/Profile";
const App=() =>{
  return (
    <div >
    <Router>
   
      <Routes>
        <Route path="/" element={ <Home/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/profile" element={<Profile/>}/>
       </Routes>
     
    </Router>
    
   
     
     </div>
  );
}

export default App;
