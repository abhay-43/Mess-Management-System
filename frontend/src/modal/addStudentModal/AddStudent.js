import React, { useState } from 'react';
import './addStudent.scss'; // AddStudentForm.scss for styling

const AddStudentForm = ({ setAddStudentModal }) => {
  const [studentInfo, setStudentInfo] = useState({
    regNo: '',
    firstName: '',
    lastName: '',
    hostel: '',
    password: '',
    responsibility: '',
  });

  const hostelOptions = ['Tandon', 'Tilak', 'Malviya']; // Add your hostel names

  const handleInputChange = (field, value) => {
    setStudentInfo({ ...studentInfo, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your logic to handle form submission
    try {
      const response = await fetch("http://localhost:5005/addStudents", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(studentInfo)
      });

      const responseData = await response.json();
      if (responseData.success){
        alert(`Student data with reg.no. ${studentInfo.regNo} stored successfully!`)
      }else{
        alert(`Error Occured in DB, Data doesn't stored!`)
      }
      window.location.reload();
    } catch (err) {
      alert(`Unknown Error Occured...Try again!`)
      console.error(err);
    }
  };

  return (
    <div className="add-student-form">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="regNo">Reg. No. :</label>
          <input
            type="text"
            id="regNo"
            value={studentInfo.regNo}
            onChange={(e) => handleInputChange('regNo', e.target.value.replace(/\D/, ''))}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">First Name :</label>
          <input
            type="text"
            id="firstName"
            value={studentInfo.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name :</label>
          <input
            type="text"
            id="lastName"
            value={studentInfo.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="hostel">Hostel Name :</label>
          <select
            id="hostel"
            value={studentInfo.hostel}
            onChange={(e) => handleInputChange('hostel', e.target.value)}
            required
          >
            <option value="">Select Hostel</option>
            {hostelOptions.map((hostel, index) => (
              <option key={index} value={hostel}>
                {hostel}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password :</label>
          <input
            type="password"
            id="password"
            placeholder='DOB : DDMMYYYY'
            value={studentInfo.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="responsibility">Responsibility :</label>
          <select
            id="responsibility"
            value={studentInfo.responsibility}
            onChange={(e) => handleInputChange('responsibility', e.target.value)}
            required
          >
            <option value="">Select Responsibility</option>
            <option value="Mess Manager">Mess Manager</option>
            <option value="Mess Secreatary">Mess Secreatary</option>
            <option value="Mess Member">Mess Member</option>
            <option value="None">None</option>
          </select>
        </div>
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudentForm;
