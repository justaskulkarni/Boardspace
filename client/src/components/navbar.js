import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import navbarlogo from '../assets/navbarlogo.png'
import '../stylesheets/navbar.css'


const Navbar = () => {
  
  let navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("Mentor")
    navigate("/")
  }

  const handleLogout2 = () => {
    localStorage.removeItem("Student")
    navigate("/")
  }

   return (
  
    <div className="outerdiv">
      <div><img className='imgdiv' src={navbarlogo} alt = "" /></div>
      <div>
        {(!localStorage.getItem("Mentor")) ?
        <div className="buttons">
          <button className="button1"><Link className='link1' to="/login">Mentor</Link></button>
        </div>
          :
          <button className="buttons button1" onClick={handleLogout}>Mentor Logout</button>
        } 

        {(!localStorage.getItem("Student")) ?
        <div className="buttons">
          <button className="button1"><Link className='link1' to="/student/login">Student</Link></button>
        </div>
          :
          <button className="buttons button1" onClick={handleLogout2}>Student Logout</button>
        }

        <button className="button1">Our Team</button>
      </div>
      
    </div>
  )
}

export default Navbar