import React from 'react';
import './WaitingPage.css'; // Import the CSS file for spinner styles
import { Link } from 'react-router-dom'; // Import Link from react-router-dom


export const WaitingPage = ({ gameName }) => {
    
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
        <tr>
          <td>ahmad</td>
          <td>1205</td>
        </tr>
        <tr>
          <td>sami</td>
          <td>3034</td>
        </tr>
        <tr>
          <td>Faisal</td>
          <td>5504</td>
        </tr>
        <tr>
          <td>salma</td>
          <td>6041</td>
        </tr>
      </tbody>
    </table>
   
    <Link to="/Container"> 
      <button  className="button">
      Satrt Game
      </button>      </Link>
      
    </div>
    
  );
};

export default WaitingPage;
