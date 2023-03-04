// When user is logged in, we have user state that stores the email
// When users logs out the user state becomes null
// Way to provide global state to many different components rather than passing it down as props
// And also update the state by dispatching actions from those components
import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext();


// Parameters - Previous state and action
// Payload - Represents data needed to make the change
// In each of the case we return the new value which we want the state to take
export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
    // Initial state null
    const [state, dispatch] = useReducer(authReducer, { 
    user: null
    });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      dispatch({ type: 'LOGIN', payload: user }) 
    }
  }, []);

  console.log('AuthContext state:', state);
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}