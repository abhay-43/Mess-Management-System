import React, { useState } from 'react';
import { images } from '../../images';
import './profileHeader.scss';
import '../../modal/profilePopupModal/profilePopup.scss';
import UpdatePassModal from '../../modal/updateModal/UpdatePassModal';
import ComplaintBoxForm from './ComplaintBoxForm';

const ProfileHeader = () => {
  const [open, setOpen] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [openUpdatePass, setOpenUpdatePass] = useState(false);
  const [openComplaintBox, setOpenComplaintBox] = useState(false);

  const handleProfileMouseEnter = () => {
    setOpenComplaintBox(false);
    setPopupOpen(true);
  };

  const handleProfileMouseLeave = () => {
    setPopupOpen(false);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  const updatePassword = () => {
    setOpenUpdatePass(true);
  };

  const complaintToggle = () => {
    setOpenUpdatePass(false);
    setOpenComplaintBox(!openComplaintBox);
  };

  return (
    <div className='profileHeader'>
      <nav className="navbar container">
        <div className="logo">
          <h2><b>Mess Management_@MNNIT</b></h2>
        </div>
        <ul className={open ? "nav-items active" : "nav-items"}>
          <li id='pfp1'>Profile</li>
          <li>Contact</li>
          <li>Details</li>
          <li className='complaint-box' onClick={complaintToggle}>Complain Box</li>
          {openComplaintBox && <ComplaintBoxForm setOpenComplaintBox={setOpenComplaintBox} />}
          <div className="profile-popup-container"
            onMouseEnter={handleProfileMouseEnter}
            onMouseLeave={handleProfileMouseLeave}
          >
            <li className="profile-button">
              <img src={images.people_first} alt='profile'/>
            </li>
            {isPopupOpen && (
              <div className="profile-popup">
                <div className='popupHead'>
                  <h3 className='profileName'><b>Aamir</b></h3>
                  <br />
                  <h3 className='profileRegNo'><b>20214197</b></h3>
                </div>
                <hr />
                <div className='popupBottom'>
                  <h4 className='change-password' onClick={updatePassword}><b>Update Password</b></h4>
                  <br />
                  <h4 className='logout'><b>Log Out</b></h4>
                </div>
              </div>
            )}
          </div>
        </ul>
        <div className='hamburger'>
          <img src={images.hamburger} alt='' onClick={handleClick} />
        </div>
      </nav>
      {openUpdatePass && <UpdatePassModal setOpenUpdatePass={setOpenUpdatePass}/>}
    </div>
  );
};

export default ProfileHeader;
