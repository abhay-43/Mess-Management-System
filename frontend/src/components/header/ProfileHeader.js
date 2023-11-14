import React, { useState } from 'react';
import { images } from '../../images';
import { useNavigate } from 'react-router-dom';
import "./profileHeader.scss";
import '../../modal/profilePopupModal/profilePopup.scss';

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

  const [isPopupOpen, setPopupOpen] = useState(false);

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

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
          <div className="profile-popup-container" >
          <li className="profile-button"> <img src={images.people_first} alt='profile' onClick={togglePopup}/> </li>
          {isPopupOpen && (
            <div className="profile-popup">
                <div className='popupHead'>
                  <h3 className='profileName'><b>Aamir</b></h3>
                  <br />
                  <h3 className='profileRegNo'><b>20214197</b></h3>
                </div>
                <hr />
                <div className='popupBottom'>
                  <h4 className='change-password'><b>Change Password</b></h4>
                  <br />
                  <h4 className='logout'><b>Log Out</b></h4>
                </div>
                
            </div>
          )}
        </div>
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
