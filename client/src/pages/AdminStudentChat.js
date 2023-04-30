import React from "react";
import { useState, useEffect, useRef } from "react";

import styles from '../stylesheets/chat.module.css'
import styles2 from '../stylesheets/adminlanding.module.css'
import jwt_decode from 'jwt-decode'
import sendicon from '../assets/send.png'
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom'

import dashboardlogo from '../assets/navbarlogo.png'

const AdminStudentChat = (props) => {

  const { socket } = props
  const location = useLocation();
  const pathArray = location.pathname.split('/');
  const fromrole2 = pathArray[1];

  const [currentMessage, setCurrentMessage] = useState("")
  const currentUserName = "Admin"
  const { id } = useParams();
  const [currentRoom, setCurrentRoom] = useState("")
  const [messages, setMessages] = useState([])
  const [name, setname] = useState("")

  const [notifs, setnotifs] = useState([{id : "", count : "", mname:""}])
  

  var decoded = jwt_decode(localStorage.getItem("Token"))
  const fromrole = decoded.fromrole
  const userId = decoded.id

  const handleChange1 = (event) => {
    setCurrentMessage(event.target.value)
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    socket.emit("send-room", currentRoom, currentMessage, "Admin", userId, currentUserName)
    setCurrentMessage("")
  }
  

  const messagesEndRef = useRef(null);

  

  async function getname() {

    const response = await fetch(`/api/student/dets/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const json = await response.json()
    if (json.success) {
      setname(json.studentdets.stname)
      var roomId = id
      roomId += `${fromrole2}-admin`

      socket.emit("join-one", roomId, "Admin")
      setCurrentRoom(roomId)
      
      socket.emit("getpreviouschats", roomId)
      
    }
  }

  async function getname2(givenid){

    const response = await fetch(`/api/student/dets/${givenid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const json = await response.json()

    return json.studentdets.stname
  }

  async function getstudnotf() {

    const response = await fetch("/api/chat/student/notif", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const json = await response.json()

    console.log(json.notif) 

    const updatedNotifs = await Promise.all(json.notif.map(async (singlenotif) => ({ id: singlenotif._id , count: singlenotif.count, mname:await getname2(singlenotif._id) })))
    updatedNotifs.sort((a, b) => b.count - a.count);
    setnotifs(updatedNotifs);

    console.log(notifs) 
    
  }

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }, [messagesEndRef.current])


  useEffect(() => {

    getname()
    getstudnotf()
    
    socket.on("room-messages", (roomMessages) => {
      setMessages(roomMessages)
    })

    socket.on("receive-room", (message, fromrole, date, time, senderName, toparea, id) => {
      setMessages(prevMessages => [...prevMessages, { content: message, fromrole: fromrole, time: time, date: date, from : senderName, toparea, fromid: id }]);
      console.log(time, date)

    })

    return () => {
      socket.off("receive-room")
      socket.off("room-messages")
    }

  }, [notifs])

  let navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("Token")
    navigate("/")
    navigate(0)
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

  const handleNotifButtonClick = (id) => {
    console.log(id)
    navigate(`/student/chat/${id}`)
    navigate(0)
  }

  const getchatrooms = () => {
        navigate("/admin/chatrooms")
        navigate(0)
    }

  return (
    <>

      <div className={styles.column + " " + styles.left}>
        <Link to="/"><img className={styles.imgstyle} src={dashboardlogo} alt="" /></Link>
        <div className={styles.smallcardleftnew}>
          <button className={styles.leftbuttonnew} onClick={gethome}><span className={styles.notificationsnew}>Home</span></button>
          <button className={styles.leftbuttonnew} onClick={getmessages}><span className={styles.notificationsnew}>Mentor Messages</span></button>
          <button className={styles.leftbuttonnew} onClick={getstudentmessages}><span className={styles.notificationsnew}>Student Messages</span></button>
          <button className={styles.leftbuttonnew} onClick={getchatrooms}><span className={styles.notificationsnew}>Chat Rooms</span></button>
          <button className={styles.leftbuttonnew} onClick={getrejected}><span className={styles.notificationsnew}>Rejected</span></button>
          <button className={styles.leftbuttonnew} onClick={getaccept}><span className={styles.notificationsnew}>Accepted</span></button>
        </div>
        {localStorage.getItem("Token") && <button className={styles.logoutbtn} onClick={handleLogout}><span className={styles.welcometext2}>Logout</span></button>}
      </div>

      <div className={styles.right}>
        {currentRoom &&
          <h3 className={styles.roomname}>{name}</h3>
        }
        <div className={styles.innerchat} id="bottomscroll">
          <ul className={styles.chatMessages}>
            {messages.map((msg, index) => {
              return (
                <li className={styles.chatMessage} key={index} style={{ marginLeft: userId === msg.fromid ? '60%' : '' }}>

                  {userId === msg._id ? (
                    <div className={styles.tooltip1} style={{ backgroundColor: msg.fromrole === 'Student' ? '#F0F8FF' : msg.fromrole === 'Admin' ? '#FFE4E1' : msg.fromrole === 'Mentor' ? '#ADD8E6' : '' }}>
                      <div className={styles.chathead}>
                        {!currentRoom.includes("admin") && <p className={styles.date}>{msg.from}</p>}
                        {msg.toparea && (
                          <p className={styles.toparea}>{msg.toparea}</p>
                        )}
                      </div>
                      <p className={styles.message}>{msg.content}</p>
                      <p className={styles.time}>{msg.time.split(':').slice(0, 2).join(':')}</p>
                    </div>
                  ) : (
                    <div className={styles.tooltip2} style={{ backgroundColor: msg.fromrole === 'Student' ? '#F0F8FF' : msg.fromrole === 'Admin' ? '#FFE4E1' : msg.fromrole === 'Mentor' ? '#ADD8E6' : '' }}>
                      <div className={styles.chathead}>
                        {!currentRoom.includes("admin") && <p className={styles.date}>{msg.from}</p>}
                        {msg.toparea && (
                          <p className={styles.toparea}>{msg.toparea}</p>
                        )}
                      </div>
                      <p className={styles.message}>{msg.content}</p>
                      <p className={styles.time}>{msg.time.split(':').slice(0, 2).join(':')}</p>
                    </div>
                  )}
                </li>
              )
            })}
            <div ref={messagesEndRef} />
          </ul>
        </div>
      </div>
      <div className={styles.outinput}>
        {currentRoom &&
          <form onSubmit={handleSubmit} className={styles.chatForm}>
            <input
              type="text"
              name="message"
              value={currentMessage}
              onChange={handleChange1}
              placeholder="Type your message here"
              className={styles.chatInput}
            />
            <button type="submit" className={styles.chatButton}>
              <img src={sendicon} />
            </button>
          </form>
        }
      </div>

      <div className={styles.rightmost}>
            {notifs.map((notif) => (
              <button key={notif.id} className={styles.leftbutton} onClick={() => handleNotifButtonClick(notif.id)}>
                <span className={styles.notifications}>{notif.mname} {notif.count}</span>
              </button>
            ))}
      </div>
    </>
  )
}

export default AdminStudentChat 
