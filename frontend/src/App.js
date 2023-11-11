import React from "react";
import "./scss/main.scss";
import Home from "./page/home/Home";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import {BrowserRouter as Router, Route,Routes } from "react-router-dom";
const App=() =>{
  return (
    <div >
    <Router>
    <Header/>
      <Routes>
        <Route path="/" element={ <Home/>}/>

       </Routes>
      <Footer/>
    </Router>
    
   
     
     </div>
  );
}

export default App;
