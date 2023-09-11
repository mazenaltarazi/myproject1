import { combineReducers } from "redux";
import connection from "./connection";
import { configureStore } from "@reduxjs/toolkit";

export const reducers=combineReducers({
    connection,
})
export const store=configureStore({
    reducer:{
        reducers
    }
})
export default store;
