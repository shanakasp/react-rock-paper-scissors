import React from "react";

const HowToPlayModal = ({ isOpen, toggleInstructions }) => {
  if (!isOpen) return null;

  return (
    <div className="instructions-modal" onClick={toggleInstructions}>
      <div
        className="instructions-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>How to Play Rock Paper Scissors:</h2>
        <p>1. Click on one of the three choices (rock, paper, or scissors).</p>
        <p>2. After selecting, wait for the countdown to see the result.</p>
        <p>
          If you select Rock , you win against Scissors, but lose against Paper.
        </p>
        <p>
          If you select Paper, you win against Rock, but lose against Scissors.
        </p>
        <p>
          If you select Scissors, you win against Paper, but lose against Rock.
        </p>

        <p>3. Repeat to play again!</p>
        <button className="close-btn" onClick={toggleInstructions}>
          Close
        </button>
      </div>
    </div>
  );
};

export default HowToPlayModal;
