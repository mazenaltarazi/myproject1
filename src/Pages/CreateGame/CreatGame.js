
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useNavigation, useParams } from "react-router-dom";

import "./CreatGame.css";
import { useSelector } from "react-redux";
import { getConnection, getGameId } from "../../Component/redux/connection";
const CreateGamePage = () => {
  const [gameName, setGameName] = useState("");
  
  const state = useSelector((state) => state);
  const connection = getConnection(state);
  const navigate = useNavigate();
  const gameId = getGameId(state);
  const handleJoinGame1 = async (name) => {
    if (connection) {
      try {
        const result = await connection.invoke("CreateGame", name);
      } catch (error) {
        console.error("Error Create game: ", error);
      }
    }
  };

  useEffect(() => {
    if (!gameId) return;
    navigate(`/waiting/${gameId}`);

  }, [gameId]);

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
      <button
        onClick={() => {
          handleJoinGame1(gameName);
        }}
        className="button"
      >
        Create Game
      </button>
    </div>
  );
};

export default CreateGamePage;
