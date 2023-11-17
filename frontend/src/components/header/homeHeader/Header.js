import React, { useState } from 'react';
import "./header.scss";
import { images } from "../../../images";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  // Initialize the navigate function from react-router-dom
  const navigate = useNavigate();

  // State for controlling the mobile menu
  const [open, setOpen] = useState(false);

  // Function to toggle the mobile menu
  const handleClick = (e) => {
    e.preventDefault();
    setOpen(!open);
  }

  // Function to handle student login click
  const handleClick1 = (e) => {
    navigate("/login");
  }

  // Function to handle admin login click
  const handleClick2 = (e) => {
    navigate("/adminLogin");
  }

  return (
    <div className='header'>
      {/* Navigation bar */}
      <nav className="navbar container">
        {/* Logo */}
        <div>
          <h2><b>Mess Management_@MNNIT</b></h2>
        </div>

        {/* Navigation items */}
        <ul className={open ? "nav-items active" : "nav-items"}>
          <li className='link'>
            {/* Contact us link */}
            <a style={{ color: 'black' }} href="https://mail.google.com/mail/?view=cm&fs=1&to=mnnit.mms.2023@gmail.com">
              <b>Contact us</b>
            </a>
          </li>
          <li className='link' onClick={handleClick1}>
            {/* Student Login link */}
            <b>Student Login</b>
          </li>
          <li className='link' onClick={handleClick2}>
            {/* Admin Login link */}
            <b>Admin Login</b>
          </li>
        </ul>

        {/* Hamburger menu icon for mobile */}
        <div className='hamburger'>
          <img src={images.hamburger} alt='' onClick={handleClick} />
        </div>
      </nav>
    </div>
  );
}

export default Header;
