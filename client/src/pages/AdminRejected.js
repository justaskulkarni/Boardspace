import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import dashboardlogo from '../assets/navbarlogo.png'
import RejectCard from '../components/RejectCard'
import styles from '../stylesheets/adminlanding.module.css'

const AdminRejected = () => {

  const [idArray, setIdArray] = useState([])
  const [allmetor, setmenor] = useState(0)
  const [allsdent, setstent] = useState(0)

  const getdata = async () => {

    const response = await fetch("http://localhost:6100/api/admin/get/rejected", {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    const json = await response.json()
    if (json.success) {
      const newIdArray = json.data.map(item => item._id);
      setIdArray(newIdArray)
    }
  }

  const getnums = async () => {
    const response = await fetch("http://localhost:6100/getnums", {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    const json = await response.json()

    if (json.success) {
      setstent(json.stud)
      setmenor(json.mentors)
    }
  }

  useEffect(() => {
    getdata()
    getnums()
  }, [idArray, allmetor, allsdent])

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
      <div className={styles.row}>
        <div className={styles.column + " " + styles.left}>
          <div className={styles.imgbox}><img className={styles.imgstyle} src={dashboardlogo} alt="" /></div>
          <div className={styles.smallcardleft}><button className={styles.leftbutton} onClick={gethome}><span className={styles.notifications}>Home</span></button></div>
          <div className={styles.smallcardleft}><button className={styles.leftbutton} onClick={getmessages}><span className={styles.notifications}>Mentor Messages</span></button></div>
          <div className={styles.smallcardleft}><button className={styles.leftbutton} onClick={getstudentmessages}><span className={styles.notifications}>Student Messages</span></button></div>
          <div className={styles.smallcardleft}><button className={styles.leftbutton} onClick={getrejected}><span className={styles.notifications}>Rejected</span></button></div>
          <div className={styles.smallcardleft}><button className={styles.leftbutton} onClick={getaccept}><span className={styles.notifications}>Accepted</span></button></div>
          {localStorage.getItem("Token") && <button className={styles.logoutbtn} onClick={handleLogout}><span className={styles.welcometext2}>Logout</span></button>}
        </div>
        <div className={styles.column + " " + styles.middle}>

          <div className={styles.leftbox}>
            <span className={styles.analytics}>Analytics</span>
            <span className={styles.welcometext}>Welcome back, lets get back to work</span>
          </div>
          <span className={styles.mentorrequests2}>Mentor Requests</span>
          <div className={styles.cardcontainer}>
            {idArray.map((id) => <RejectCard key={id} mentid={id} />)}
          </div>
        </div>
        <div className={styles.column + " " + styles.right}>
          <div className={styles.detailscontainer}>
            <div className={styles.profilephotobox}></div>
          </div>
          <div className={styles.detailscontainer}>
            <span className={styles.mentorrequests}>Ojas Binayake</span>
          </div>
          <div className={styles.detailscontainer}>
            <span className={styles.welcometext}>Admin</span>
          </div>
          <div className={styles.statscontainer}>
            <div>
              <div className={styles.detailscontainer}>
                <div className={styles.mentorrequests}>{allsdent}</div>
              </div>
              <div className={styles.detailscontainer}>
                <span className={styles.welcometext}>students</span>
              </div>
            </div>
            <div>
              <div className={styles.detailscontainer}>
                <div className={styles.mentorrequests}>{allmetor}</div>
              </div>
              <div className={styles.detailscontainer}>
                <span className={styles.welcometext}>mentors</span>
              </div>
            </div>
            <div>
              <div className={styles.detailscontainer}>
                <div className={styles.mentorrequests}>12</div>
              </div>
              <div className={styles.detailscontainer}>
                <span className={styles.welcometext}>messages</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default AdminRejected