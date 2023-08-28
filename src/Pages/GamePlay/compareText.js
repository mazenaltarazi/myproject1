import React, { useState, useEffect, useRef } from 'react';
import * as signalR from '@microsoft/signalr'; // Import the SignalR library

export const TextArea = () => {
  const [randomElement1, setRandomText] = useState('');
  const textareaRef = useRef();

  const connectToSignalRHub = async () => {
    
    try {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5234/hub') 
      .build();

      await connection.start();

      connection.invoke('JoinGame');

     connection.on("ReceiveRandomText", (randomElement) => {
      setRandomText(randomElement); 

  
      // Update your frontend UI to indicate that the game has started
  }); 


    } catch (error) {
      console.error('Error connecting to SignalR hub:', error);
    }
  };

  useEffect(() => {
    connectToSignalRHub();
  }, []);

  return (
    <div>
y      <h1>{randomElement1}</h1>
      <textarea ref={textareaRef}></textarea>
    </div>
  );
};

export default TextArea;
