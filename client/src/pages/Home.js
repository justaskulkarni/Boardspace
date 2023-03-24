import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

import navbar from '../components/navbar'

const Home = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <div>
    <navbar />

      Home

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

export default Home
