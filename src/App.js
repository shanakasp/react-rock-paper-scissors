import React, { useEffect, useState } from "react";
import "./App.css";
import Game from "./components/Game.jsx";
import WelcomeScreen from "./components/WelcomeScreen.jsx";

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {showWelcome ? (
        <WelcomeScreen />
      ) : (
        <div className="game-container">
          <Game />
        </div>
      )}
    </div>
  );
}

export default App;
