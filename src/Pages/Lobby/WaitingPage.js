import React, { useEffect } from "react";
import "./WaitingPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getConnection,
  getCreator,
  getText,
  getUserName,
  getuserId,
} from "../../redux/connection";

export const WaitingPage = ({ gameName }) => {
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const { id } = useParams();
  const text = getText(state);
  const username = getUserName(state);
  const creator = getCreator(state);
  const users = getuserId(state);
  console.log(creator);

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
  console.log(users)

  useEffect(() => {
    if (text) navigate(`/Container/${id}/${creator}`);
  }, [text]);


  return (
    <div>
    <div className="waiting-container">
      <h2>Waiting for {gameName} to Start</h2>
      <div className="spinner"></div>
      <table>
        <thead>
          <tr>
            <th>players</th>
          </tr>
        </thead>

        <tbody>
          {users &&
            Array.isArray(users) &&
            users.map((user) => (
              <tr key={user.userName}>
                <td>{user.userName}</td>
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
    </div>
  );
};

export default WaitingPage;
