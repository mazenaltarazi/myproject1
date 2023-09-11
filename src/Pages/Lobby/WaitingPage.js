import React, { useEffect,  } from "react";
import "./WaitingPage.css";
import {  useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getConnection, getCreator, getText, getuserId } from "../../Component/redux/connection";

export const WaitingPage = ({ gameName }) => {
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const { id } = useParams();
  const text = getText(state);
  debugger
  const creator=getCreator(state);
  const users = getuserId(state);
  console.log(creator );





  
  const connection = getConnection(state);
  const handleStartGame = async (randomElement) => {
    connection.on((randomElement) => {});
    if (connection) {
      try {
        
        connection.invoke("StartGame", id);
        navigate(`/Container/${id}/${creator}`);
      } catch (error) {
        console.error("Error Create game: ", error);
      }
    }
  };

  useEffect(() => {
    if (text)     navigate(`/Container/${id}/${creator}`);


  }, [text]);

  return (
    <div className="waiting-container">
      <h2>Waiting for {gameName} to Start</h2>
      <div className="spinner"></div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
          </tr>
        </thead>

        <tbody>
        
    {users&&Array.isArray(users)&&users.map((connectionId) => (
          <tr key={connectionId.id}>
            <td>{connectionId.id}</td>
          </tr>
        ))}


     


        </tbody>
      </table>
      {creator && (
        <button onClick={handleStartGame} className="button">
          Start Game
        </button>
      )}
    </div>
  );
};

export default WaitingPage;
