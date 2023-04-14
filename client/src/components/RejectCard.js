import React, { useState, useEffect } from 'react'
import ImageSlider from './ImageSlider'
import styles from '../stylesheets/card.module.css'
import document from '../assets/document.png'
import undo from '../assets/undo.png'
import deletelogo from '../assets/delete.png'

const RejectCard = ({mentid}) => {
  
  const [imags, setImgarr] = useState([])
  const [creadentials, setCredentials] = useState({ email: "", mname: "",topper:[]})
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {

  },[])

  const getundo = async() =>{
  
  }

  const getdelete = async() =>{

  }
    
    return (
    <div className={styles.cardstyle}>
      <div className={styles.statscontainer}>
        <div className={styles.innerdiv}>
            <div className={styles.innermost1}>
              <p className={styles.cardcontent}>Name:</p>
              <p className={styles.cardcontent}>Email:</p>
              <p className={styles.cardcontent}>Applied for:</p>
            </div>
            <div className={styles.innermost}>
              <div className={styles.btncontainer}>
                <button className={styles.verifybutton} onClick={handleOpen}><img src={document} className={styles.butimgdiv}></img></button>
                <button className={styles.verifybutton} onClick={() => getundo()}><img src={undo} className={styles.butimgdiv}></img></button>
                <button className={styles.verifybutton} onClick={() => getdelete()} ><img src={deletelogo} className={styles.butimgdiv}></img></button>
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
      
    </div>
  )
}

export default RejectCard
