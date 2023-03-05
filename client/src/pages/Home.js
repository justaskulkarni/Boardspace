import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      Home
      <button><Link to="/login">Login</Link></button>
      <button><Link to="/signup">Signup</Link></button>
    </div>
  )
}

export default Home
