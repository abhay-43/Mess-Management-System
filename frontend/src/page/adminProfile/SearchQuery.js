import React, { useState } from 'react';
import './searchQuery.scss';
import { images } from '../../images';

const mockData = [
  { reg_no: '20214006', first_name: 'John', last_name: 'Doe', responsibility: 'churan' },
  { reg_no: '20214006', first_name: 'John', last_name: 'Doe', responsibility: 'churan' },
  { reg_no: '20214006', first_name: 'John', last_name: 'Doe', responsibility: 'churan' }
  // Add more data as needed
];

const SearchQueries = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredData = mockData.filter((student) =>
    Object.values(student).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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
            <img src={images.delete} alt="delete" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchQueries;
