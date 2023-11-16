import Footer from '../../components/footer/Footer'
import React, { useState, useEffect } from 'react';
import { images } from '../../images';
import { useNavigate } from 'react-router-dom';
import '../../components/header/profileHeader.scss';
import '../../modal/profilePopupModal/profilePopup.scss';
import UpdatePassModal from '../../modal/updateModal/UpdatePassModal';
import AddStudentForm from '../../modal/studentAddModal/AddStudent';
import './adminProfile.scss'
import SearchQueries from './SearchQuery';



const AdminProfile = () => {

  const [openHamburger, setOpenHamburger] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openUpdatePassword, setOpenUpdatePassword] = useState(false);
  const [openAddStudent, setOpenAddStudent] = useState(false);
  const [name, setName] = useState('');
  const [responsibility, setResponsibility] = useState('');

  const toggleHamburger = (e) => {
    e.preventDefault();
    setOpenAddStudent(false);
    setOpenProfile(false);
    setOpenUpdatePassword(false);
    setOpenHamburger(!openHamburger);
  };

  const toggleProfile = () => {
    setOpenAddStudent(false);
    setOpenUpdatePassword(false);
    // setName(props.name);
    // setRegno(props.regno);
    setOpenProfile(!openProfile);
  };

  const toggleUpdatePassword = () => {
    setOpenAddStudent(false);
    setOpenUpdatePassword(!openUpdatePassword);
  };

  const toggleAddStudent = () => {
    setOpenProfile(false);
    setOpenUpdatePassword(false);
    setOpenAddStudent(!openAddStudent);
  };

  useEffect(() => {
    const getAdminData = async () => {
      try {
        const response = await fetch("http://localhost:5005/adminData", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        const responseData = await response.json();
        if (responseData) {
          setName(responseData.first_name+' '+responseData.last_name || '');
          setResponsibility(responseData.responsibility+' ('+responseData.hostel+')' || '');
        }
      } catch (err) {
        console.error(err);
      }
    };

    // Call the getHostel function when the component mounts
    getAdminData();
  }, []);

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
    <div>
      <div className='profileHeader'>
      <nav className="navbar container">
        <div className="logo">
          <h2><b>Mess Management_@MNNIT</b></h2>
        </div>
        <ul className={openHamburger ? "nav-items active" : "nav-items"}>
          <li id='pfp1'>Profile</li>
          <li>Contact</li>
          <li>Details</li>
          <li className='complaint-box' onClick={toggleAddStudent}>Add Student</li>
          {openAddStudent && <AddStudentForm />}
          <div id="pfp2" className="profile-popup-container">
            <li className="profile-button">
              <img src={images.people_first} alt='profile' onClick={toggleProfile} />
            </li>
            {openProfile && (
              <div className="profile-popup">
                <div className='popupHead'>
                  {name && <h3><b>{name}</b></h3>}
                  <br />
                  {responsibility && <h4><b>{responsibility}</b></h4>}
                </div>
                <hr />
                <div className='popupBottom'>
                  <h4 className='change-password' onClick={toggleUpdatePassword}><b>Change Password</b></h4>
                  <br />
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
    <div className='adminProfileBody'>
        <SearchQueries />
    </div>
       
        <Footer/>
    </div>
  )
}

export default AdminProfile
