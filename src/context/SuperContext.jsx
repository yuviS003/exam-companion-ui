import { useReducer, useContext, createContext } from "react";
import PropTypes from "prop-types";

// Create a context
const SuperContext = createContext();

// Initial state for your context
const initialState = {};

// Define your reducer function to update the state
const superReducer = (state, action) => {
  switch (action.type) {
    // case "UPDATE_LOGIN_DOC_NAME":
    //   return { ...state, loginDocName: action.payload };
    default:
      return state;
  }
};

// Create a custom hook to access the context
export const useSuperContext = () => {
  return useContext(SuperContext);
};

// Create a context provider component
export const SuperContextProvider = ({ children }) => {
  const [superContextState, superContextDispatch] = useReducer(
    superReducer,
    initialState
  );

  return (
    <SuperContext.Provider
      value={{
        superContextState,
        superContextDispatch,
      }}
    >
      {children}
    </SuperContext.Provider>
  );
};

SuperContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
