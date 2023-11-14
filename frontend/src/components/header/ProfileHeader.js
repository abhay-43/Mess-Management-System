import React, { useState } from 'react';
import { images } from '../../images';
import { useNavigate } from 'react-router-dom';
import "./profileHeader.scss";

const ProfileHeader = () => {
  // Initialize the navigate function from react-router-dom
  const navigate = useNavigate();

  // State for controlling the mobile menu
  const [open, setOpen] = useState(false);

  // Function to toggle the mobile menu
  const handleClick = (e) => {
    e.preventDefault();
    setOpen(!open);
  }

  return (
    <div className='profileHeader'>
      {/* Navigation bar */}
      <nav className="navbar container">
        {/* Logo */}
        <div className="logo">
          <h2><b>Mess Management_@MNNIT</b></h2>
        </div>

        {/* Navigation items */}
        <ul className={open ? "nav-items active" : "nav-items"}>
          <li id='pfp1'>Profile</li>
          <li>Contact</li>
          <li>Details</li>
          <li>Complain Box</li>
          <li id='pfp2'> <img src={images.people_first} alt='' /> </li>
        </ul>

        {/* Hamburger menu icon for mobile */}
        <div className='hamburger'>
          <img src={images.hamburger} alt='' onClick={handleClick} />
        </div>
      </nav>
    </div>
  );
}

export default ProfileHeader;
