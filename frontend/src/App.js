import React from "react";
import "./scss/main.scss";
import Home from "./page/home/Home";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import {BrowserRouter as Router, Route,Routes } from "react-router-dom";
import Login from './page/Login/Login';
const App=() =>{
  return (
    // <div >
    // <Router>
    // <Header/>
    //   <Routes>
    //     <Route path="/" element={ <Home/>}/>

    //    </Routes>
    //   <Footer/>
    // </Router>
    
   
     
    //  </div>

    <div className="App">
      <Login />
    </div>
  );
}

export default App;
