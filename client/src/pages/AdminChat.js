import React from "react";
import { useState, useEffect } from "react";

import styles from '../stylesheets/chat.module.css'
import styles2 from '../stylesheets/adminlanding.module.css'
import jwt_decode from 'jwt-decode'
import sendicon from '../assets/send.png'
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom'

import dashboardlogo from '../assets/navbarlogo.png'



const AdminChat = () => {

  const location = useLocation();
  const pathArray = location.pathname.split('/');
  const role2 = pathArray[1];

  const [currentMessage, setCurrentMessage] = useState("")
  const currentUserName = "Admin"
  const { id } = useParams();
  const [previousRoom, setPreviousRoom] = useState("")
  const [currentRoom, setCurrentRoom] = useState("")
  const [roomToJoin, setRoomToJoin] = useState("")
  const [messages, setMessages] = useState([])
  const [name, setname] = useState("")

  var decoded = jwt_decode(localStorage.getItem("Token"))
  const role = decoded.role
  const userId = decoded.id

  const handleChange1 = (event) => {
    setCurrentMessage(event.target.value)
  }
  const handleButtonClick = async (roomName) => {
    if (!currentRoom) {
      socket.emit("join-one", roomName, role)
    }
    else {
      socket.emit("join-room", currentRoom, roomName, role)
    }

    socket.emit("getpreviouschats", roomName)

    setMessages([])
    setPreviousRoom(currentRoom)
    setCurrentRoom(roomName);
  };
  const handleSubmit = async (e) => {
    e.preventDefault()

    socket.emit("send-room", currentRoom, currentMessage, role, userId, currentUserName)
    setCurrentMessage("")
  }
  const handleSubmit2 = async (e) => {
    e.preventDefault()
    socket.emit("join-one", roomToJoin)
  }

  useEffect(() => {

    var roomId = id
    roomId += `${role2}-admin`

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
      }
    }

    getname()

    socket.emit("join-one", roomId)
    setCurrentRoom(roomId)
    socket.emit("getpreviouschats", roomId)
    console.log("Inside use Effect")

    socket.on("room-messages", (roomMessages) => {
      roomMessages.forEach((message) => {

        setMessages(prevMessages => [...prevMessages, { message: message.content, time: message.time, date: message.date, senderName: message.from, role: message.fromrole, toparea: message.toparea, id: message.fromid }])
      })
    })

    socket.on("receive-room", (message, role, date, time, senderName, toparea, id) => {
      setMessages(prevMessages => [...prevMessages, { message, role, time, date, senderName, toparea, id }]);
      console.log(time, date)

    })

    return () => {
      socket.off("receive-room")
      socket.off("room-messages")
    }

  }, [id, role2])

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
    
      <div className={styles.column + " " + styles.left}>
        <Link to="/"><img className={styles.imgstyle} src={dashboardlogo} alt="" /></Link>
        <div className={styles.smallcardleftnew}>
          <button className={styles.leftbuttonnew} onClick={gethome}><span className={styles.notificationsnew}>Home</span></button>
          <button className={styles.leftbuttonnew} onClick={getmessages}><span className={styles.notificationsnew}>Mentor Messages</span></button>
          <button className={styles.leftbuttonnew} onClick={getstudentmessages}><span className={styles.notificationsnew}>Student Messages</span></button>
          <button className={styles.leftbuttonnew} onClick={getrejected}><span className={styles.notificationsnew}>Rejected</span></button>
          <button className={styles.leftbuttonnew} onClick={getaccept}><span className={styles.notificationsnew}>Accepted</span></button>
        </div>
        {localStorage.getItem("Token") && <button className={styles.logoutbtn} onClick={handleLogout}><span className={styles.welcometext2}>Logout</span></button>}
      </div>

      <div className={styles.right}>
        {currentRoom &&
          <h3 className={styles.roomname}>{name}</h3>
        }
        <div className={styles.innerchat}>
          <ul className={styles.chatMessages}>
            {messages.map((msg, index) => {
              return (
                <li className={styles.chatMessage} key={index} style={{ marginLeft: userId === msg.id ? '60%' : '' }}>

                  {userId === msg.id ? (
                    <div className={styles.tooltip1} style={{ backgroundColor: msg.role === 'Student' ? '#F0F8FF' : msg.role === 'Admin' ? '#FFE4E1' : msg.role === 'Mentor' ? '#ADD8E6' : '' }}>
                      <div className={styles.chathead}>
                        {msg.toparea && (
                          <p className={styles.toparea}>{msg.toparea}</p>
                        )}
                      </div>
                      <p className={styles.message}>{msg.message}</p>
                      <p className={styles.time}>{msg.time}</p>
                    </div>
                  ) : (
                    <div className={styles.tooltip2} style={{ backgroundColor: msg.role === 'Student' ? '#F0F8FF' : msg.role === 'Admin' ? '#FFE4E1' : msg.role === 'Mentor' ? '#ADD8E6' : '' }}>
                      <div className={styles.chathead}>
                        {msg.toparea && (
                          <p className={styles.toparea}>{msg.toparea}</p>
                        )}
                      </div>
                      <p className={styles.message}>{msg.message}</p>
                      <p className={styles.time}>{msg.time}</p>
                    </div>
                  )}
                </li>
              )
            })}
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
        <div><button className={styles.leftbutton} ><span className={styles.notifications1}>Chat Rooms</span></button></div>
        <div className={styles.smallcardleft}>
          <button className={styles.leftbutton} onClick={() => handleButtonClick("Room1")}><span className={styles.notifications}>Room1</span></button>
          <button className={styles.leftbutton} onClick={() => handleButtonClick("Room2")}><span className={styles.notifications}>Room2</span></button>
          <button className={styles.leftbutton} onClick={() => handleButtonClick("Room3")}><span className={styles.notifications}>Room3</span></button>
          <button className={styles.leftbutton} onClick={() => handleButtonClick("Room4")}><span className={styles.notifications}>Room4</span></button>
        </div>
      </div>
    </>
  )
}

export default AdminChat 
