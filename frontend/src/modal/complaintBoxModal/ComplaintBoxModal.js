import React, { useState } from 'react';
import './complaintBoxModal.scss';

const ComplaintBoxForm = ({ regno, name, hostel}) => {
  const [complaint, setComplaint] = useState({
    image: null,
    description: '',
  });
  // const [name, setName] = useState('');
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setComplaint({ ...complaint, image: file });
  };

  const handleDescriptionChange = (e) => {
    const description = e.target.value;
    setComplaint({ ...complaint, description });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('image', complaint.image);
      formData.append('description', complaint.description);
      formData.append('name',name);
      formData.append('regNo',regno);
      formData.append('hostel',hostel);
      const response = await fetch('http://localhost:5005/complaint', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      const responseData = await response.json();
      if(responseData.success){
        alert("Complaint submitted...");
        window.location.reload();
      }else{
        alert("Complaint not submitted! Try again...");
      }
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="complaint-box-form">
      <h2>Complaint Box</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group" encType="multipart/form-data">
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Complaint Description:</label>
          <textarea
            id="description"
            value={complaint.description}
            onChange={handleDescriptionChange}
            required
          />
        </div>
        <button type="submit">Submit Complaint</button>
      </form>
    </div>
  );
};

export default ComplaintBoxForm;
