import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import '../stylesheets/adminlanding.css'
import dashboardlogo from '../assets/navbarlogo.png'
import jwt_decode from 'jwt-decode'

const AdminLand = () => {

  const [idArray, setIdArray] = useState([]) 
  
  const getdata = async() => {

    const response = await fetch("http://localhost:6100/api/admin/getall", {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    const json = await response.json()

    if(json.success)
    {
      
      const newIdArray = json.data.map(item => item._id);
      setIdArray(newIdArray)
      console.log(newIdArray)
    }
  }
  
  useEffect(() => {
    getdata(); 
  },[idArray])

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
    <>
    <div className="row">
      <div class="column left">
        <div className="imgbox"><img className='imgstyle' src={dashboardlogo} alt="" /></div>
        <div className="smallcardleft"><button className="leftbutton"><span className="notifications">Home</span></button></div>
        <div className="smallcardleft"><button className="leftbutton"><span className="notifications">Messages</span></button></div>
        <div className="smallcardleft"><button className="leftbutton"><span className="notifications">Feedbacks</span></button></div>
        
      </div>
      <div class="column middle">
        <div className="topcontainer">
          <div className="leftbox">
            <span className="analytics">Analytics</span>
            <span className="welcometext">Welcome back, lets get back to work</span>
          </div>
          <div className="rightbox">
            <input type="text" placeholder="Search dashboard" className="searchbox"/>
          </div>
        </div>
        <span className="mentorrequests">Mentor Requests</span>
        <div className="cardcontainer">
          {idArray.map((id) => <Card key={id} mentid={id} />)}
        </div>
      </div>
      <div class="column right">
        <div className="detailscontainer">
          <div className="profilephotobox"></div>
        </div>
        <div className="detailscontainer">
          <span className="mentorrequests">Ojas Binayake</span>
        </div>
        <div className="detailscontainer">
          <span className="welcometext">Admin</span>
        </div>
        <div className="detailscontainer">
          
        {localStorage.getItem("Token") && frole === "Admin" && <button className="logoutbtn" onClick={handleLogout}><span className="welcometext">Logout</span></button>}
        </div>
        <div className="statscontainer">
          <div>
            <div className="detailscontainer">
              <div className="mentorrequests">457</div>
            </div>
            <div className="detailscontainer">
              <span className="welcometext">students</span>
            </div>
          </div>
          <div>
            <div className="detailscontainer">
              <div className="mentorrequests">450</div>
            </div>
            <div className="detailscontainer">
              <span className="welcometext">mentors</span>
            </div>
          </div>
          <div>
            <div className="detailscontainer">
              <div className="mentorrequests">12</div>
            </div>
            <div className="detailscontainer">
              <span className="welcometext">messages</span>
            </div>
          </div>
          {/* 
          <div className="mentorrequests">450</div><br /><span className="welcometext">mentors</span>
          <div className="mentorrequests">12</div><br /><span className="welcometext">students</span> */}

          </div>
      </div>
    </div>
    
    </>
  )
}

export default AdminLand
