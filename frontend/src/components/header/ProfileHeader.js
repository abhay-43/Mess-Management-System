import React, { useState } from 'react';
import { images } from '../../images';
import { useNavigate } from 'react-router-dom';
import './profileHeader.scss';
import '../../modal/profilePopupModal/profilePopup.scss';
import UpdatePassModal from '../../modal/updateModal/UpdatePassModal';
import ComplaintBoxForm from './ComplaintBoxForm';

const ProfileHeader = (props) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [openUpdatePass, setOpenUpdatePass] = useState(false);
  const [openComplaintBox, setOpenComplaintBox] = useState(false);
  const [name, setName] = useState('');
  const [regno, setRegno] = useState('');

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
    setName(props.name);
    setRegno(props.regno);
    setPopupOpen(!isPopupOpen);
  };

  const updatePassword = () => {
    setOpenUpdatePass(true);
  };

  const complaintToggle = () => {
    setOpenUpdatePass(false);
    setOpenComplaintBox(!openComplaintBox);
  };

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:5005/logout", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      const responseData = await response.json();
      if (response) {
        window.location.href = "/";
      }
    } catch (err) {
      console.log(err);
    }
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
          {openComplaintBox && <ComplaintBoxForm />}
          <div id="pfp2" className="profile-popup-container"
            onMouseEnter={handleProfileMouseEnter}
            onMouseLeave={handleProfileMouseLeave}
          >
            <li className="profile-button">
              <img src={images.people_first} alt='profile' onClick={togglePopup} />
            </li>
            {isPopupOpen && (
              <div className="profile-popup">
                <div className='popupHead'>
                  {name && <h3><b>{name}</b></h3>}
                  <br />
                  {regno && <h3><b>{regno}</b></h3>}
                </div>
                <hr />
                <div className='popupBottom'>
                  <h4 className='change-password' onClick={updatePassword}><b>Change Password</b></h4>
                  <br />
                  <h4 className='logout' onClick={logout}><b>Log Out</b></h4>
                </div>
              </div>
            )}
          </div>
        </ul>
        <div className='hamburger'>
          <img src={images.hamburger} alt='' onClick={handleClick} />
        </div>
      </nav>
      {openUpdatePass && <UpdatePassModal setOpenUpdatePass={setOpenUpdatePass} />}
    </div>
  );
};

export default ProfileHeader;
