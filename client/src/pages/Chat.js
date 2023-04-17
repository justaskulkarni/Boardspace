import React from "react";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import styles from '../stylesheets/chat.module.css'
import Navbar from "../components/Navbar";
import jwt_decode from 'jwt-decode'

 const SOCKET_URL = "http://localhost:6100";

 const socket = io(SOCKET_URL);

 const Chat = () => {

  const [currentMessage, setCurrentMessage] = useState("")
  const [currentRoom, setCurrentRoom] = useState("")
  const [messages, setMessages] = useState([]);
  const handleChange1 = (event) => {
    setCurrentMessage(event.target.value)
  }
  const handleChange2 = (event) =>{
    setCurrentRoom(event.target.value)
  }
  const handleSubmit = async(e) =>{
    e.preventDefault()
    var decoded = jwt_decode(localStorage.getItem("Token")) 
    const time = getCurrentTime()
    const date = getCurrentDate()
    const role = decoded.role
    const userId = decoded.id
    socket.emit("send-message" , currentMessage, time, date, role, currentRoom, userId) 
  }
  const getCurrentTime = () => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const getCurrentDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  socket.off("room-messages").on("room-messages", (roomMessages) => {
        setMessages(roomMessages);
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
                 <div className={styles.smallcardleft}><button className={styles.leftbutton} ><span className={styles.notifications}>General</span></button></div>
                 <div className={styles.smallcardleft}><button className={styles.leftbutton} ><span className={styles.notifications}>Room2</span></button></div>
                 <div className={styles.smallcardleft}><button className={styles.leftbutton} ><span className={styles.notifications}>Room3</span></button></div>
                 <div className={styles.smallcardleft}><button className={styles.leftbutton} ><span className={styles.notifications}>Room4</span></button></div>
                 <div className={styles.smallcardleft}><button className={styles.leftbutton} ><span className={styles.notifications1}>Admins</span></button></div>
                 <div className={styles.smallcardleft}><button className={styles.leftbutton} ><span className={styles.notifications}>Admin1</span></button></div>
                 <div className={styles.smallcardleft}><button className={styles.leftbutton} ><span className={styles.notifications}>Admin2</span></button></div>
             </div>
             <div className={styles.column + " " + styles.right}>
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
                </form> 
                {messages.map((message) => (
  <div key={message._id}>
    <p>{message.from}</p>
    <p>{message.content}</p>
    <p>{message.time}</p>
    <p>{message.date}</p>
    <p>{message.role}</p>
  </div>
                ))}
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