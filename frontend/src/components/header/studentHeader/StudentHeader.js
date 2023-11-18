import React, { useState, useEffect } from 'react';
import { images } from '../../../images';
import { useNavigate } from 'react-router-dom';
import './studentHeader.scss';
import '../../../scss/profilePopup.scss';
import UpdatePassModal from '../../../modal/updatePasswordModal/UpdatePasswordModal';
import ComplaintBoxForm from '../../../modal/complaintBoxModal/ComplaintBoxModal';
import MessMenuModal from '../../../modal/messMenuModal/MessMenuModal'; // Import the MessMenuModal

const ProfileHeader = (props) => {
  const navigate = useNavigate();

  const [openHamburger, setOpenHamburger] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openUpdatePassword, setOpenUpdatePassword] = useState(false);
  const [openComplaintBox, setOpenComplaintBox] = useState(false);
  const [openMessMenu, setOpenMessMenu] = useState(false); // New state for Mess Menu modal
  const [name, setName] = useState('');
  const [regno, setRegno] = useState('');
  const [hostel, setHostel] = useState('');
  const [link, setLink] = useState('');

  const toggleHamburger = (e) => {
    e.preventDefault();
    setOpenComplaintBox(false);
    setOpenProfile(false);
    setOpenUpdatePassword(false);
    setOpenHamburger(!openHamburger);
  };

  const toggleProfile = () => {
    setOpenComplaintBox(false);
    setOpenUpdatePassword(false);
    setOpenProfile(!openProfile);
  };

  const toggleUpdatePassword = () => {
    setOpenComplaintBox(false);
    setOpenUpdatePassword(!openUpdatePassword);
  };

  const toggleComplaintBox = () => {
    setOpenProfile(false);
    setOpenUpdatePassword(false);
    setOpenComplaintBox(!openComplaintBox);
  };

  const toggleMessMenu = async() =>{
    setOpenProfile(false);
    setOpenUpdatePassword(false);
    const data = {
      hostel : hostel
    }
    try{
      const response = await fetch("http://localhost:5005/menu",{
      method : 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(data)
    });
    const responseData = await response.json();
    setLink(responseData.link);
    console.log(link);
    setOpenMessMenu(!openMessMenu);
  }catch(err){
    console.log(err);
  }

}
  useEffect( ()=>{
    setName(props.name);
    setRegno(props.regno);
    setHostel(props.hostel);
  },[props]);
  

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
        <ul className={openHamburger ? "nav-items active" : "nav-items"}>
          <li id='pfp1' className='link' onClick={toggleProfile} >Profile</li>
          <li className='link'>Contact</li>
          <li className='link' onClick={toggleMessMenu}>Mess Menu</li>
          <li className='complaint-box link' onClick={toggleComplaintBox}>Complain Box</li>
          {openComplaintBox && <ComplaintBoxForm regno = {regno} name = {name} hostel ={hostel} />}
          {openMessMenu && <MessMenuModal setOpenMessMenu={setOpenMessMenu} link = {link}/>} {/* Render MessMenuModal when openMessMenu is true */}
          <div id="pfp2" className="profile-popup-container">
            <li className="profile-button">
              <img src={images.people_first} alt='profile' onClick={toggleProfile} />
            </li>
            {openProfile && (
              <div className="profile-popup">
                <div className='popupHead'>
                  {name && <h3><b>{name}</b></h3>}
                  <br />
                  {regno && <h4><b>{regno} ({hostel})</b></h4>}
                </div>
                <hr /> 
                <div className='popupBottom'>
                  <h4 className='change-password' onClick={toggleUpdatePassword}><b>Change Password</b></h4>
                  <h4 className='logout' onClick={logout}><b>Log Out</b></h4>
                </div>
              </div>
            )}
          </div>
        </ul>
        <div className='hamburger'>
          <img src={images.hamburger} alt='' onClick={toggleHamburger} />
        </div>
      </nav>
      {openUpdatePassword && <UpdatePassModal setOpenUpdatePassword={setOpenUpdatePassword} />}
    </div>
  );
};

export default ProfileHeader;
