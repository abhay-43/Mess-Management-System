import React from 'react'

import Footer from '../../components/footer/Footer'
import ProfileHeader from '../../components/header/ProfileHeader'

const Profile = () => {
  return (
   
      <div>
        <ProfileHeader/>
        <br/>
        <h3>Name of the Hostel: ............</h3>
        <h3>Menu of the mess:</h3>
        <img src='messMenu.jpeg' />

        <Footer/>
      </div>
    
  )
}

export default Profile
