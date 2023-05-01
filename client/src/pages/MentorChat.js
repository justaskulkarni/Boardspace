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
    
  };
  const handleSubmit = async(e) =>{
    e.preventDefault()
    if(currentMessage.trim() !== ""){
      socket.emit("send-room", currentRoom, currentMessage, role, userId, currentUserName, fields)
    }
    setCurrentMessage("")
  }
   

    socket.off("receive-room").on("receive-room", (message, fromrole, date, time, senderName, toparea, id) => {
      setMessages(prevMessages => [...prevMessages, { content: message, fromrole: fromrole, time: time, date: date, from : senderName, toparea, fromid: id }]); 
    })

  socket.off("room-messages").on("room-messages", (roomMessages) => {
    setMessages(roomMessages)
  });

  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);    

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
          <button className={styles.leftbutton} onClick={() => handleButtonClick("JEE DOUBTS")}><span className={styles.notifications}>JEE Doubts</span></button>
          <button className={styles.leftbutton} onClick={() => handleButtonClick("NEET DOUBTS")}><span className={styles.notifications}>NEET Doubts</span></button>
          <button className={styles.leftbutton} onClick={() => handleButtonClick("ICSE DOUBTS")}><span className={styles.notifications}>ICSE Doubts</span></button>
          <button className={styles.leftbutton} onClick={() => handleButtonClick("CBSE DOUBTS")}><span className={styles.notifications}>CBSE Doubts</span></button>
          <button className={styles.leftbutton} onClick={() => handleButtonClick("SSC DOUBTS")}><span className={styles.notifications}>SSC Doubts</span></button>
          <button className={styles.leftbutton} onClick={() => handleButtonClick("IGCSE DOUBTS")}><span className={styles.notifications}>IGCSE Doubts</span></button>
          <button className={styles.leftbutton} onClick={() => handleButtonClick("ISC DOUBTS")}><span className={styles.notifications}>ISC Doubts</span></button>
          <button className={styles.leftbutton} onClick={() => handleButtonClick("IB DOUBTS")}><span className={styles.notifications}>IB Doubts</span></button>
          <button className={styles.leftbutton} onClick={() => handleButtonClick("HSC DOUBTS")}><span className={styles.notifications}>HSC Doubts</span></button>
        </div>
        <div><button className={styles.leftbutton} onClick={() => handlePersonalChat()}><span className={styles.notifications2}>Admin 
        </span></button></div>
      </div>

      <div className={styles.right}>
        {currentRoom &&
          <h3 className={styles.roomname}>{currentRoom.includes("admin") ? "Admin Chat" : currentRoom}</h3>
        }
        <div className={styles.innerchat} ref={chatRef}>
          <ul className={styles.chatMessages}>

            {messages.map((msg, index) => {
              return (
                <li className={styles.chatMessage} key={index} style={{ marginLeft: userId === msg.fromid ? '60%' : '' }}>

                  {userId === msg.id ? (
                    <div className={styles.tooltip1} style={{ backgroundColor: msg.fromrole === 'Student' ? '#F0F8FF' : msg.fromrole === 'Admin' ? '#FFE4E1' : msg.fromrole === 'Mentor' ? '#ADD8E6' : '' }}>
                      <div className={styles.chathead}>
                        <p className={styles.date}>{msg.from}</p>
                        {msg.toparea && (
                          <p className={styles.toparea}>{msg.toparea.join(', ')}</p>
                        )}
                      </div>
                      <p className={styles.message}>{msg.content}</p>
                      <p className={styles.time}>{msg.time.split(':').slice(0, 2).join(':')}</p>
                    </div>
                  ) : (
                    <div className={styles.tooltip2} style={{ backgroundColor: msg.fromrole === 'Student' ? '#F0F8FF' : msg.fromrole === 'Admin' ? '#FFE4E1' : msg.fromrole === 'Mentor' ? '#ADD8E6' : '' }}>
                      <div className={styles.chathead}>
                        <p className={styles.date}>{msg.from}</p>
                        {msg.toparea && (
                          <p className={styles.toparea}>{msg.toparea.join(', ')}</p>
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
