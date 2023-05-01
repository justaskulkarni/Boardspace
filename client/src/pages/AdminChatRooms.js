import React from "react";
import { useState, useEffect, useRef } from "react";

import styles from '../stylesheets/chat.module.css'
import jwt_decode from 'jwt-decode'
import sendicon from '../assets/send.png'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import dashboardlogo from '../assets/navbarlogo.png'

import roomlogo from '../assets/roomarrow.png'

const AdminChatRooms = (props) => {

  const { socket } = props


  const [currentMessage, setCurrentMessage] = useState("")
  const currentUserName = "Admin"

  const [previousRoom, setPreviousRoom] = useState("")
  const [currentRoom, setCurrentRoom] = useState("")
  const [roomToJoin, setRoomToJoin] = useState("")
  const [messages, setMessages] = useState([])


  var decoded = jwt_decode(localStorage.getItem("Token"))
  const fromrole = decoded.fromrole
  const userId = decoded.id

  const handleChange1 = (event) => {
    setCurrentMessage(event.target.value)
  }
  const handleButtonClick = async (roomName) => {
    console.log(roomName)
    if (!currentRoom) {
      socket.emit("join-one", roomName, fromrole)
    }
    else {
      socket.emit("join-room", currentRoom, roomName, fromrole)
    }

    socket.emit("getpreviouschats", roomName)

    setMessages([])
    setPreviousRoom(currentRoom)
    setCurrentRoom(roomName);
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (currentMessage.trim() !== "") {
      socket.emit("send-room", currentRoom, currentMessage, "Admin", userId, currentUserName)
    }
    setCurrentMessage("")
  }

  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);


  socket.off("receive-room").on("receive-room", (message, role, date, time, senderName, fields, id) => {
    setMessages(prevMessages => [...prevMessages, { message, role, time, date, senderName, id }]);

  })

  socket.off("room-messages").on("room-messages", (roomMessages) => {

    roomMessages.forEach((message) => {
      setMessages(prevMessages => [...prevMessages, { message: message.content, time: message.time, date: message.date, senderName: message.from, role: message.fromrole, toparea: message.toparea, id: message.fromid }])
    });
  });

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
          <h3 className={styles.roomname}>{currentRoom}</h3>
        }
        <div className={styles.innerchat} ref={chatRef}>
          <ul className={styles.chatMessages}>
            {messages.map((msg, index) => {
              return (
                <li className={styles.chatMessage} key={index} style={{ marginLeft: userId === msg.id ? '60%' : '' }}>

                  {userId === msg.id ? (
                    <div className={styles.tooltip1} style={{ backgroundColor: msg.role === 'Student' ? '#dcefff' : msg.role === 'Admin' ? '#FFE4E1' : msg.role === 'Mentor' ? '#dcffec' : '' }}>
                      <div className={styles.chathead}>
                        <p className={styles.date}>{msg.senderName}</p>
                        {msg.toparea && (
                          <p className={styles.toparea}>{msg.toparea.join(', ')}</p>
                        )}
                      </div>
                      <p className={styles.message}>{msg.message}</p>
                      <div className={styles.flextime}>
                        <p className={styles.time2}>{msg.date}</p>
                        <p className={styles.time}>{msg.time.split(':').slice(0, 2).join(':')}</p>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.tooltip2} style={{ backgroundColor: msg.role === 'Student' ? '#dcefff' : msg.role === 'Admin' ? '#FFE4E1' : msg.role === 'Mentor' ? '#dcffec' : '' }}>
                      <div className={styles.chathead}>
                        <p className={styles.date}>{msg.senderName}</p>
                        {msg.toparea && (
                          <p className={styles.toparea}>{msg.toparea.join(', ')}</p>
                        )}
                      </div>
                      <p className={styles.message}>{msg.message}</p>
                      <div className={styles.flextime}>
                        <p className={styles.time2}>{msg.date}</p>
                        <p className={styles.time}>{msg.time.split(':').slice(0, 2).join(':')}</p>
                      </div>
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
        <div>

        </div>

        <div><button className={styles.leftbutton} ><span className={styles.notifications1}>CHAT ROOMS</span></button></div>
        <div className={styles.smallcardleft}>
          <button className={styles.leftbutton} onClick={() => handleButtonClick("JEE DOUBTS")}><span className={styles.notifications}><img src={roomlogo} style={{ height: "25%", width: "25%" }} /> JEE</span></button>
          <button className={styles.leftbutton} onClick={() => handleButtonClick("NEET DOUBTS")}><span className={styles.notifications}><img src={roomlogo} style={{ height: "22%", width: "22%" }} /> NEET</span></button>
          <button className={styles.leftbutton} onClick={() => handleButtonClick("ICSE DOUBTS")}><span className={styles.notifications}><img src={roomlogo} style={{ height: "22%", width: "22%" }} /> ICSE</span></button>
          <button className={styles.leftbutton} onClick={() => handleButtonClick("CBSE DOUBTS")}><span className={styles.notifications}><img src={roomlogo} style={{ height: "21%", width: "21%" }} /> CBSE</span></button>
          <button className={styles.leftbutton} onClick={() => handleButtonClick("SSC DOUBTS")}><span className={styles.notifications}><img src={roomlogo} style={{ height: "24%", width: "24%" }} /> SSC</span></button>
          <button className={styles.leftbutton} onClick={() => handleButtonClick("IGCSE DOUBTS")}><span className={styles.notifications}><img src={roomlogo} style={{ height: "20%", width: "20%" }} /> IGCSE</span></button>
          <button className={styles.leftbutton} onClick={() => handleButtonClick("ISC DOUBTS")}><span className={styles.notifications}><img src={roomlogo} style={{ height: "25%", width: "25%" }} /> ISC</span></button>
          <button className={styles.leftbutton} onClick={() => handleButtonClick("IB DOUBTS")}><span className={styles.notifications}><img src={roomlogo} style={{ height: "30%", width: "30%" }} /> IB</span></button>
          <button className={styles.leftbutton} onClick={() => handleButtonClick("HSC DOUBTS")}><span className={styles.notifications}><img src={roomlogo} style={{ height: "22%", width: "22%" }} /> HSC</span></button>
        </div>
      </div>
    </>
  )
}

export default AdminChatRooms 
