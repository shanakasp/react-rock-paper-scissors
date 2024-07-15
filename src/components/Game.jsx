import React, { useEffect, useState } from "react";
import "./RockPaperScissors.css"; // External CSS for styling
import paperImg from "./images/paper.png";
import rockImg from "./images/rock.png";
import scissorsImg from "./images/scissors.png";

const choices = {
  rock: rockImg,
  paper: paperImg,
  scissors: scissorsImg,
};

const determineWinner = (playerChoice, computerChoice) => {
  if (playerChoice === computerChoice) {
    return "It's a tie!";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    return "You win!";
  } else {
    return "Computer wins!";
  }
};

const getRandomChoice = () => {
  const choicesArray = Object.keys(choices);
  const randomIndex = Math.floor(Math.random() * choicesArray.length);
  return choicesArray[randomIndex];
};

const RockPaperScissors = () => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");
  const [userWins, setUserWins] = useState(0);
  const [computerWins, setComputerWins] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [countdown, setCountdown] = useState(3); // Countdown from 3 seconds
  const [showInstructions, setShowInstructions] = useState(false);

  const handlePlayerChoice = (choice) => {
    setPlayerChoice(choice);
    const computer = getRandomChoice();
    setComputerChoice(computer);
    setCountdown(3); // Reset countdown for new round
    setResult(""); // Clear previous result
    setShowResult(false); // Hide result until countdown finishes
  };

  const handleTryAgain = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult("");
    setShowResult(false);
  };

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  useEffect(() => {
    let countdownInterval = null;
    if (playerChoice !== null) {
      countdownInterval = setInterval(() => {
        setCountdown((prevCount) => prevCount - 1);
      }, 1000);
    }
    return () => clearInterval(countdownInterval);
  }, [playerChoice]);

  useEffect(() => {
    if (countdown === 0 && playerChoice !== null) {
      setResult(determineWinner(playerChoice, computerChoice));
      setShowResult(true); // Show result after countdown finishes
      if (result === "You win!") {
        setUserWins((prev) => prev + 1);
      } else if (result === "Computer wins!") {
        setComputerWins((prev) => prev + 1);
      }
    }
  }, [countdown, playerChoice, computerChoice, result]);

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-item">User: {userWins}</div>
        <div className="navbar-item">Computer: {computerWins}</div>
      </nav>
      <div className="game-container">
        <h1 className="game-title">Rock Paper Scissors</h1>
        <h4>Pick 1 of 3</h4>
        <div className="choices-container">
          {Object.keys(choices).map((choice) => (
            <img
              key={choice}
              src={choices[choice]}
              alt={choice}
              className={`choice-image ${
                playerChoice === choice ? "selected" : ""
              }`}
              onClick={() => handlePlayerChoice(choice)}
            />
          ))}
        </div>
        {playerChoice && !showResult && (
          <div className="countdown">
            <h2>{countdown}</h2>
            <p>Get ready...</p>
          </div>
        )}
        {showResult && (
          <div className="results-container">
            <div className="result-item">
              <h2>Your choice:</h2>
              <img
                src={choices[playerChoice]}
                alt={playerChoice}
                className="result-image"
              />
            </div>
            <div className="result-item">
              <h2>Computer's choice:</h2>
              <img
                src={choices[computerChoice]}
                alt={computerChoice}
                className="result-image"
              />
            </div>
            <div className="result-item">
              <h2>{result}</h2>
              <button className="try-again-btn" onClick={handleTryAgain}>
                Try Again
              </button>
            </div>
          </div>
        )}
        <button className="how-to-play-btn" onClick={toggleInstructions}>
          How to Play
        </button>
        {showInstructions && (
          <div className="instructions-modal">
            <div className="instructions-content">
              <h2>How to Play Rock Paper Scissors:</h2>
              <p>
                1. Click on one of the three choices (rock, paper, or scissors).
              </p>
              <p>
                2. After selecting, wait for the countdown to see the result.
              </p>
              <p>3. Repeat to play again!</p>
              <button className="close-btn" onClick={toggleInstructions}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RockPaperScissors;
