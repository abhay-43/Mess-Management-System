// HostelTable.js

import React from 'react';
import './info.scss';

const HostelTable = () => {
  // Sample data for hostels
  const hostels = [
    { hostelName: 'Malviya', wardenName: 'Aamir', contactInfo: '123-456-7890' },
    { hostelName: 'Tandon', wardenName: 'Abhay', contactInfo: '987-654-3210' },
    // Add more hostel entries as needed
  ];

  return (
    <div className="hostel-table-container">
      <table className="hostel-table">
        <thead>
          <tr>
            <th>Hostel Name</th>
            <th>Warden Name</th>
            <th>Contact Info</th>
          </tr>
        </thead>
        <tbody>
          {hostels.map((hostel, index) => (
            <tr key={index}>
              <td>{hostel.hostelName}</td>
              <td>{hostel.wardenName}</td>
              <td>{hostel.contactInfo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HostelTable;
