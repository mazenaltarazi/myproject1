import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

import './CreatGame.css'
const CreateGamePage = () => {
  const [gameName, setGameName] = useState('');
  const [createdGame, setCreatedGame] = useState(null);

  const handleCreateGame = () => {
    if (gameName.trim() !== '') {
      setCreatedGame(gameName);
    }
  };

  return (
    <div className="container">
      <h1>Create a Game</h1>
      <div className="input-container">
        <label htmlFor="gameName">Game Name:</label>
        <input
          type="text"
          id="gameName"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
          className="input"
        />
      </div>
      <Link to="/waiting"> 
      <button onClick={handleCreateGame}  className="button">
        Create Game
      </button>      </Link>
      
      
      
    </div>
  );
};

export default CreateGamePage;
