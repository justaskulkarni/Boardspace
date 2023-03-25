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
<<<<<<< HEAD
      <div className="buttons">
        <button className="button1"><Link className='link1' to="/signup">Signup</Link></button>
        <button className="button1"><Link className='link1' to="/login">Login</Link></button>
        <button className="button1">Plans</button>
        <button className="button1">Contact</button>
        <button className="button1">Join</button>
        <button className="button1">Our Team</button>
        <button className="button1">About</button>
        <button className="button1">Services</button>
        <button className="button1" autoFocus>Home</button>
=======
      <div>
        {(!localStorage.getItem("Token")) ?
        <div>
          <button className="button1"><Link className='link1' to="/login">Login</Link></button>
          <button className="button1"><Link className='link1' to="/signup">Signup</Link></button>
        </div>
          :
          <button className="button1" onClick={handleLogout}>Logout</button>
        } 
>>>>>>> 884f3a2317b4a6b10eadd5f386d76fa06c6645b5
      </div>
      
    </div>
  )
}

export default Navbar