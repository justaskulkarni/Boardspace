import React from "react";
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import styles from '../stylesheets/chat.module.css'
import Navbar from "../components/Navbar";
import jwt_decode from 'jwt-decode'
import sendicon from '../assets/send.png'

 const SOCKET_URL = "";

 const socket = io(SOCKET_URL);

 const MentorChat = (props) => {

  const { socket } = props;
  const messagesRef = useRef(null);
  const [notifications, setNotifications] = useState({})
  const [currentMessage, setCurrentMessage] = useState("")
  const [currentUserName, setCurrentUserName] = useState("")
  const [ fields, setFields ] = useState("")
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
  const handleButtonClick = async(roomName) => {
    if(!currentRoom){
      socket.emit("join-one", roomName)
    }
    else{
      socket.emit("join-room", currentRoom, roomName)
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
  const handlePersonalChat = async() => {
    var roomId = userId
    roomId += 'mentor-admin'
    if(!currentRoom){
      socket.emit("join-one", roomId, role)
    }
    else{
      socket.emit("join-room", currentRoom, roomId, role)
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
  const handleSubmit = async(e) =>{
    e.preventDefault()
    
    socket.emit("send-room", currentRoom, currentMessage, role, userId, currentUserName, fields)
    setCurrentMessage("")
  }
  const handleSubmit2 = async(e) =>{
    e.preventDefault()
    socket.emit("join-one", roomToJoin, role)
  }
  /* socket.off("receive-room").on("receive-room", (message, role, date, time, senderName, toparea, id) =>{
    setMessages(prevMessages => [...prevMessages, { message, role, time, date, senderName, toparea, id }]);
    console.log(date, time)
  })

    socket.off("room-messages").on("room-messages", (roomMessages) => {
  
        roomMessages.forEach((message) => {
          
          setMessages(prevMessages => [...prevMessages, {message: message.content, time: message.time, date: message.date, senderName: message.from, role: message.fromrole, toparea: message.toparea, id: message.fromid}])
        });
    }); */ 

    socket.off("receive-room").on("receive-room", (message, fromrole, date, time, senderName, toparea, id) => {
      setMessages(prevMessages => [...prevMessages, { content: message, fromrole: fromrole, time: time, date: date, from : senderName, toparea, fromid: id }]); 
    })

  socket.off("room-messages").on("room-messages", (roomMessages) => {
    setMessages(roomMessages)
  });

    socket.off('notifications').on('notifications', (room) => {
    console.log(room)
    if(room !== currentRoom){
      setNotifications((prevNotifications) => ({
        ...prevNotifications,
        [room]: (prevNotifications[room] || 0) + 1,
      }));
    }
  });

  useEffect(() =>{
    async function getdetails(){
    
    const response = await fetch("/api/chat/details", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ role: role, userId: userId})
    })

    const json = await response.json()    
    console.log(json)
    setCurrentUserName(json.name)
    setFields(json.fields)
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
        <div><button className={styles.leftbutton} onClick={() => handlePersonalChat()}><span className={styles.notifications2}>Admin <span className={styles.notifstyle}>{notifications[`${userId}mentor-admin`] !== 0 ? notifications[`${userId}mentor-admin`] : null}</span>
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
                <li className={styles.chatMessage} key={index} style={{ marginLeft: userId === msg.fromid ? '60%' : '' }}>

                  {userId === msg.id ? (
                    <div className={styles.tooltip1} style={{ backgroundColor: msg.fromrole === 'Student' ? '#F0F8FF' : msg.fromrole === 'Admin' ? '#FFE4E1' : msg.fromrole === 'Mentor' ? '#ADD8E6' : '' }}>
                      <div className={styles.chathead}>
                        <p className={styles.date}>{msg.from}</p>
                        {msg.toparea && (
                          <p className={styles.toparea}>{msg.toparea}</p>
                        )}
                      </div>
                      <p className={styles.message}>{msg.content}</p>
                      <p className={styles.time}>{msg.time.split(':').slice(0, 1).join(':')}</p>
                    </div>
                  ) : (
                    <div className={styles.tooltip2} style={{ backgroundColor: msg.fromrole === 'Student' ? '#F0F8FF' : msg.fromrole === 'Admin' ? '#FFE4E1' : msg.fromrole === 'Mentor' ? '#ADD8E6' : '' }}>
                      <div className={styles.chathead}>
                        <p className={styles.date}>{msg.from}</p>
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

 export default MentorChat 
