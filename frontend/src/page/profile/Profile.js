import React, { useState, useEffect } from 'react';
import Footer from '../../components/footer/Footer';
import ProfileHeader from '../../components/header/ProfileHeader';
import "./Profile.scss"
const Profile = () => {
  const [hostelName, setHostelName] = useState('');
  const [name, setName] = useState('');
  const [regno, setRegno] = useState('');

  // useEffect hook to call the getHostel function when the component mounts
  useEffect(() => {
    const getHostel = async () => {
      try {
        const response = await fetch("http://localhost:5005/studentData", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        const responseData = await response.json();
        if (responseData) {
          setHostelName(responseData.hostel || '');
          setName(responseData.first_name+' '+responseData.last_name || '');
          setRegno(responseData.reg_no || '');
        }
      } catch (err) {
        console.error(err);
      }
    };

    // Call the getHostel function when the component mounts
    getHostel();
  }, []); // The empty dependency array ensures that this effect runs only once, similar to componentDidMount

  return (
    <div>
      <ProfileHeader  name = {name} regno = {regno}/>
      <br />
      <div className='profileBody'>
      <h3>Name of the Hostel: {hostelName}</h3>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
