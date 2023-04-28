import React, { useState, useEffect } from 'react'
import styles from '../stylesheets/card.module.css'
import { useNavigate } from 'react-router-dom/dist'

const Students = ({id}) => {

  const navigate = useNavigate();

  const handleGoToChat = () => {
    navigate(`/student/chat/${id}`);
  };
  
  const [error, setError] = useState(null)
  const [creadentials, setCredentials] = useState({ email: "", mname: ""})

  useEffect(() => {
    const getdata = async() =>{

      const response = await fetch(`http://localhost:6100/api/student/dets/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
  
      const json = await response.json()
      if(json.success)
      {
        setCredentials({email:json.studentdets.email, mname:json.studentdets.stname})

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
              <p className={styles.cardcontent}><button onClick={handleGoToChat}>Go to chat</button></p>
            </div>
        </div>
      </div>
    </div>  
  )
}

export default Students