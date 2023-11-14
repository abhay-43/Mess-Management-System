import React from 'react';
import './Hero.scss';

const Hero = () => {
  return (
    <div className="scrollmenu">
      {/* Home item */}
      <div className="item" id="home">
        <img src="https://images.unsplash.com/photo-1615463738213-b9381d217b4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80" alt="Home"/>
      </div>
      {/* News item */}
      <div className="item" id="news">
        <img src="https://images.unsplash.com/photo-1578301978018-3005759f48f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1144&q=80" alt="News"/>
      </div>
      {/* Contact item */}
      <div className="item" id="contact">
        <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Contact"/>
      </div>
      {/* About item */}
      <div className="item" id="about">
        <img src="https://images.unsplash.com/photo-1581337204873-ef36aa186caa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1156&q=80" alt="About"/>
      </div>
      {/* Duplicate items for testing horizontal scrolling */}
      <div className="item" id="about">
        <img src="https://images.unsplash.com/photo-1581337204873-ef36aa186caa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1156&q=80" alt="About"/>
      </div>
      <div className="item" id="about">
        <img src="https://images.unsplash.com/photo-1581337204873-ef36aa186caa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1156&q=80" alt="About"/>
      </div>
    </div>
  );
}

export default Hero;
