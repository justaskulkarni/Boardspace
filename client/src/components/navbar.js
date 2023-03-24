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
      <div>
        <button className="button1"><Link className='link1' to="/login">Login</Link></button>
        <button className="button1"><Link className='link1' to="/signup">Signup</Link></button>
      </div>
    </div>
  )
}

export default Navbar