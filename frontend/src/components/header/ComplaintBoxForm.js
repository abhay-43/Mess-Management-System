import React, { useState } from 'react';
import './ComplaintBoxForm.scss';

const ComplaintBoxForm = ({setOpenComplaintBox}) => {
  const [complaint, setComplaint] = useState({
    image: null,
    description: '',
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setComplaint({ ...complaint, image: file });
  };

  const handleDescriptionChange = (e) => {
    const description = e.target.value;
    setComplaint({ ...complaint, description });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenComplaintBox(false);
  };

  return (
    <div className="complaint-box-form">
      <h2>Complaint Box</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
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
          />
        </div>
        <button type="submit">Submit Complaint</button>
      </form>
    </div>
  );
};

export default ComplaintBoxForm;
