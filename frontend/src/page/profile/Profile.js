import React, { useState, useEffect } from 'react';
import Footer from '../../components/footer/Footer';
import ProfileHeader from '../../components/header/ProfileHeader';

const Profile = () => {
  const [hostelName, setHostelName] = useState('');

  // useEffect hook to call the getHostel function when the component mounts
  useEffect(() => {
    const getHostel = async () => {
      try {
        const response = await fetch("http://localhost:5005/hostel", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        const responseData = await response.json();
        if (responseData) {
          setHostelName(responseData.name || '');
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
      <ProfileHeader  />
      <br />
      <h3>Name of the Hostel: {hostelName}</h3>
      <h3>Menu of the mess:</h3>
      <img src='messMenu.jpeg' alt='Mess Menu' />

      <Footer />
    </div>
  );
};

export default Profile;
