import React,{useState} from 'react';
import "./header.scss";
import { images } from "../../images";
const Header = () => {
  return (
    <div>
      <nav className='navbar'>
        <div className="logo">
            <img src={images.logo} alt="" />
        </div>
        <ul className="nav-items">
            <li>About</li>
            <li>Contact</li>
            <li>Login </li>
            <li className="btn btn--nav-btn">View Plans</li>
        </ul>
        <div className='hamburger'>
           <img src={images.hamburger} alt="" />
        </div>
      </nav>
    </div>
  )
}

export default Header
