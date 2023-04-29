import React, { useState, useEffect } from 'react'
import styles from '../stylesheets/card.module.css'
import styles2 from '../stylesheets/imageslider.module.css'
import { useNavigate } from 'react-router-dom/dist'

const Mentors = ({mentid, notifications}) => {

  const navigate = useNavigate();

  const handleGoToChat = () => {
    navigate(`/mentor/chat/${mentid}`);
  };
  
  const [error, setError] = useState(null)
  const [creadentials, setCredentials] = useState({ email: "", mname: "",topper:[]})
  const [imags, setImgarr] = useState([])

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const getdata = async() =>{

      const response = await fetch(`http://localhost:6100/api/admin/mentor/dets/${mentid}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
  
      const json = await response.json()
  
      if(json.success)
      {
        setCredentials({email:json.mentdets.email, mname:json.mentdets.name, topper:json.mentdets.toparea})
        setImgarr(...imags,json.mentdets.idurl)
      }
  
      if(json.error)
      {
        setError(json.error)
      }
  
    }

    getdata()
  },[])

  

  return (
    <div className={styles.cardstyle}>
      <div className={styles.statscontainer}>
        <div className={styles.innerdiv}>
            <div className={styles.innermost1}>
              <p className={styles.cardcontent}>Name: {creadentials.mname}</p>
              <p className={styles.cardcontent}>Fields: {creadentials.topper} </p>
              <p className={styles.cardcontent}>Notifications: {notifications}</p>
              <p className={styles.cardcontent}><button onClick={handleGoToChat}>Go to chat</button></p>
            </div>
        </div>
      </div>
    </div>  
  )
}

export default Mentors