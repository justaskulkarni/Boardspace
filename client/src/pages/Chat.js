import React from "react";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import styles from '../stylesheets/chat.module.css'
import Navbar from "../components/Navbar";
import jwt_decode from 'jwt-decode'
import sendicon from '../assets/send.png'

 const SOCKET_URL = "http://localhost:6100";

 const socket = io(SOCKET_URL);

 const Chat = () => {

  const [currentMessage, setCurrentMessage] = useState("")
  const [previousRoom, setPreviousRoom] = useState("")
  const [currentRoom, setCurrentRoom] = useState("")
  const [roomToJoin, setRoomToJoin] = useState("")
  const [messages, setMessages] = useState([]);
  const handleChange1 = (event) => {
    setCurrentMessage(event.target.value)
  }/*
  const handleChange2 = (event) =>{
    setCurrentRoom(event.target.value)
  }
  const handleChange3 = (event) =>{
    setRoomToJoin(event.target.value)
  } */
  const handleButtonClick = (roomName) => {
    setPreviousRoom(currentRoom)
    setCurrentRoom(roomName);
  };
  const handleSubmit = async(e) =>{
    e.preventDefault()
    /* var decoded = jwt_decode(localStorage.getItem("Token")) 
    const time = getCurrentTime()
    const date = getCurrentDate()
    const role = decoded.role
    const userId = decoded.id
    socket.emit("send-message" , currentMessage, time, date, role, currentRoom, userId) */
    
    var decoded = jwt_decode(localStorage.getItem("Token"))
    const role = decoded.role
    const userId = decoded.id
    socket.emit("send-room", currentRoom, currentMessage, role, userId)
    setCurrentMessage("")
  }
  const handleSubmit2 = async(e) =>{
    e.preventDefault()
    socket.emit("join", roomToJoin)
  }
  socket.off("receive-room").on("receive-room", (message, role, time, date) =>{
    setMessages(prevMessages => [...prevMessages, { message, role, time, date }]);
    console.log(message, role, time, date)
  })

  socket.off("room-messages").on("room-messages", (roomMessages) => {
        setMessages(roomMessages);
        console.log("im here")
        console.log(roomMessages)
  });
    //  const [room, setRoom] = useState("")
    //  const [rooms, setRooms] = useState([]);
    //  const [currentRoom, setCurrentRoom] = useState([]);
    //  const [members, setMembers] = useState([]);
    // const [message, setMessage] = useState("")
    // const [messages, setMessages] = useState([]);
    //  const [privateMemberMsg, setPrivateMemberMsg] = useState({});
    //  const [newMessages, setNewMessages] = useState({});
    
    //  function getFormattedDate() {
    //      const date = new Date();
    //      const year = date.getFullYear();
    //      let month = (1 + date.getMonth()).toString();

    //      month = month.length > 1 ? month : "0" + month;
    //      let day = date.getDate().toString();

    //      day = day.length > 1 ? day : "0" + day;

    //      return month + "/" + day + "/" + year;
    //  }

      /* function joinRoom(room) {
          socket.emit("join-room", room);
          console.log(room)
      } */

      /* useEffect(() => {
          setCurrentRoom("general");
          getRooms();
          socket.emit("join-room", "general");
          socket.emit("new-user");
      }, []); */

    //  socket.off("new-user").on("new-user", (payload) => {
    //      setMembers(payload);
    //  });
    
      /* socket.off("room-messages").on("room-messages", (roomMessages) => {
          setMessages(roomMessages)
          console.log(roomMessages);
      }); */

    //  function getRooms() {
    //      fetch("http://localhost:6001/rooms")
    //          .then((res) => res.json())
    //          .then((data) => setRooms(data));
    //  }
/* 
    const change1 = (event) => {
        setMessage(event.target.value)
    }

    const change2 = (event) => {
        setRoom(event.target.value)
        
    }

    const handleSubmit = (e) => {
        e.preventDefault()  
        socket.emit("send-message" , (message,room))
    }

    socket.off("receive-message").on("receive-message" , (message) => {
        console.log(message)
    }) */

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
                 <div className={styles.smallcardleft}><button className={styles.leftbutton} ><span className={styles.notifications1}>Admins</span></button></div>
                 <div className={styles.smallcardleft}><button className={styles.leftbutton} ><span className={styles.notifications}>Admin1</span></button></div>
                 <div className={styles.smallcardleft}><button className={styles.leftbutton} ><span className={styles.notifications}>Admin2</span></button></div>
             </div>
             <div className={styles.column + " " + styles.right}>
                <ul className={styles.chatMessages}>
                  {messages.map((msg, index) => (
                    <li className={styles.chatMessage} key={index}>
                      <div className={styles.tooltip}>
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
                


                {/* <form onSubmit={handleSubmit2}>
                  <input
                    type="text"
                    name="room name"
                    onChange={handleChange3}
                    placeholder="Type the name of room to join"
                  /> 
                  <button>Join Room</button>
                </form>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="message"
                    onChange={handleChange1}
                    placeholder="Type your message here"
                  /> 
                  <input
                    type="text"
                    name="room"
                    onChange={handleChange2}
                    placeholder="Type the name of the room you want to send this message to"
                  /> 
                  <button>Send Message</button>
                </form> */}

                {/* {messages.map((message) => (
  <div key={message._id}>
    <p>{message.from}</p>
    <p>{message.content}</p>
    <p>{message.time}</p>
    <p>{message.date}</p>
    <p>{message.role}</p>
  </div>
                ))} */}
              </div>
         </div>
     </>
   )
 }

 export default Chat 


/* import React from 'react'

function Chat() {
  return (
    <div>Chat</div>
  )
}

export default Chat 
 */