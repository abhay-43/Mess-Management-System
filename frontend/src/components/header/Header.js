import React,{useState} from 'react';
import "./header.scss"
import { images } from "../../images";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate=useNavigate();
  const [open,setOpen]=useState(false)
  const handleClick =e=>{
    e.preventDefault();
    setOpen(!open);
  }
  const handleClick1=e=>{
       navigate("/login")
  }
  const handleClick2=e=>{
    navigate("/adminLogin")
  }

  return (
   
    <div className='header'>
      <nav className="navbar container">
        <div className="logo">
            <img src={images.logo} alt="" />
        </div>
        <ul className={open? "nav-items active" :"nav-items"}>
            <li >About</li>
            <li>Contact</li>
            <li onClick={handleClick1}>Student Login </li>
            <li onClick={handleClick2}>Admin Login</li>
            <li className="btn btn--nav-btn">View Plans</li>
        </ul>
        <div className='hamburger'>
            <img src={images.hamburger} alt='' onClick={handleClick}/>
        </div>
      </nav> 
      
     

    </div>
    
  )
}

export default Header
