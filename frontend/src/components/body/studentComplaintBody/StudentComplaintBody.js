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
      filteredList = complaints.filter((complaint) => complaint.status);
    } else if (status === 'unsolved') {
      filteredList = complaints.filter((complaint) => !complaint.status);
    }

    // Apply search filter
    const regex = new RegExp(searchTerm, 'i');
    setFilteredComplaints(filteredList.filter((complaint) => regex.test(complaint.name) || regex.test(complaint.reg_no)));
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
          <li key={complaint.complaintid} className={`complaint-token-student ${complaint.status ? 'solved-student' : 'unsolved-student'}`}>
            <div className="complaint-details-student">
              <h3><b>Complaint ID : </b>{complaint.complaintid}</h3><hr />
              <p className="description"><b>Description : </b>{complaint.description}</p><hr />
              {complaint.imglink && <img src={complaint.imglink} alt="Complaint Image" className="complaint-image" />}
              {!complaint.imglink && <img alt="No image attached.." className="complaint-image" />}<hr />
              <p>Student: <b>{complaint.name}</b></p>
              <p>Registration Number: <b>{complaint.reg_no}</b></p>
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