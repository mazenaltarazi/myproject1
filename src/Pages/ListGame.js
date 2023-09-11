import React, { useEffect, useState } from "react";
import "./ListGame.css";
import { Link, useNavigate } from "react-router-dom";
import * as signalR from "@microsoft/signalr";
import { useDispatch, useSelector } from "react-redux";

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
  setUserName,
} from "../Component/redux/connection";
import { StorgeService } from "../Services/storgeService";

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

    connection.on("Name", (UserName,userid) => {
      dispatch(setUserName({ body: UserName,userid }));
    });



    connection.on("winGame", (winGame,gameId) => {
      dispatch(setWinner({ body: winGame,gameId }));
    });
    connection.on("sendWinner", (id) => {
      dispatch(setWinnerid({ body: id }));
    });
    
        connection.on("idsList", (data) => {
      dispatch(setuserId({ body: data }));
    });
    connection.on("Creator", (data) => {
      dispatch(setCreator({ body: data }));
    });


    connection.on("invalidText", (text,gameId) => {
      dispatch(setIsValidText({ body: text,gameId }));
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
    if (connection) {
      try {
        let request1 = {
          userName: userName,
        userId: connection.connectionId,
        };

        let request = {
          gameId: id,
        };

        await connection.invoke("JoinGame", request);
        await connection.invoke("SetName", userName);
        navigate(`/waiting/${id}`);
      } catch (error) {
        console.error("Error joining game: ", error);
      }
    }
  };


  const handleCreateGame=async()=>{
    await connection.invoke("SetName", userName);
    navigate("/Create")
  }

  

  return (
    <div className="waiting-container">
      <h2>List of Game</h2>
        <button className="button1">Create Game</button>{" "}
      <label htmlFor="userName"> ,,,,,,,,,,</label>
      <input
          type="text"
          id="userName"
          value={userName}

          onChange={(e) => setuserName(e.target.value)}
          className="input"
        />

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
    </div>
  );
};

export default ListGame;
