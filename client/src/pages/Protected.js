import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Protected() {

  let navigate = useNavigate()

  return (
    <div>
      {(localStorage.getItem("Token")) ?
        <div>
        <Navbar />
        Namaste sir yeh protected hai jara
        </div>
        :
        navigate("/login")
      }
    </div>
  )
}

export default Protected