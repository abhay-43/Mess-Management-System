import React from 'react'
import "./Footer.scss";
import { images } from '../../images';
const Footer = () => {
  return (
    <div >
      <footer>
      <div className='footer-art'>
           <picture>
              <source media='(max-width:767px' srcSet={images.footer_mob}/>
              <img src={images.footer} alt=""/>
           </picture>
      </div>
        <div className='container'>
            <div className='footer'>
               <div className='footer-header'> 
                  <div className='logo'>
                  <h2><b>Mess Management_@MNNIT</b></h2>
                  </div>
                  <div className='social-media-icons'>
                    <img src={images.fb} alt=""/>
                    <img src={images.twitter} alt=""/>
                    <img src={images.insta} alt=""/>
                    <img src={images.pinterest} alt=""/>
                  </div>
               </div>
               <div className='footer-menu'>
                 <div className='our-company'>
                     <h3>Our Company</h3>
                   
                     <ul>
                      <li>How we work</li>
                      <li>Why insure</li>
                      <li>View Plans</li>
                      <li>Reviews</li>
                     </ul>
                 </div>

                 <div className='our-company'>
                     <h3>Help</h3>
                     
                     <ul>
                      <li>FAQ</li>
                      <li>Terms of use</li>
                      <li>View Plans</li>
                      <li>Review</li>
                     </ul>
                 </div>
                 <div className='our-company'>
                     <h3>Contact</h3>
                     
                     <ul>
                      <li>FAQ</li>
                      <li>Terms of use</li>
                      <li>View Plans</li>
                      <li>Review</li>
                     </ul>
                 </div>
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
  )
}

export default Footer
