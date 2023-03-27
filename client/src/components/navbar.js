import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

import navbarlogo from '../assets/navbarlogo.png'
import '../stylesheets/navbar.css'


const Navbar = () => {

  let navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("Token")
    navigate("/")
  }

  const returnRole = (reqtoken) => {
    if (reqtoken) {
      var decoded = jwt_decode(reqtoken)
      return (decoded.role)
    }
    else {
      return (null)
    }
  }

  var frole = returnRole(localStorage.getItem("Token"))

  return (

    <div className="outerdiv">
      <div><img className='imgdiv' src={navbarlogo} alt="" /></div>
      <div>
        {(localStorage.getItem("Token") && frole === "Mentor") ?
          <button className="buttons button1" onClick={handleLogout}>Mentor Logout</button>
          :
          <div className="buttons">
            <button className="button1"><Link className='link1' to="/login">Mentor</Link></button>
          </div>
        }

        {(localStorage.getItem("Token") && frole === "Student") ?
          <button className="buttons button1" onClick={handleLogout}>Student Logout</button>
          :
          <div className="buttons">
            <button className="button1"><Link className='link1' to="/student/login">Student</Link></button>
          </div>
        }

        <button className="button1">Our Team</button>
      </div>

    </div>
  )
}

export default Navbar