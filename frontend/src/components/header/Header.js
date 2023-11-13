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
        <div>
           
            <h2><b>Mess Management_@MNNIT</b></h2>
        </div>
        <ul className={open? "nav-items active" :"nav-items"}>
            <li className='link'> <a style={{ color: 'black' }}
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=mnnit.mms.2023@gmail.com"
                  ><b>Contact us</b></a></li>
            <li className='link' onClick={handleClick1}><b>Student Login</b></li>
            <li className='link' onClick={handleClick2}><b>Admin Login</b></li>
        </ul>
        <div className='hamburger'>
            <img src={images.hamburger} alt='' onClick={handleClick}/>
        </div>
      </nav> 
      
     

    </div>
    
  )
}

export default Header
