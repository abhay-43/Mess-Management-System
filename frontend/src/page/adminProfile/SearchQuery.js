import React, { useState } from 'react';
import './searchQuery.scss';

const mockData = [
  { id: 1, name: 'John Doe', regNo: '20210004' },
  { id: 1, name: 'John Doe', regNo: '20210003' },
  { id: 2, name: 'Jane Doe', regNo: '20210001' }
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
          <div key={student.id} className="student-card">
            <h3>{student.name}</h3>
            <p>{student.regNo}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchQueries;
