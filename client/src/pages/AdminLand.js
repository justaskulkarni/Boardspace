import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import '../stylesheets/adminlanding.css'
import dashboardlogo from '../assets/navbarlogo.png'

const AdminLand = () => {

  const [idArray, setIdArray] = useState([])
  const [allmentor, setmentor] = useState(0)
  const [allstudent, setstudent] = useState(0)

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
    }
  }
  
  const getnums = async() => {
    const response = await fetch("http://localhost:6100/getnums", {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    const json = await response.json()

    if(json.success)
    {
      setstudent(json.stud)
      setmentor(json.mentors)
    }
  }

  useEffect(() => {
    getdata()
    getnums() 
  },[idArray,allmentor,allstudent])

  let navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("Token")
    navigate("/")
  }

  const getrejected = () => {
    navigate("/admin/rejected/reqs")
  }

  const gethome = () => {
    navigate("/admin/landing")
  }

  return (
    <>
    <div className="row">
      <div className="column left">
        <div className="imgbox"><img className='imgstyle' src={dashboardlogo} alt="" /></div>
        <div className="smallcardleft"><button className="leftbutton" onClick={gethome}><span className="notifications">Home</span></button></div>
        <div className="smallcardleft"><button className="leftbutton"><span className="notifications">Messages</span></button></div>
        <div className="smallcardleft"><button className="leftbutton" onClick={getrejected}><span className="notifications">Rejected</span></button></div>
        {localStorage.getItem("Token") && <button className="logoutbtn" onClick={handleLogout}><span className="welcometext2">Logout</span></button>}
      </div>
      <div className="column middle">
        
          <div className="leftbox">
            <span className="analytics">Analytics</span>
            <span className="welcometext">Welcome back, lets get back to work</span>
          </div>
        
        <span className="mentorrequests2">Mentor Requests</span>
        <div className="cardcontainer">
          {idArray.map((id) => <Card key={id} mentid={id} />)}
        </div>
      </div>
      <div className="column right">
        <div className="detailscontainer">
          <div className="profilephotobox"></div>
        </div>
        <div className="detailscontainer">
          <span className="mentorrequests">Ojas Binayake</span>
        </div>
        <div className="detailscontainer">
          <span className="welcometext">Admin</span>
        </div>
        {/* <div className="detailscontainer">
          
        {localStorage.getItem("Token") && frole === "Admin" && <button className="logoutbtn" onClick={handleLogout}><span className="welcometext">Logout</span></button>}
        </div> */}
        <div className="statscontainer">
          <div>
            <div className="detailscontainer">
              <div className="mentorrequests">{allstudent}</div>
            </div>
            <div className="detailscontainer">
              <span className="welcometext">students</span>
            </div>
          </div>
          <div>
            <div className="detailscontainer">
              <div className="mentorrequests">{allmentor}</div>
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
          </div>
      </div>
    </div>
    
    </>
  )
}

export default AdminLand
