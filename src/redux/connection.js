import { createSlice } from "@reduxjs/toolkit";
import { StorgeService } from "../Services/storgeService";

export const connectionSlice = createSlice({
  initialState: {
    isConnected: false,
    connection: null,
    id: null,
    text: "",
    isvalid: true,
    accuracy:null,
    invalidtext:null,
    iswinner:false,
    connectionId:[],
    setuserId:null,
    winnerid:null,
    creator:false,
    Username:null,
    Wpm :null,
    connectionId:null,
  },
  name: "connection",
  
  reducers: {
    setConnectionObject: (state, { payload }) => {
      state.connection = payload.body;
      state.isConnected = true;
    },
    setDisconnected: (state) => {
      state.connection = {};
      state.isConnected = false;
    },
    setgameId: (state, { payload }) => {
      state.id = payload.body;
    },
    setgameId: (state, { payload }) => {
      state.id = payload.body;
    },

    setWinnerid: (state, { payload }) => {
      state.winnerid = payload.body;
    },


    setText: (state, { payload }) => {
      state.text = payload.body;
    },
    
    setWpm: (state, { payload }) => {
      state.Wpm = payload.body;
    },
    
    setuserId: (state, { payload }) => {
      state.connectionId  = payload.body;
    },
    
    setIsValid: (state, { payload }) => {
      state.isvalid = payload.body;
    },
    setWinner: (state, { payload }) => {
      state.iswinner = payload.body;
    },

    setIsValidText: (state, { payload }) => {
      
      state.invalidtext = payload.body;
    },
    setAccuracy: (state, { payload }) => {
      state.accuracy = payload.body;

    },
    setCreator: (state, { payload }) => {
      state.creator = payload.body;

    },
    
    setUserName: (state, { payload }) => {
      state.Username = payload.body;

    },
    setsignaluserid: (state, { payload }) => {
      state.connectionId = payload.body;

    },



  },
});

export const {
  setConnectionObject,
  setDisconnected,
  setgameId,
  setText,
  setIsValid,
  setAccuracy,
  setIsValidText,
  setWinner,
  setuserId,
  setWinnerid,
  setCreator,
  setUserName,
  setWpm,
  setsignaluserid,
  
} = connectionSlice.actions;

export default connectionSlice.reducer;

export const selectConnection = (state) => state.connection.connection;

export const getConnection = (state) => {
  var response;
  if (StorgeService.get("connection"))
     response = JSON.parse(StorgeService.get("connection"));
  return state.reducers.connection.connection ?? response;
};

export const getIsValid = (state) => {
  return state.reducers.connection.isvalid;
};

export const getIsValidText = (state) => {
  return state.reducers.connection.invalidtext;
};


export const getuserId = (state) => {
  return state.reducers.connection.connectionId;
};

export const getWinnerid = (state) => {
  return state.reducers.connection.winnerid;
};
export const getUserName = (state) => {
  return state.reducers.connection.Username;
};

export const getsignaluserid = (state) => {
  return state.reducers.connection.signaluserid;
};

export const getAccuracy =(state)=>{
  return state.reducers.connection.accuracy;
  
};
export const getWpm =(state)=>{
  return state.reducers.connection.Wpm ;
  
};
export const getWinner = (state) => {
  return state.reducers.connection.iswinner;
};
export const getCreator = (state) => {
  return state.reducers.connection.creator;
};

export const getGameId = (state) => {
  return state.reducers.connection.id;
};

export const getText = (state) => {
  return state.reducers.connection.text;
};



