import React, { useState, useEffect } from 'react';
import './searchQuery.scss';

 
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
        console.log(responseData)
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
            <h3>Name: {student.first_name + " " + student.last_name}</h3>
            <p><b>Reg.No:</b> {student.reg_no}</p>
            <h4><b>Responsibility:</b> {student.responsibility}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchQueries;
