import React from 'react';
import "./Footer.scss";
import { images } from '../../images';

// Footer component
const Footer = () => {
  return (
    <div>
      {/* Footer Section */}
      <footer>
        {/* Footer Art */}
        <div className='footer-art'>
          <picture>
            {/* Responsive image for mobile devices */}
            <source media='(max-width:767px' srcSet={images.footer_mob}/>
            {/* Default image for larger screens */}
            <img src={images.footer} alt=""/>
          </picture>
        </div>

        {/* Main Footer Content */}
        <div className='container'>
          <div className='footer'>
            {/* Footer Header */}
            <div className='footer-header'> 
              <div className='logo'>
                <h2><b>Mess Management_@MNNIT</b></h2>
              </div>
              {/* Social Media Icons */}
              <div className='social-media-icons'>
                <img className="delete-icon" src={images.fb} alt=""/>
                <img className="delete-icon" src={images.twitter} alt=""/>
                <img className="delete-icon" src={images.insta} alt=""/>
                <img className="delete-icon" src={images.pinterest} alt=""/>
              </div>
            </div>

            {/* Footer Menu */}
            <div className='footer-menu'>
              {/* Our Company Section */}
              <div className='our-company'>
                <h3>Our Company</h3>
                <ul>
                  <li>How we work</li>
                  <li>Why insure</li>
                  <li>View Plans</li>
                  <li>Reviews</li>
                </ul>
              </div>

              {/* Help Section */}
              <div className='our-company'>
                <h3>Help</h3>
                <ul>
                  <li>FAQ</li>
                  <li>Terms of use</li>
                  <li>View Plans</li>
                  <li>Review</li>
                </ul>
              </div>

              {/* Contact Section */}
              <div className='our-company'>
                <h3>Contact</h3>
                <ul>
                  <li>FAQ</li>
                  <li>Terms of use</li>
                  <li>View Plans</li>
                  <li>Review</li>
                </ul>
              </div>

              {/* Others Section */}
              <div className='our-company'>
                <h3>Others</h3>
                <ul>
                  <li>FAQ</li>
                  <li>Terms of use</li>
                  <li>View Plans</li>
                  <li>Review</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
