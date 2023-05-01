import React, { useState } from 'react'
import styles from '../stylesheets/chat.module.css'
import dashboardlogo from '../assets/navbarlogo.png'
import { useNavigate, Link, useParams } from "react-router-dom";
import imageupload from '../assets/imageupload.png'
import jwt_decode from "jwt-decode";

import styles2 from '../stylesheets/postpost.module.css'
import { useRef } from 'react';

const PostViewStudent = () => {

    let {findhashtag} = useParams();
    
    let navigate = useNavigate()

    const navigatepost = (hashtag) => {
        navigate(`/student/view/${hashtag}`)
    }

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

    const viewdoubt = () => {
        navigate("/student/view")
      }

    return(

        <React.Fragment>
            <div className={styles.column + " " + styles.left}>
        <Link to="/"><img className={styles.imgstyle} src={dashboardlogo} alt="" /></Link>
        <div className={styles.smallcardleftnew}>
          <button className={styles.leftbuttonnew} onClick={gotochat}><span className={styles.notificationsnew}>Chat</span></button>
          <button className={styles.leftbuttonnew} onClick={gotopost}><span className={styles.notificationsnew}>Post Doubt</span></button>
          <button className={styles.leftbuttonnew} onClick={viewdoubt}><span className={styles.notificationsnew}>View Doubt</span></button>
        </div>
        {localStorage.getItem("Token") && <button className={styles.logoutbtn} onClick={handleLogout}><span className={styles.welcometext2}>Logout</span></button>}
      </div>
    
        <div className={styles.right}>
        {findhashtag && 
            <React.Fragment>
                <h3 className={styles.roomname}>#{findhashtag}</h3>
                <div>
                    <p>Caption :</p>
                    <div>
                        img to come here
                    </div>
                </div>

                <div className={styles2.innercomment}>
                    <div>
                        temp comment
                    </div>
                </div>
                
            </React.Fragment>
        }
        

        </div>

        <div className={styles.rightmost}>
          
        <button className={styles.leftbutton} onClick={() => navigatepost("temp")}><span className={styles.notifications}>Temp</span></button>

        </div>
        </React.Fragment>

    )
}

export default PostViewStudent