import React, { useState, useEffect } from 'react';
import Footer from '../../components/footer/Footer';
import ProfileHeader from '../../components/header/studentHeader/StudentHeader';
import "./studentProfile.scss"
import ComplaintBody from '../../components/body/studentComplaintBody/StudentComplaintBody';
const Profile = () => {

  // const complaints = [
  //   { id: 1, title: 'Issue 1', text: 'Description of Issue 1', studentName: 'Aamir', solved: true },
  //   { id: 2, title: 'Issue 2', text: 'Description of Issue 2', studentName: 'Bhnau', solved: false },
  //   { id: 3, title: 'Issue 3', text: 'Description of Issue 3', studentName: 'Abhay', solved: true },
  //   { id: 4, title: 'Issue 4', text: 'Description of Issue 4', studentName: 'Ankit', solved: false },
  //   { id: 5, title: 'Issue 5', text: 'Description of Issue 5', studentName: 'Johnny', solved: true },
  //   { id: 6, title: 'Issue 6', text: 'Description of Issue 6', studentName: 'Abhay', solved: false },
  // ];
  const [hostelName, setHostelName] = useState('');
  const [name, setName] = useState('');
  const [regno, setRegno] = useState('');
  const [complaints, setComplaints] = useState([]);

  // useEffect hook to call the getHostel function when the component mounts
  useEffect( () => {
    const getStudentData = async () => {
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

    const getComplaintData = async () => {
      try {
        const data = {
          hostel : hostelName
        }
        const response = await fetch("http://localhost:5005/complaintData", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body : JSON.stringify(data)

        });

        const responseData = await response.json();
        setComplaints(responseData || []);
        console.log(complaints);
      } catch (err) {
        console.error(err);
      }
    };

    // Call the getStudentData function when the component mounts
    const fetchData = async ()=>{
      await getStudentData();
      await getComplaintData();
    };
    fetchData();
  }, [hostelName]); // The empty dependency array ensures that this effect runs only once, similar to componentDidMount

  return (
    <div>
      <ProfileHeader  name = {name} regno = {regno} hostel = {hostelName}/>
      <br />
      <div className='profileBody'>
      <ComplaintBody complaints={complaints} />
      {/* <h3>Name of the Hostel: {hostelName} Hostel</h3> */}

      </div>

      <Footer />
    </div>
  );
};

export default Profile;
