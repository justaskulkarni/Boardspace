import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import dashboardlogo from '../assets/navbarlogo.png'
import RejectCard from '../components/RejectCard'

const AdminRejected = () => {

  const [idArray, setIdArray] = useState([])
  const [allmetor, setmenor] = useState(0)
  const [allsdent, setstent] = useState(0)

  const getdata = async() => {

    const response = await fetch("http://localhost:6100/api/admin/get/rejected", {
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
      setstent(json.stud)
      setmenor(json.mentors)
    }
  }

  useEffect(() => {
    getdata()
    getnums() 
  },[idArray,allmetor,allsdent])

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
        
        <div className="statscontainer">
          <div>
            <div className="detailscontainer">
              <div className="mentorrequests">{allsdent}</div>
            </div>
            <div className="detailscontainer">
              <span className="welcometext">students</span>
            </div>
          </div>
          <div>
            <div className="detailscontainer">
              <div className="mentorrequests">{allmetor}</div>
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
          <div className="cardcontainer">
            {idArray.map((id) => <RejectCard key={id} mentid={id} />)}
          </div>
      </div>
    </div>
    
    </>
  )
}

export default AdminRejected