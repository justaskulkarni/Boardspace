import React from "react";
 import { useState, useEffect } from "react";
 import { io } from "socket.io-client";
 import styles from '../stylesheets/chat.module.css'
 import Navbar from "../components/Navbar";

 const SOCKET_URL = "http://localhost:6100";

 const socket = io(SOCKET_URL);

 const Chat = () => {

    //  const [rooms, setRooms] = useState([]);
    //  const [currentRoom, setCurrentRoom] = useState([]);
    //  const [members, setMembers] = useState([]);
     const [message, setMessage] = useState("")
    //  const [messages, setMessages] = useState([]);
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

    //  function joinRoom(room, isPublic = true) {
    //      socket.emit("join-room", room, currentRoom);
    //      setCurrentRoom(room);

    //      if (isPublic) {
    //          setPrivateMemberMsg(null);
    //      }
    //  }

    //  useEffect(() => {
    //      setCurrentRoom("general");
    //      getRooms();
    //      socket.emit("join-room", "general");
    //      socket.emit("new-user");
    //  }, []);

    //  socket.off("new-user").on("new-user", (payload) => {
    //      setMembers(payload);
    //  });
    
    //  socket.off("room-messages").on("room-messages", (roomMessages) => {
    //      setMessages(roomMessages);
    //  });

    //  function getRooms() {
    //      fetch("http://localhost:6001/rooms")
    //          .then((res) => res.json())
    //          .then((data) => setRooms(data));
    //  }

    const change1 = (event) => {
        setMessage(event.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        socket.emit("send-message" , (message))
    }

    socket.off("receive-message").on("receive-message" , (message) => {
        console.log(message)
    })

   return (
     <>
         <Navbar />
         <div className={styles.row}>
             <div className={styles.column + " " + styles.left}>
                 <div className={styles.smallcardleft}><button className={styles.leftbutton} ><span className={styles.notifications1}>Chat Rooms</span></button></div>
                 <div className={styles.smallcardleft}><button className={styles.leftbutton} ><span className={styles.notifications}>Room1</span></button></div>
                 <div className={styles.smallcardleft}><button className={styles.leftbutton} ><span className={styles.notifications}>Room2</span></button></div>
                 <div className={styles.smallcardleft}><button className={styles.leftbutton} ><span className={styles.notifications}>Room3</span></button></div>
                 <div className={styles.smallcardleft}><button className={styles.leftbutton} ><span className={styles.notifications}>Room4</span></button></div>
                 <div className={styles.smallcardleft}><button className={styles.leftbutton} ><span className={styles.notifications1}>Admins</span></button></div>
                 <div className={styles.smallcardleft}><button className={styles.leftbutton} ><span className={styles.notifications}>Admin1</span></button></div>
                 <div className={styles.smallcardleft}><button className={styles.leftbutton} ><span className={styles.notifications}>Admin2</span></button></div>
             </div>
             <div className={styles.column + " " + styles.right}>
                 Yaha pe chats aayenge
                 <form onSubmit={handleSubmit}>
                 <input type="text" onChange={change1}/>
                 <button>send</button>
                 </form>
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