import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

import navbarlogo from '../assets/navbarlogo.png'
import '../stylesheets/navbar.css'


const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }
  return (

    <div className="outerdiv">
      <div><img className='imgdiv' src={navbarlogo} /></div>
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
      </div>
      
    </div>
  )
}

export default Navbar