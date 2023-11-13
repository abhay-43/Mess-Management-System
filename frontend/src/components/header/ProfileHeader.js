import React,{useState} from 'react'
import { images } from '../../images'
import { useNavigate } from 'react-router-dom';
import "./profileHeader.scss";
const ProfileHeader = () => {
  const navigate=useNavigate();
  const [open,setOpen]=useState(false)
  const handleClick =e=>{
    e.preventDefault();
    setOpen(!open);
  }
  return (
    <div className='profileHeader'>
      <nav className="navbar container">
        <div className="logo">
           
            <h2>MMS</h2>
        </div>
        <ul className={open? "nav-items active" :"nav-items"}>
            <li id='pfp1'>Profile</li>
            <li>Contact</li>
            <li>Details</li>
            <li>Complain Box</li>
             <li id='pfp2'> <img src={images.people_first} alt=''   /> </li>
           
        </ul>
       
        <div className='hamburger'>
            <img src={images.hamburger} alt='' onClick={handleClick}/>
        </div>
      </nav> 
      
     

    </div>
  )
}

export default ProfileHeader
