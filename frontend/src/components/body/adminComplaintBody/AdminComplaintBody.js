// AdminComplaintBody.js
import React, { useState, useEffect } from 'react';
import './adminComplaintBody.scss';
import { images } from '../../../images';

const AdminComplaintBody = ({ complaints }) => {
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
    const updatedComplaints = complaints.map((complaint) =>
      complaint.id === id ? { ...complaint, solved: !complaint.status } : complaint
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
    <div className="complaint-box-admin">
      <div className="filter-buttons-admin">
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

      <div className="search-bar-admin">
        <input
          type="text"
          placeholder="Search by student name or registration number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ul className="complaint-list-admin">
        {filteredComplaints.map((complaint) => (
          <li key={complaint.complaintid} className={`complaint-token-admin ${complaint.status ? 'solved-admin' : 'unsolved-admin'}`}>
            <div className="complaint-details-admin">
              <h3><b>Complaint ID : </b>{complaint.complaintid}</h3><hr />
              <p className="description"><b>Description : </b>{complaint.description}</p><hr />
              {complaint.imglink && <img src={complaint.imglink} alt="Complaint Image" className="complaint-image" />}
              {!complaint.imglink && <img alt="No image attached.." className="complaint-image" />}<hr />
              <p>Student: <b>{complaint.name}</b></p>
              <p>Registration Number: <b>{complaint.reg_no}</b></p>
            </div>
            <div className="complaint-actions-admin">
              <button onClick={() => toggleStatus(complaint.complaintid)} className={complaint.status ? 'solved-btn' : 'unsolved-btn'}>
                {complaint.status ? 'Mark Unsolved' : 'Mark Solved'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminComplaintBody;
