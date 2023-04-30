import React, { useState } from 'react'
import styles from '../stylesheets/chat.module.css'
import dashboardlogo from '../assets/navbarlogo.png'
import { useNavigate, Link } from "react-router-dom";
import imageupload from '../assets/imageupload.png'

import styles2 from '../stylesheets/postpost.module.css'

const PostPostStudent = () => {

  const [image, setImage] = useState(null)

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]))
    }
  }

  let navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("Token")
    navigate("/")
    navigate(0)
  }

  const gotopost = () => {
    navigate("/student/post")
  }

  const gotochat = () => {
    navigate("/student/chat")
  }

  return (
    <React.Fragment>
      <div className={styles.column + " " + styles.left}>
        <Link to="/"><img className={styles.imgstyle} src={dashboardlogo} alt="" /></Link>
        <div className={styles.smallcardleftnew}>
          <button className={styles.leftbuttonnew} onClick={gotochat}><span className={styles.notificationsnew}>Chat</span></button>
          <button className={styles.leftbuttonnew} onClick={gotopost}><span className={styles.notificationsnew}>Post Doubt</span></button>
          <button className={styles.leftbuttonnew} ><span className={styles.notificationsnew}>View Doubt</span></button>
        </div>
        {localStorage.getItem("Token") && <button className={styles.logoutbtn} onClick={handleLogout}><span className={styles.welcometext2}>Logout</span></button>}
      </div>

      <div className={styles.right}>
        <h3 className={styles.roomname}>Post a doubt</h3>
        <label className={styles2.inputlabel}>
          <p className={styles2.text}>Upload image of the doubt : </p>
          <img src={imageupload} className={styles2.inputimg} />
          <input type="file" onChange={onImageChange} className={styles2.imginput} />
        </label>
        {image &&
          <div className={styles2.previewdiv}>
            <p className={styles2.text}>Image Preview : </p>
            <div className={styles2.imgdiv}>
              <img alt="preview image" src={image} className={styles2.previmg} />
            </div>
          </div>}
        <div className={styles2.previewdiv}>
          <label className={styles2.text}>Caption :</label>
            <input type='text' />
          
        </div>
      </div>

      <div className={styles.rightmost}>
        <button className={styles.leftbutton}><span className={styles.notifications}>ID 1</span></button>
      </div>

    </React.Fragment>
  )
}

export default PostPostStudent