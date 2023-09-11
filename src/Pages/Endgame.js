import React from 'react';
import './Endgame.css'; 
import { UNSAFE_RouteContext, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

import { getAccuracy,getIsValid } from '../Component/redux/connection';
export const WinnerPage = ({ winnerName }) => {
  const state = useSelector((state) => state);

  const accuracy = getAccuracy(state);
  const valid = getIsValid(state);


  const navigate = useNavigate();
  return (
    <div className="winner-page">
      <h1>Congratulations!</h1>
      <p className="winner-message">The winner is: {winnerName}</p>
      <div className={`accuracy ${valid ? "" : "red-text"}`}>{accuracy}</div>

      <button className="play-again-button" onClick={() => window.location.href = '/' }>Play Again</button>
    </div>
  );
};

export default WinnerPage;
