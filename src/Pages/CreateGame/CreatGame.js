import React, { useEffect, useState } from "react";
import { Link, useNavigate, useNavigation, useParams } from "react-router-dom";

import "./CreatGame.css";
import { useSelector } from "react-redux";
import { getConnection, getGameId, getUserName } from "../../redux/connection";
const CreateGamePage = () => {
  const [gameName, setGameName] = useState("");

  const state = useSelector((state) => state);
  const connection = getConnection(state);
  const navigate = useNavigate();
  const gameId = getGameId(state);
  const userName = getUserName(state);
  const handleJoinGame1 = async () => {
    if (gameName.trim() === "") {
      alert("Please enter game name.");
    } else if (connection) {
      try {
        const result = await connection.invoke("CreateGame", gameName,userName);
        navigate("/Create");
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
        <label htmlFor="gameName"></label>
        <input
          type="text"
          id="gameName"
          value={gameName}
          placeholder="GameName"
          onChange={(e) => setGameName(e.target.value)}
          className="input"
        />
      </div>
      <button
        onClick={() => {
          handleJoinGame1();
        }}
        className="button"
      >
        Create Game
      </button>
    </div>
  );
};

export default CreateGamePage;
