// ComplaintBody.js
import React, { useState, useEffect } from 'react';
import './studentComplaintBody.scss';

const ComplaintBody = ({ complaints }) => {
  const [filteredComplaints, setFilteredComplaints] = useState(complaints);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleFilter = (status) => {
    let filteredList = complaints;

    // Apply status filter
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

  const handleUpvote = (id) => {
    const updatedComplaints = complaints.map((complaint) =>
      complaint.id === id ? { ...complaint, upvotes: complaint.upvotes + 1 } : complaint
    );
    handleFilter(filterStatus); // Reapply the filter after upvoting
  };

  const handleDownvote = (id) => {
    const updatedComplaints = complaints.map((complaint) =>
      complaint.id === id ? { ...complaint, downvotes: complaint.downvotes + 1 } : complaint
    );
    handleFilter(filterStatus); // Reapply the filter after downvoting
  };

  useEffect(() => {
    handleFilter('all'); // Initial filter: show all complaints
  }, [complaints]); // Re-run the effect when complaints change

  useEffect(() => {
    // Update filtered complaints when search term changes
    handleFilter(filterStatus);
  }, [searchTerm, filterStatus]);

  return (
    <div className="complaint-box1">
      <div className="filter-buttons1">
        <button onClick={() => handleFilter('all')}>All</button>
        <button onClick={() => handleFilter('solved')}>Solved</button>
        <button onClick={() => handleFilter('unsolved')}>Unsolved</button>
      </div>

      <div className="search-bar1">
        <input
          type="text"
          placeholder="Search by student name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ul className="complaint-list1">
        {filteredComplaints.map((complaint) => (
          <li key={complaint.id} className={`complaint-token1 ${complaint.solved ? 'solved1' : 'unsolved1'}`}>
            <div className="complaint-details1">
              <h3>{complaint.title}</h3>
              <p>{complaint.text}</p>
              <p>Student: {complaint.studentName}</p>
              <p>Upvotes: {complaint.upvotes}</p>
              <p>Downvotes: {complaint.downvotes}</p>
            </div>
            <div>
              <button onClick={() => handleUpvote(complaint.id)}>Upvote</button>
              <button onClick={() => handleDownvote(complaint.id)}>Downvote</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComplaintBody;
