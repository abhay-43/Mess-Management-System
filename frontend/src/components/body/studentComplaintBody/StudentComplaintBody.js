// StudentComplaintBody.js
import React, { useState, useEffect } from 'react';
import './studentComplaintBody.scss';
import { images } from '../../../images';

const StudentComplaintBody = ({ complaints }) => {
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
    setFilteredComplaints(filteredList.filter((complaint) => regex.test(complaint.studentName) || regex.test(complaint.registrationNumber)));
    setFilterStatus(status); // Update the current filter status
  };

  const toggleStatus = (id) => {
    // Toggle status logic here
  };

  useEffect(() => {
    handleFilter('all'); // Initial filter: show all complaints
  }, [complaints]); // Re-run the effect when complaints change

  useEffect(() => {
    // Update filtered complaints when search term changes
    handleFilter(filterStatus);
  }, [searchTerm, filterStatus]);

  return (
    <div className="complaint-box-student">
      <div className="filter-buttons-student">
        <button onClick={() => handleFilter('all')} className="all-btn">
          All
        </button>
        <button onClick={() => handleFilter('unsolved')} className="unsolved-btn">
          Unsolved
        </button>
        <button onClick={() => handleFilter('solved')} className="solved-btn">
          Solved
        </button>
      </div>

      <div className="search-bar-student">
        <input
          type="text"
          placeholder="Search by student name or registration number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ul className="complaint-list-student">
        {filteredComplaints.map((complaint) => (
          <li key={complaint.id} className={`complaint-token-student ${complaint.solved ? 'solved-student' : 'unsolved-student'}`}>
            <div className="complaint-details-student">
              <h3>{complaint.title}</h3><hr />
              <p className="description">{complaint.text}</p><hr />
              {images.intro_mobile && <img src={images.intro_mobile} alt="Complaint Image" className="complaint-image" />}<hr />
              <p>Student: <b>{complaint.studentName}</b></p>
              <p>Registration Number: <b>{complaint.registrationNumber}</b></p>
            </div>
            <div className="complaint-actions-student">
              {/* Upvote and downvote buttons */}
              <button className="upvote-btn">&#9650;</button>
              <button className="downvote-btn">&#9660;</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentComplaintBody;

