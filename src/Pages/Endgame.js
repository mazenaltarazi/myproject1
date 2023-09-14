import React from 'react';
import './Endgame.css'; 
import { UNSAFE_RouteContext, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { getAccuracy, getIsValid, getWinnerid, getsignaluserid } from '../redux/connection';
import LeaderboardTable from '../Component/LeaderBaord';

export const WinnerPage = ({ winnerName }) => {
  //const userId=getWinner(state);
  const state = useSelector((state) => state);
  const accuracy = getAccuracy(state);
  const valid = getIsValid(state);


  const navigate = useNavigate();
  const Winner = getWinnerid(state);
  const signaluserid=getsignaluserid(state)
  console.log("signaluserid",signaluserid)
  return (
    <div className="winner-page">
      <h1>Congratulations!</h1>
      <p className="winner-message"><span class="winner">{Winner}</span> is a Winner </p>
      <div className={`accuracy ${valid ? "" : "red-text"}`}><h6>your Score</h6>{accuracy}</div>

      <button className="play-again-button" onClick={() => window.location.href = '/' }>Play Again</button>
      <LeaderboardTable/>
    </div>
  );
};

export default WinnerPage;
