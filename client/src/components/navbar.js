import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import {useAuthContext} from '../hooks/useAuthContext'
const Navbar = () => {
   const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }
  return (
    
    <div>
      Navbar
       {user && (
            <div>
              <span>{user.username}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
      )}
      {!user && (
            <div>
              <button><Link to="/login">Login</Link></button>
              <button><Link to="/signup">Signup</Link></button>
            </div>
      )}
    </div>
  )
}

export default Navbar