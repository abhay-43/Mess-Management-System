// AdminProfile.js
import Footer from '../../components/footer/Footer';
import React, { useState, useEffect } from 'react';
import { images } from '../../images';
import { useNavigate } from 'react-router-dom';
import '../../components/header/studentHeader/studentHeader.scss';
import '../../scss/profilePopup.scss';
import UpdatePassModal from '../../modal/updatePasswordModal/UpdatePasswordModal';
import UpdateAccountantModal from '../../modal/updateAccountantModal/UpdateAccountantModal';
import AddStudentForm from '../../modal/addStudentModal/AddStudent';
import './adminProfile.scss';
import SearchQueries from '../../components/body/searchStudent/SearchStudent';
import '../../components/body/searchStudent/searchStudent.scss';
import AdminComplaintBody from '../../components/body/adminComplaintBody/AdminComplaintBody';

const AdminProfile = () => {
  const [openHamburger, setOpenHamburger] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openUpdatePassword, setOpenUpdatePassword] = useState(false);
  const [openAccountantProfile, setOpenAccountantProfile] = useState(false);
  const [openUpdateAccountant, setOpenUpdateAccountant] = useState(false);
  const [openAddStudent, setOpenAddStudent] = useState(false);
  const [name, setName] = useState('');
  const [responsibility, setResponsibility] = useState('');
  const [hostel, setHostel] = useState('');

  const toggleHamburger = (e) => {
    e.preventDefault();
    setOpenAddStudent(false);
    setOpenProfile(false);
    setOpenUpdatePassword(false);
    setOpenAccountantProfile(false);
    setOpenUpdateAccountant(false);
    setOpenHamburger(!openHamburger);
  };

  const toggleProfile = () => {
    setOpenAddStudent(false);
    setOpenUpdatePassword(false);
    setOpenAccountantProfile(false);
    setOpenUpdateAccountant(false);
    setOpenProfile(!openProfile);
  };

  const toggleUpdatePassword = () => {
    setOpenAddStudent(false);
    setOpenAccountantProfile(false);
    setOpenUpdateAccountant(false);
    setOpenUpdatePassword(!openUpdatePassword);
  };

  const toggleAddStudent = () => {
    setOpenProfile(false);
    setOpenUpdatePassword(false);
    setOpenUpdateAccountant(false);
    setOpenAccountantProfile(false);
    setOpenAddStudent(!openAddStudent);
  };

  const toggleAccountantProfile = () => {
    setOpenAddStudent(false);
    setOpenUpdatePassword(false);
    setOpenProfile(false);
    setOpenUpdateAccountant(false);
    setOpenAccountantProfile(!openAccountantProfile);
  };

  const toggleUpdateAccountant = () => {
    setOpenAddStudent(false);
    setOpenUpdatePassword(false);
    setOpenProfile(false);
    setOpenAccountantProfile(false);
    setOpenUpdateAccountant(!openUpdateAccountant);
  };

  const complaints = [
    { id: 1, title: 'Issue 1', text: 'Description of Issue 1ggggggggggggggggggggggggggggggggggggggggggg', studentName: 'Aamir', solved: true },
    { id: 2, title: 'Issue 2', text: 'Description of Issue 2', studentName: 'Bhnau', solved: false, registrationNumber: '20214006' },
    { id: 3, title: 'Issue 3', text: 'Description of Issue 3', studentName: 'Abhay', solved: true },
    { id: 4, title: 'Issue 4', text: 'Description of Issue 4', studentName: 'Ankit', solved: false },
    { id: 5, title: 'Issue 5', text: 'Description of Issue 5', studentName: 'Johnny', solved: true },
    { id: 6, title: 'Issue 6', text: 'Description of Issue 6', studentName: 'Abhay', solved: false },
  ];

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
          setName(responseData.first_name + ' ' + responseData.last_name || '');
          setResponsibility(responseData.responsibility + ' (' + responseData.hostel + ')' || '');
          setHostel(responseData.hostel || '');
        }
      } catch (err) {
        console.error(err);
      }
    };

    const fetchData = async () => {
      await getAdminData();
    };
    fetchData();
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
    <div className="adminProfileContainer">
      <div className='profileHeader'>
        <nav className="navbar container">
          <div className="logo">
            <h2><b>Mess Management_@MNNIT</b></h2>
          </div>
          <ul className={openHamburger ? "nav-items active" : "nav-items"}>
            <li id='pfp1' className='link' onClick={toggleProfile}>Profile</li>
            <div className="profile-popup-container">
              <li onClick={toggleAccountantProfile}>Accountant</li>
              {openAccountantProfile && (
                <div className="profile-popup">
                  <div className='popupHead'>
                    {name && <h3><b>{name}</b></h3>}
                    <br />
                    {responsibility && <h4><b>{responsibility}</b></h4>}
                  </div>
                  <hr />
                  <div className='popupBottom'>
                    <h4 className='change-password' onClick={toggleUpdateAccountant}><b>Change Accountant</b></h4>
                  </div>
                </div>
              )}
            </div>
            <li className='link'>Contact</li>
            <li className='complaint-box link' onClick={toggleAddStudent}>Add Student</li>
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
        {openUpdateAccountant && <UpdateAccountantModal setOpenUpdateAccountant={setOpenUpdateAccountant} />}
      </div>
      <div className='adminProfileBody'>
        <SearchQueries hostel={hostel} />
        <AdminComplaintBody complaints={complaints} />
      </div>
      <Footer />
    </div>
  );
};

export default AdminProfile;
