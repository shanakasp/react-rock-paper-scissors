import React, { useEffect, useState } from "react";
import welcomeImage from "../components/images/123.png";
import "./WelcomeScreen.css";

const WelcomeScreen = () => {
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingComplete(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="welcome-screen">
      {!loadingComplete ? (
        <LoadingScreen />
      ) : (
        <>
          <h1>Welcome to Rock Paper Scissors!</h1>
          <p>Get ready to play...</p>
          <img src={welcomeImage} alt="Welcome" className="welcome-image" />
        </>
      )}
    </div>
  );
};

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <h1>Welcome to Rock Paper Scissors!</h1>
      <h2>Loading...</h2>
      <div className="loading-bar"></div>
      <img src={welcomeImage} alt="Welcome" className="welcome-image" />
    </div>
  );
};

export default WelcomeScreen;
