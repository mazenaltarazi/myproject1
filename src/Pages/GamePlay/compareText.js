import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  getConnection,
  getIsValid,
  getText,
  getAccuracy,
  getIsValidText,
  getWinner,
  getWinnerid,
  getuserId,
} from "../../Component/redux/connection";
import { useSelector } from "react-redux";
export const TextArea = () => {
  const navigate = useNavigate();

  const state = useSelector((state) => state);
  const text = getText(state);

  const textareaRef = useRef();
  const { id } = useParams();
  const connection = getConnection(state);
  const valid = getIsValid(state);
  const invalidText = getIsValidText(state);
  const Winner = getWinner(state);
  const accuracy = getAccuracy(state);
  const canvasRef=useRef()
  const [Accuracy, setAccuracy] = useState(null);
  const users = getuserId(state);


  const changeHandler = async (e) => {
    let word;
    
    try {
      if (valid) {
        textareaRef.current.value = e.target.value;
  
        const words = e.target.value.split(" ");
  
        await connection.invoke("CalculateTime", id);
        await connection.invoke("Calculateaccuracy", words?.length, id);
      }
  
      await connection.invoke("Validate", id, e.target.value);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
 
  
  
  
  
  
  
  const relodPage = async () => {
    connection.invoke("RelodPage", id);
  };
  useEffect(() => {
    relodPage();
  }, [id]);

  useEffect(() => {
    if (invalidText) textareaRef.current.value = invalidText;
  }, [invalidText]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.font = '25px Arial';
    context.fillStyle = 'blue';

    context.fillText(text, 50, 50);
  }, [text]);


  /*
  if (Winner) {
    connection.invoke("sendWinner", users ) 
     
  }
*/
 
  useEffect(() => {
    if (Winner) navigate(`/Winner/${id}`);
  }, [Winner]);


  useEffect(() => {
    const accuracyTimeout = setTimeout(() => {
      setAccuracy(getAccuracy(state));
    }, 500);

    return () => {
      clearTimeout(accuracyTimeout);
    };
  }, [state]);

  return (
    <>
      <canvas ref={canvasRef} width={1000} height={200}></canvas>
      <div>
        <textarea
          autocomplete="off"
          ref={textareaRef}
          onChange={(e) => {
            changeHandler(e);
          }}
        ></textarea>
 <div className={`accuracy ${valid ? "" : "red-text"}`}>
          {Accuracy !== null ? Accuracy : "0.0"}
        </div>        <h6 className="k">Wpm</h6>
      </div>
    </>
  );
};

export default TextArea;
