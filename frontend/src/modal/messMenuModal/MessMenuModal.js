// MessMenuModal.js

import React from 'react';
import './MessMenuModal.scss';
import { images } from '../../images/index';

const MessMenuModal = ({ setOpenMessMenu }) => {
  return (
    <div className="mess-menu-modal">
      <div className="modal-content">
        <span className="close" onClick={() => setOpenMessMenu(false)}>&times;</span>
        {/* Add your Mess Menu image or content here */}
        <img src={images.delete} alt="Mess Menu" />
      </div>
    </div>
  );
};

export default MessMenuModal;
