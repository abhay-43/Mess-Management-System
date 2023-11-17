import React, { useState, useEffect } from 'react';
import './searchStudent.scss';
import { images } from '../../../images';

 
const SearchQueries = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [studentsData, setStudentsData] = useState([]);
  
  
  const filteredData = studentsData.filter((student) =>
    Object.values(student).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const delStudents = async(regNo)=>{
    if(window.confirm(`Do you want to remove student with reg.no. ${regNo}?`)){
      try {
        const data = {
          regNo : regNo
        }
        const response = await fetch("http://localhost:5005/delStudents", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body : JSON.stringify(data)
        });
        const responseData = await response.json();
        if (responseData.success){
          alert(`Student with reg.no. ${regNo} removed successfully!`)
        }else{
          alert(`Error Occured in DB, Data doesn't removed!`)
        }
        window.location.reload();
      } catch (err) {
        alert(`Unknown Error Occured...Try again!`)
        console.error(err);
      }
    }
  }

  useEffect( () => {
    const getAllStudents = async () => {
      try {
        const data = {
          hostel : props.hostel
        }
        const response = await fetch("http://localhost:5005/hostel", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body : JSON.stringify(data)
        });
        const responseData = await response.json();
        setStudentsData(responseData);
      } catch (err) {
        console.error(err);
      }
    };
    const fetchData = async () =>{
      await getAllStudents();
    };
    fetchData();
  }, [props.hostel]); 
  

  return (
    <div className="search-queries">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search student data..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="card-container">
        {filteredData.map((student) => (
          <div key={student.reg_no} className="student-card">
    <div className='reg_delete'>
        <h3><b>Name:</b> {student.first_name + " " + student.last_name}</h3>
    </div>
    <div className='reg_delete'>
        <h3><b>Reg.No:</b> {student.reg_no}</h3>
        <img src={images.delete} alt="delete" className="delete-icon" onClick={async() => await delStudents(student.reg_no)}/>
    </div>
    <div className='reg_delete'>
        <h3><b>Responsibility:</b> {student.responsibility}</h3>
    </div>
</div>

        ))}
      </div>
    </div>
  );
};

export default SearchQueries;
