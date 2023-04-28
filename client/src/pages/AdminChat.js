import React from "react";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import styles from '../stylesheets/chat.module.css'
import Navbar from "../components/Navbar";
import jwt_decode from 'jwt-decode'
import sendicon from '../assets/send.png'
import { useParams, useLocation } from 'react-router-dom'

 const SOCKET_URL = "http://localhost:6100";

 const socket = io(SOCKET_URL);

 const AdminChat = () => {

  const location = useLocation();
  const pathArray = location.pathname.split('/');
  const role2 = pathArray[1];
  
  const [currentMessage, setCurrentMessage] = useState("")
  const [currentUserName, setCurrentUserName] = useState("")
  const [ fields, setFields ] = useState("")
  const { id } = useParams();
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
  const handleSubmit = async(e) =>{
    e.preventDefault()
    
    socket.emit("send-room", currentRoom, currentMessage, role, userId, currentUserName, fields)
    setCurrentMessage("")
  }
  const handleSubmit2 = async(e) =>{
    e.preventDefault()
    socket.emit("join-one", roomToJoin)
  }
  socket.off("receive-room").on("receive-room", (message, role, date, time, senderName, toparea, id) =>{
    setMessages(prevMessages => [...prevMessages, { message, role, time, date, senderName, toparea, id }]);
    console.log(time, date)
    
  })

    socket.off("room-messages").on("room-messages", (roomMessages) => {
        roomMessages.forEach((message) => {
          
          setMessages(prevMessages => [...prevMessages, {message: message.content, time: message.time, date: message.date, senderName: message.from, role: message.fromrole, toparea: message.toparea, id: message.fromid}])
        });
    }); 

  useEffect(() =>{
    async function getdetails(){
    
    const response = await fetch("http://localhost:6100/api/chat/details", {
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
  var roomId = id
    roomId += `${role2}-admin`
  
  socket.emit("join-one", roomId)
  setCurrentRoom(roomId)
  socket.emit("getpreviouschats", roomId)
}, [])

   return (
     <>
         
        <Navbar />
      <div className={styles.left}>
        <div><button className={styles.leftbutton} ><span className={styles.notifications1}>Chat Rooms</span></button></div>
        <div className={styles.smallcardleft}>
          <button className={styles.leftbutton} onClick={() => handleButtonClick("Room1")}><span className={styles.notifications}>Room1</span></button>
          <button className={styles.leftbutton} onClick={() => handleButtonClick("Room2")}><span className={styles.notifications}>Room2</span></button>
          <button className={styles.leftbutton} onClick={() => handleButtonClick("Room3")}><span className={styles.notifications}>Room3</span></button>
          <button className={styles.leftbutton} onClick={() => handleButtonClick("Room4")}><span className={styles.notifications}>Room4</span></button>
        </div>
      </div>

      <div className={styles.right}>
        {currentRoom &&
          <h3 className={styles.roomname}>{currentRoom}</h3>
        }
        <div className={styles.innerchat}>
          <ul className={styles.chatMessages}>

            {messages.map((msg, index) => (

              <li className={styles.chatMessage} key={index} style={{ marginLeft: userId === msg.id ? '60%' : '' }}>
                <div className={styles.tooltip}>
                  <div className={styles.chathead}>
                    <p className={styles.date}>{msg.senderName}</p>
                    {msg.toparea &&
                      <p className={styles.toparea}>{msg.toparea}</p>
                    }
                  </div>
                  <p className={styles.message}>{msg.message}</p>
                  <p className={styles.time}>{msg.time}</p>

                </div>
              </li>
            ))}
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

 export default AdminChat 
