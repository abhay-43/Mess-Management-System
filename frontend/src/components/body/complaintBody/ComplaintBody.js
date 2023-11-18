// ComplaintBody.js
import React, { useState, useEffect } from 'react';
import './ComplaintBody.scss';

const ComplaintBody = ({ complaints }) => {
  const [filteredComplaints, setFilteredComplaints] = useState(complaints);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleFilter = (status) => {
    let filteredList = complaints;

    if (status === 'solved') {
      filteredList = complaints.filter((complaint) => complaint.solved);
    } else if (status === 'unsolved') {
      filteredList = complaints.filter((complaint) => !complaint.solved);
    }

    // Apply search filter
    const regex = new RegExp(searchTerm, 'i');
    setFilteredComplaints(filteredList.filter((complaint) => regex.test(complaint.studentName)));
    setFilterStatus(status); // Update the current filter status
  };

  const toggleStatus = (id) => {
    const updatedComplaints = complaints.map((complaint) =>
      complaint.id === id ? { ...complaint, solved: !complaint.solved } : complaint
    );
    handleFilter(filterStatus); // Reapply the filter after toggling the status
  };

  useEffect(() => {
    handleFilter('all'); // Initial filter: show all complaints
  }, [complaints]); // Re-run the effect when complaints change

  useEffect(() => {
    // Update filtered complaints when search term changes
    handleFilter(filterStatus);
  }, [searchTerm, filterStatus]);

  return (
    <div className="complaint-box">
      <div className="filter-buttons">
        <button onClick={() => handleFilter('all')}>All</button>
        <button onClick={() => handleFilter('solved')}>Solved</button>
        <button onClick={() => handleFilter('unsolved')}>Unsolved</button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by student name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ul className="complaint-list">
        {filteredComplaints.map((complaint) => (
          <li key={complaint.id} className={`complaint-token ${complaint.solved ? 'solved' : 'unsolved'}`}>
            <div className="complaint-details">
              <h3>{complaint.title}</h3>
              <p>{complaint.text}</p>
              <p>Student: {complaint.studentName}</p>
            </div>
            <button onClick={() => toggleStatus(complaint.id)}>
              {complaint.solved ? 'Mark Unsolved' : 'Mark Solved'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComplaintBody;
