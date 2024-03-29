// AdminComplaintBody.js
import React, { useState, useEffect } from 'react';
import './adminComplaintBody.scss';
import { images } from '../../../images';

const AdminComplaintBody = ({ complaints }) => {
  const [filteredComplaints, setFilteredComplaints] = useState(complaints);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');

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

  const changeStatus = async(id)=>{
    if(window.confirm(`Do you want to mark complaint with id ${id} solved ?`)){
      try {
        const data = {
          complaintid : id,
        };
        const response = await fetch("http://localhost:5005/status", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(data),
        });
        const responseData = await response.json();
        if(responseData.success){
          alert(`Complaint with id ${id} is solved..`);
          window.location.reload();
        }else{
          alert(`Complaint status not changed..Try again!`);
        }
      } catch (err) {
        console.error(err);
      }
    }
    
  };

  const openModal = (imageUrl) => {
    setModalOpen(true);
    setModalImage(imageUrl);
  };

  const closeModal = () => {
    setModalOpen(false);
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
              {complaint.imglink && <img src={complaint.imglink} alt="Complaint Image" className="complaint-image" onClick={() => openModal(complaint.imglink)}/>}
              {!complaint.imglink && <img alt="No image attached.." className="complaint-image" />}<hr />
              <p>Student: <b>{complaint.name}</b></p>
              <p>Registration Number: <b>{complaint.reg_no}</b></p>
            </div>
            <div className="complaint-actions-admin">
              {!complaint.status && <button onClick={async() => await changeStatus(complaint.complaintid)} className={complaint.status ? 'solved-btn' : ''}>
                Mark Solved
              </button>}
            </div>
          </li>
        ))}
      </ul>
      {modalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content">
            <img src={modalImage} alt="Complaint Image" className="modal-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminComplaintBody;
