import React, { useState, useEffect } from 'react'
import ImageSlider from './ImageSlider'
import styles from '../stylesheets/card.module.css'
import document from '../assets/document.png'
import verify from '../assets/verify.png'

const Card = ({mentid}) => {

  const [error, setError] = useState(null)
  const [creadentials, setCredentials] = useState({ email: "", mname: ""})
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

      const response = await fetch(`http://localhost:6100/api/admin/verify/mentor/dets/${mentid}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
  
      const json = await response.json()
  
      if(json.success)
      {
        setCredentials({email:json.mentdets.email, mname:json.mentdets.name})
        setImgarr(...imags,json.mentdets.idurl)
      }
  
      if(json.error)
      {
        setError(json.error)
      }
  
    }

    getdata()
  },[])

  const getverify = async() =>{
  
      const response = await fetch(`http://localhost:6100/api/admin/verify/mentor/${mentid}`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
  
      const json = await response.json()
  
      // if(json.success)
      // {
      //   navigate("/admin/landing")
      // }
  
      if(json.error)
      {
        setError(json.error)
      }
  }

  return (
    <div className={styles.cardstyle}>
      <div className={styles.statscontainer}>
        <div className={styles.innerdiv}>
            <div className={styles.innermost1}>
              <p className={styles.cardcontent}>Name: {creadentials.mname}</p>
              <p className={styles.cardcontent}>Email: {creadentials.email} </p>
            </div>
            <div className={styles.innermost}>
              Topper
            </div>
            <div className={styles.innermost}>
              <div className={styles.statscontainer}>
                <div>
                <button className={styles.verifybutton} onClick={handleOpen}><img src={document} className={styles.butimgdiv}></img></button>
                </div>
              </div>
            </div>
            <div className={styles.innermost}>
              <div className={styles.statscontainer}>
                <div>
                <button className={styles.verifybutton} onClick={() => getverify()}><img src={verify} className={styles.butimgdiv}></img></button>
                </div>
              </div>
            </div>
        </div>
      </div>
      {isOpen && (
        <div className={styles.popupcontainer}>
          <div className={styles.popup}>
            <button onClick={handleClose}>Close</button>
            <ImageSlider imgarr = {imags}/>
          </div>
        </div>
      )}
      {error && <div className={styles.error}>{error}</div>}
    </div>  
  )
}

export default Card
