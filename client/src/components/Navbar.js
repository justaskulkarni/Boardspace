import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

import navbarlogo from '../assets/navbarlogo.png'
import styles from '../stylesheets/navbar.module.css'



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

    <div className={styles.outerdiv}>
      <div><Link to="/"><img className={styles.imgdiv} src={navbarlogo} alt="" /></Link></div>
      <div className={styles.buttons}>
        {(localStorage.getItem("Token") && frole === "Mentor") ?
          <button className={styles.tail} onClick={handleLogout}>Mentor Logout</button>
          :
          <button className={styles.tail}><Link className={styles.link1} to="/login">Mentor</Link></button>
        }

        {(localStorage.getItem("Token") && frole === "Student") ?
          <button className={styles.tail} onClick={handleLogout}>Student Logout</button>
          :
          <button className={styles.tail}><Link className={styles.link1} to="/student/login">Student</Link></button>
        }
        <button className={styles.tail}>Our Team</button>
      </div>
    </div>
  )
}

export default Navbar
