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
          <li key={complaint.id} className={`complaint-token-admin ${complaint.solved ? 'solved-admin' : 'unsolved-admin'}`}>
            <div className="complaint-details-admin">
              <h3>{complaint.title}</h3><hr />
              <p className="description">{complaint.text}</p><hr />
              {images.intro_mobile && <img src={images.intro_mobile} alt="Complaint Image" className="complaint-image" />}<hr />
              <p>Student: <b>{complaint.studentName}</b></p>
              <p>Registration Number: <b>{complaint.registrationNumber}</b></p>
            </div>
            <div className="complaint-actions-admin">
              <button onClick={() => toggleStatus(complaint.id)} className={complaint.solved ? 'solved-btn' : 'unsolved-btn'}>
                {complaint.solved ? 'Mark Unsolved' : 'Mark Solved'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminComplaintBody;
