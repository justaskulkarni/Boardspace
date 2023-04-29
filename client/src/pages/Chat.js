import React from "react";
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import styles from '../stylesheets/chat.module.css'
import Navbar from "../components/Navbar";
import jwt_decode from 'jwt-decode'
import sendicon from '../assets/send.png'


const Chat = (props) => {

  const { socket } = props;
  const messagesRef = useRef(null);
  const [notifications, setNotifications] = useState({})
  const [currentMessage, setCurrentMessage] = useState("")
  const [currentUserName, setCurrentUserName] = useState("")
  const [previousRoom, setPreviousRoom] = useState("")
  const [currentRoom, setCurrentRoom] = useState("")
  const [roomToJoin, setRoomToJoin] = useState("")
  const [messages, setMessages] = useState([]);
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
    setNotifications((prevNotifications) => ({
      ...prevNotifications,
      [roomName]: 0,
    }));
  };
  const handlePersonalChat = async () => {
    var roomId = userId
    roomId += 'student-admin'
    if (!currentRoom) {
      socket.emit("join-one", roomId)
    }
    else {
      socket.emit("join-room", currentRoom, roomId)
    }

    socket.emit("getpreviouschats", roomId)

    setMessages([])
    setPreviousRoom(currentRoom)
    setCurrentRoom(roomId);
    setNotifications((prevNotifications) => ({
      ...prevNotifications,
      [roomId]: 0,
    }));
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
  socket.off("receive-room").on("receive-room", (message, role, date, time, senderName, fields, id) => {
    setMessages(prevMessages => [...prevMessages, { message, role, time, date, senderName, id }]);

  })

  socket.off("room-messages").on("room-messages", (roomMessages) => {

    roomMessages.forEach((message) => {
      setMessages(prevMessages => [...prevMessages, { message: message.content, time: message.time, date: message.date, senderName: message.from, role: message.fromrole, toparea: message.toparea, id: message.fromid }])
    });
  });

  socket.off('notifications').on('notifications', (room) => {
    if (room !== currentRoom) {
      setNotifications((prevNotifications) => ({
        ...prevNotifications,
        [room]: (prevNotifications[room] || 0) + 1,
      }));
    }
  });

  useEffect(() => {
    async function getdetails() {

      const response = await fetch("/api/chat/details", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ role: role, userId: userId })
      })

      const json = await response.json()
      setCurrentUserName(json.name)
    }

    getdetails()
  }, [])

  return (
    <>
      <Navbar />
      <div className={styles.rightmost}>
        <div><button className={styles.leftbutton} ><span className={styles.notifications1}>Chat Rooms</span></button></div>
        <div className={styles.smallcardleft}>
          <button className={styles.leftbutton} onClick={() => handleButtonClick("Room1")}><span className={styles.notifications}>Room1 <span className={styles.notifstyle}>{notifications.Room1 !== 0 ? notifications.Room1 : null}</span>
          </span></button>
          <button className={styles.leftbutton} onClick={() => handleButtonClick("Room2")}><span className={styles.notifications}>Room2 <span className={styles.notifstyle}>{notifications.Room2 !== 0 ? notifications.Room2 : null}</span></span></button>
          <button className={styles.leftbutton} onClick={() => handleButtonClick("Room3")}><span className={styles.notifications}>Room3 <span className={styles.notifstyle}>{notifications.Room3 !== 0 ? notifications.Room3 : null}</span></span></button>
          <button className={styles.leftbutton} onClick={() => handleButtonClick("Room4")}><span className={styles.notifications}>Room4 <span className={styles.notifstyle}>{notifications.Room4 !== 0 ? notifications.Room4 : null}</span></span></button>
        </div>
        <div><button className={styles.leftbutton} onClick={() => handlePersonalChat()}><span className={styles.notifications2}>Admin <span className={styles.notifstyle}>{notifications[`${userId}student-admin`] !== 0 ? notifications[`${userId}student-admin`] : null}</span>
        </span></button></div>
      </div>

      <div className={styles.right}>
        {currentRoom &&
          <h3 className={styles.roomname}>{currentRoom}</h3>
        }
        <div className={styles.innerchat}>
          <ul className={styles.chatMessages}>

            {messages.map((msg, index) => {
              return (
                <li className={styles.chatMessage} key={index} style={{ marginLeft: userId === msg.id ? '60%' : '' }}>

                  {userId === msg.id ? (
                    <div className={styles.tooltip1} style={{ backgroundColor: msg.role === 'Student' ? '#F0F8FF' : msg.role === 'Admin' ? '#FFE4E1' : msg.role === 'Mentor' ? '#ADD8E6' : '' }}>
                      <div className={styles.chathead}>
                        <p className={styles.date}>{msg.senderName}</p>
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
                        <p className={styles.date}>{msg.senderName}</p>
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
    </>
  )
}

export default Chat 
