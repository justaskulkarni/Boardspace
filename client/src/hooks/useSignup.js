// Custom Hook
// Sends signup request to api end point
// Get back a response
// If successful, then update the AuthContext and update the user property with the user's email so that we can have it in our application

import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useSignup = () =>{
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {dispatch} = useAuthContext();

    const signup = async(username, email, password) =>{
        setIsLoading(true);
        setError(null);
        
        const response = await fetch('/signup', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, email, password})
        });

        const json = await response.json();

        if(!response.ok){
            setIsLoading(false);
            setError(json.error);
        }

        if(response.ok){
            localStorage.setItem('token', JSON.stringify(json));
            dispatch({type: 'LOGIN', payload: json});
            setIsLoading(false);
        }
    }

    return { signup, isLoading, error };
}