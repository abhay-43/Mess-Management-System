import React, { useState, useEffect } from 'react';
import './searchQuery.scss';


var mockData = [
  { reg_no: '', first_name: '', last_name: '', responsibility: '' }
 ];
 
const SearchQueries = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  
  const filteredData = mockData.filter((student) =>
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
        // setMockData(responseData);
        
        mockData = responseData;
      } catch (err) {
        console.error(err);
      }
    };
  
    getAllStudents();
  }, []); 
  

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
            <h3>{student.first_name + " " + student.last_name}</h3>
            <p>{student.reg_no}</p>
            <p>{student.responsibility}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchQueries;
