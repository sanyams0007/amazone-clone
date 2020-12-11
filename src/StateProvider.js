import React, { createContext, useContext, useReducer } from "react";

//Prepare the Data-Layer
export const StateContext = createContext();

//Wrap our app and provide access to the Data-Layer to all components
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

//Pull information out from the Data-Layer
export const useStateValue = () => useContext(StateContext);