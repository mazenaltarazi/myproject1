import React, { useEffect, useState } from "react";
import "./ListGame.css";
import { Link, useNavigate } from "react-router-dom";
import * as signalR from "@microsoft/signalr";
import { useDispatch, useSelector } from "react-redux";

import { StorgeService } from "../Services/storgeService";
import {
  setAccuracy,
  setConnectionObject,
  setIsValid,
  setIsValidText,
  setText,
  setgameId,
  setWinner,
  setuserId,
  setWinnerid,
  setCreator,
  setWpm,
  setsignaluserid,
  setUserName,
} from "../redux/connection";

export const ListGame = () => {
  const [games, setGames] = useState([]);
  const [userName, setuserName] = useState("");

  const state = useSelector((state) => state);
  const [connection, setConnection] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openConnection = async () => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(process.env.REACT_APP_HUB_URL)
      .build();

    connection.on("gameList", (data) => {
      setGames(data);
    });

    connection.on("onvalid", (isvalid) => {
      dispatch(setIsValid({ body: isvalid }));
    });

    connection.on("winGame", (winGame, gameId, userName) => {
      dispatch(setWinner({ body: winGame, gameId, userName }));
    });
    connection.on("sendWinner", (id) => {
      dispatch(setWinnerid({ body: id }));
    });

    connection.on("idsList", (data) => {
      dispatch(setuserId({ body: data }));
    });
    connection.on("Wpm", (Wpm, userName) => {
      dispatch(setWpm({ body: Wpm, userName }));
    });
    connection.on("Creator", (data) => {
      dispatch(setCreator({ body: data }));
    });

    connection.on("invalidText", (text, gameId) => {
      dispatch(setIsValidText({ body: text, gameId }));
    });
    connection.on("signaluserid", (connectionId) => {
      dispatch(setsignaluserid({ body: connectionId }));
    });

    connection.on("CreateGame", (gameId) => {
      dispatch(setgameId({ body: gameId }));
    });

    connection.on("randomElement", (gameId) => {
      dispatch(setText({ body: gameId }));
    });

    connection.on("accuracy", (Time) => {
      dispatch(setAccuracy({ body: Time }));
    });

    dispatch(setConnectionObject({ body: connection }));
    await connection.start();
    StorgeService.set("connection", JSON.stringify(connection));
    setConnection(connection);
  };

  useEffect(() => {
    openConnection();
  }, []);

  const handleJoinGame = async (id) => {
    if (userName.trim() === "") {
      alert("Please enter your name.");
    } else if (connection) {
      try {
        let request = {
          gameId: id,
          userName,
        };

        await connection.invoke("JoinGame", request);
        navigate(`/waiting/${id}`);
      } catch (error) {
        console.error("Error joining game: ", error);
      }
    }
  };

  const handleCreateGame = async () => {
    if (userName.trim() === "") {
      alert("Please enter your name.");
    } else {
      dispatch(setUserName({ body: userName }));
      navigate("/Create");
    }
  };

  return (
    <div className="waiting-container1">
      <div className="Username">
        <input
          type="text"
          id="userName"
          placeholder="Username"
          value={userName}
          onChange={(e) => setuserName(e.target.value)}
          className="input"
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Name of Game</th>
            <th>Join Game</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game, index) => (
            <tr key={index}>
              <td>{game.name}</td>
              <td>
                <button
                  className="button2"
                  onClick={() => handleJoinGame(game.id)}
                >
                  Join Game
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
   
      <button onClick={() => handleCreateGame()} className="button1">
        Create Game
      </button>{" "}
    </div>
  );
};

export default ListGame;
