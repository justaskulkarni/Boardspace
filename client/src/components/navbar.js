import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

import navbarlogo from '../assets/navbarlogo.png'
import '../stylesheets/navbar.css'

const Navbar = () => {
  
  let navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("Token")
    navigate("/")
  }
  return (
  
    <div className="outerdiv">
      <div><img className='imgdiv' src={navbarlogo} /></div>
      <div>
        {(!localStorage.getItem("Token")) ?
        <div>
          <button className="button1"><Link className='link1' to="/login">Login</Link></button>
          <button className="button1"><Link className='link1' to="/signup">Signup</Link></button>
        </div>
          :
          <button className="button1" onClick={handleLogout}>Logout</button>
        } 
      </div>
    </div>
  )
}

export default Navbar