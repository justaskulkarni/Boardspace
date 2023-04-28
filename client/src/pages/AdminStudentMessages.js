import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Students from '../components/Students'
import '../stylesheets/adminlanding.module.css'
import dashboardlogo from '../assets/navbarlogo.png'

const AdminStudentMessages = () => {

  const [allmentor, setmentor] = useState(0)
  const [allstudent, setstudent] = useState(0)
  const [studentIdArray, setStudentIdArray] = useState([])

  const getall = async() =>{
    const response = await fetch("http://localhost:6100/api/student", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })

        const json = await response.json()
        if (json.success) {
            const studentIdArray = json.data.map(item => item._id);
            setStudentIdArray(studentIdArray)
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
    getnums() 
    getall() 
  },[allmentor,allstudent, studentIdArray])

  let navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("Token")
    navigate("/")
  }

  const getrejected = () => {
    navigate("/admin/rejected/reqs")
    navigate(0)
  }

  const gethome = () => {
    navigate("/admin/landing")
    navigate(0)
  }

  const getaccept = () => {
    navigate("/admin/accepted/reqs")
    navigate(0)
  }

  const getmessages = () => {
        navigate("/admin/messages")
        navigate(0)
    }

  const getstudentmessages = () => {
    navigate("/admin-student/messages")
    navigate(0)
  }  

  return (
    <>
    <div className="row">
      <div className="column left">
        <div className="imgbox"><img className='imgstyle' src={dashboardlogo} alt="" /></div>
        <div className="smallcardleft"><button className="leftbutton" onClick={gethome}><span className="notifications">Home</span></button></div>
        <div className="smallcardleft"><button className="leftbutton" onClick={getmessages}><span className="notifications">Mentor Messages</span></button></div>
        <div className="smallcardleft"><button className="leftbutton" onClick={getstudentmessages}><span className="notifications">Student Messages</span></button></div>
        <div className="smallcardleft"><button className="leftbutton" onClick={getrejected}><span className="notifications">Rejected</span></button></div>
        <div className="smallcardleft"><button className="leftbutton" onClick={getaccept}><span className="notifications">Accepted</span></button></div>
        {localStorage.getItem("Token") && <button className="logoutbtn" onClick={handleLogout}><span className="welcometext2">Logout</span></button>}
      </div>
      <div className="column middle">
        
          <div className="leftbox">
            <span className="analytics">Analytics</span>
            <span className="welcometext">Welcome back, lets get back to work</span>
          </div>
        
        <span className="mentorrequests2">Students</span>
        <div className="cardcontainer">
          {studentIdArray.map((id) => <Students key={id} id={id} />)}
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

export default AdminStudentMessages
