import React, { useState } from "react";

const Navbar = ({ userWins, computerWins }) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <nav className="navbar">
      <div className="navbar-item">User: {userWins}</div>
      <div className="navbar-item">Computer: {computerWins}</div>
      <div className="navbar-item2" onClick={togglePopup}>
        Created By
      </div>
      {showPopup && (
        <div className="popup">
          <span className="popup-text">Prince SP</span>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
