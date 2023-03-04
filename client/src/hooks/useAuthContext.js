// Custom Hook
// Returns context with the user property and also the dispatch function (The value that we passed in the provider component)
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () =>{
    const context = useContext(AuthContext);
    // Basically an object having the state and dispatch function
    if(!context){
        throw Error('useAuthContext must be used inside an AuthContextProvider');
    }

    return context;
}