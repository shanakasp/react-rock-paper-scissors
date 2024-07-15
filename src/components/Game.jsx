import React, { useEffect, useState } from "react";
import HowToPlayModal from "./HowToPlayModal";
import Navbar from "./Navbar";
import "./RockPaperScissors.css";
import paperImg from "./images/ppapers.png";
import rockImg from "./images/rrock.png";
import scissorsImg from "./images/sscissors.png";

const choices = {
  rock: { name: "Rock", img: rockImg },
  paper: { name: "Paper", img: paperImg },
  scissors: { name: "Scissors", img: scissorsImg },
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
  const [countdown, setCountdown] = useState(3);
  const [showInstructions, setShowInstructions] = useState(false);
  const [hoveredChoice, setHoveredChoice] = useState(null);

  const handlePlayerChoice = (choice) => {
    setPlayerChoice(choice);
    const computer = getRandomChoice();
    setComputerChoice(computer);
    setCountdown(3);
    setResult("");
    setShowResult(false);
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

  const handleMouseEnter = (choice) => {
    setHoveredChoice(choice);
  };

  const handleMouseLeave = () => {
    setHoveredChoice(null);
  };

  useEffect(() => {
    let countdownInterval = null;
    if (playerChoice !== null) {
      countdownInterval = setInterval(() => {
        setCountdown((prevCount) => prevCount - 1);
      }, 700);
    }
    return () => clearInterval(countdownInterval);
  }, [playerChoice]);

  useEffect(() => {
    if (countdown === 0 && playerChoice !== null) {
      setResult(determineWinner(playerChoice, computerChoice));
      setShowResult(true);
      if (result === "You win!") {
        setUserWins((prev) => prev + 1);
      } else if (result === "Computer wins!") {
        setComputerWins((prev) => prev + 1);
      }
    }
  }, [countdown, playerChoice, computerChoice, result]);

  return (
    <div>
      <Navbar userWins={userWins} computerWins={computerWins} />
      <div className="game-container">
        <h1 className="game-title">Rock Paper Scissors</h1>
        <h4>Pick 1 of 3</h4>
        <div className="choices-container">
          {Object.keys(choices).map((choice) => (
            <div
              key={choice}
              className="choice-wrapper"
              onMouseEnter={() => handleMouseEnter(choice)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handlePlayerChoice(choice)}
            >
              <img
                src={choices[choice].img}
                alt={choice}
                className={`choice-image ${
                  playerChoice === choice ? "selected" : ""
                }`}
              />
              {hoveredChoice === choice && (
                <div className="choice-name">{choices[choice].name}</div>
              )}
            </div>
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
                src={choices[playerChoice].img}
                alt={playerChoice}
                className="result-image"
              />
            </div>
            <div className="result-item">
              <h2>Computer's choice:</h2>
              <img
                src={choices[computerChoice].img}
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
        <HowToPlayModal
          isOpen={showInstructions}
          toggleInstructions={toggleInstructions}
        />
      </div>
    </div>
  );
};

export default RockPaperScissors;
