import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import navbarlogo from '../assets/navbarlogo.png'
import styles from '../stylesheets/navbar.module.css'

const Navbar = () => {

  let navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("Token")
    navigate("/")
  }

  return (

    <div className={styles.outerdiv}>
      <div><Link to="/"><img className={styles.imgdiv} src={navbarlogo} alt="" /></Link></div>
      <div className={styles.buttons}>
        {(localStorage.getItem("Token")) ?
          <button className={styles.tail} onClick={handleLogout}>Logout</button>
          :
          <>
            <button className={styles.tail}><Link className={styles.link1} to="/login">Mentor</Link></button>
            <button className={styles.tail}><Link className={styles.link1} to="/student/login">Student</Link></button>
          </>
        }
        <button className={"tail"}>
          <Link className={"link1"} to="/ourteam">
            Our Team
          </Link>
        </button>
      </div>
    </div>
  )
}

export default Navbar
