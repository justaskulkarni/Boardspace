import React from "react";
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import styles from '../stylesheets/chat.module.css'
import Navbar from "../components/Navbar";
import jwt_decode from 'jwt-decode'
import sendicon from '../assets/send.png'

 const SOCKET_URL = "http://localhost:6100";

 const socket = io(SOCKET_URL);

 const MentorChat = () => {

  const messagesRef = useRef(null);
  const [currentMessage, setCurrentMessage] = useState("")
  const [currentUserName, setCurrentUserName] = useState("")
  const [previousRoom, setPreviousRoom] = useState("")
  const [currentRoom, setCurrentRoom] = useState("")
  const [roomToJoin, setRoomToJoin] = useState("")
  const [messages, setMessages] = useState([]);
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
  const handleSubmit = async(e) =>{
    e.preventDefault()
    
    var decoded = jwt_decode(localStorage.getItem("Token"))
    const role = decoded.role
    const userId = decoded.id
    socket.emit("send-room", currentRoom, currentMessage, role, userId, currentUserName)
    setCurrentMessage("")
  }
  const handleSubmit2 = async(e) =>{
    e.preventDefault()
    socket.emit("join-one", roomToJoin)
  }
  socket.off("receive-room").on("receive-room", (message, role, time, date, senderName) =>{
    setMessages(prevMessages => [...prevMessages, { message, role, time, date, senderName }]);
    
  })

    socket.off("room-messages").on("room-messages", (roomMessages) => {
  /*       setMessages([{message: roomMessages.content, time: roomMessages.time, date: roomMessages.date, roomMessages.fromid, roomMessages.fromrole}]) */
        roomMessages.forEach((message) => {
          
          setMessages(prevMessages => [...prevMessages, {message: message.content, time: message.time, date: message.date, senderName: message.from, role: message.fromrole, toparea: message.toparea}])
        });
    }); 

  useEffect(() =>{
    async function getdetails(){
    var decoded = jwt_decode(localStorage.getItem("Token"))
    const role = decoded.role
    const userId = decoded.id
    const response = await fetch("http://localhost:6100/api/chat/details", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ role: role, userId: userId})
    })

    const json = await response.json()    
    setCurrentUserName(json.name)
  }

  getdetails()
}, [])

   return (
     <>
         <Navbar />
         <div className={styles.row}>
             <div className={styles.column + " " + styles.left}>
                 <div className={styles.smallcardleft}><button className={styles.leftbutton} ><span className={styles.notifications1}>Chat Rooms</span></button></div>
                 <div className={styles.smallcardleft}><button className={styles.leftbutton} onClick={() => handleButtonClick("Room1")}><span className={styles.notifications}>Room1</span></button></div>
                 <div className={styles.smallcardleft}><button className={styles.leftbutton} onClick={() => handleButtonClick("Room2")}><span className={styles.notifications}>Room2</span></button></div>
                 <div className={styles.smallcardleft}><button className={styles.leftbutton} onClick={() => handleButtonClick("Room3")}><span className={styles.notifications}>Room3</span></button></div>
                 <div className={styles.smallcardleft}><button className={styles.leftbutton} onClick={() => handleButtonClick("Room4")}><span className={styles.notifications}>Room4</span></button></div>
                 <div className={styles.smallcardleft}><button className={styles.leftbutton} onClick={() => handleButtonClick("Admin")}><span className={styles.notifications}>Admin</span></button></div>
             </div>
             <div className={styles.column + " " + styles.right}>
                {currentRoom &&
                  <h3>{currentRoom}</h3>
                }
                <ul className={styles.chatMessages}>
                  
                  {messages.map((msg, index) => (
                    <li className={styles.chatMessage} key={index}>
                      <div className={styles.tooltip}>
                        <p className={styles.date}>{msg.senderName}</p>
                        {msg.toparea &&
                          <p className={styles.date}>{msg.toparea}</p>
                        }
                        <p className={styles.message}>{msg.message}</p>
                        
                        <p className={styles.time}>{msg.time}</p>
                        
                      </div>
                    </li>
                  ))}
                  
                </ul>
                
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
         </div>
     </>
   )
 }

 export default MentorChat 
