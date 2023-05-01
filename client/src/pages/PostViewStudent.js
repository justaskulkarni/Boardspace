import React, { useState } from 'react'
import styles from '../stylesheets/chat.module.css'
import dashboardlogo from '../assets/navbarlogo.png'
import { useNavigate, Link, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";

import styles2 from '../stylesheets/postpost.module.css'

const PostViewStudent = () => {

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
    
        <div className={styles2.space}>
        <div className={styles2.hdtxt}>
          <h3>Header</h3>
        </div>
        <div className={styles2.box}>
          <div className={styles2.boxes}>
            <div className={styles2.intxt}> <b>Header</b> </div>
              <div className={styles2.bxcont}>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                  when an unknown printer took a galley of type and scrambled it to make a type 
                  specimen book. It has survived not only five centuries, but also the leap into
                  electronic typesetting, remaining essentially unchanged. It was popularised in
                  the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                  and more recently with desktop publishing software like Aldus 
                  PageMaker including versions of Lorem Ipsum
                </p>
              </div>
          </div>
          <div className={styles2.boxes}>
          <div className={styles2.intxt}> <b>Header</b> </div>
              <div className={styles2.bxcont}>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                  when an unknown printer took a galley of type and scrambled it to make a type 
                  specimen book. It has survived not only five centuries, but also the leap into
                  electronic typesetting, remaining essentially unchanged. It was popularised in
                  the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                  and more recently with desktop publishing software like Aldus 
                  PageMaker including versions of Lorem Ipsum
                </p>
              </div>
          </div>
          <div className={styles2.boxes}>
          <div className={styles2.intxt}> <b>Header</b> </div>
              <div className={styles2.bxcont}>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                  when an unknown printer took a galley of type and scrambled it to make a type 
                  specimen book. It has survived not only five centuries, but also the leap into
                  electronic typesetting, remaining essentially unchanged. It was popularised in
                  the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                  and more recently with desktop publishing software like Aldus 
                  PageMaker including versions of Lorem Ipsum
                </p>
              </div>
          </div>
          <div className={styles2.boxes}>
          <div className={styles2.intxt}> <b>Header</b> </div>
              <div className={styles2.bxcont}>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                  when an unknown printer took a galley of type and scrambled it to make a type 
                  specimen book. It has survived not only five centuries, but also the leap into
                  electronic typesetting, remaining essentially unchanged. It was popularised in
                  the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                  and more recently with desktop publishing software like Aldus 
                  PageMaker including versions of Lorem Ipsum
                </p>
              </div>
          </div>
          <div className={styles2.boxes}>
          <div className={styles2.intxt}> <b>Header</b> </div>
              <div className={styles2.bxcont}>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                  when an unknown printer took a galley of type and scrambled it to make a type 
                  specimen book. It has survived not only five centuries, but also the leap into
                  electronic typesetting, remaining essentially unchanged. It was popularised in
                  the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                  and more recently with desktop publishing software like Aldus 
                  PageMaker including versions of Lorem Ipsum
                </p>
              </div>
          </div>
          <div className={styles2.boxes}>
          <div className={styles2.intxt}> <b>Header</b> </div>
              <div className={styles2.bxcont}>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                  when an unknown printer took a galley of type and scrambled it to make a type 
                  specimen book. It has survived not only five centuries, but also the leap into
                  electronic typesetting, remaining essentially unchanged. It was popularised in
                  the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                  and more recently with desktop publishing software like Aldus 
                  PageMaker including versions of Lorem Ipsum
                </p>
              </div>
          </div>
          <div className={styles2.boxes}>
          <div className={styles2.intxt}> <b>Header</b> </div>
              <div className={styles2.bxcont}>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                  when an unknown printer took a galley of type and scrambled it to make a type 
                  specimen book. It has survived not only five centuries, but also the leap into
                  electronic typesetting, remaining essentially unchanged. It was popularised in
                  the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                  and more recently with desktop publishing software like Aldus 
                  PageMaker including versions of Lorem Ipsum
                </p>
              </div>
            </div>
          <div className={styles2.boxes}>
          <div className={styles2.intxt}> <b>Header</b> </div>
              <div className={styles2.bxcont}>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                  when an unknown printer took a galley of type and scrambled it to make a type 
                  specimen book. It has survived not only five centuries, but also the leap into
                  electronic typesetting, remaining essentially unchanged. It was popularised in
                  the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                  and more recently with desktop publishing software like Aldus 
                  PageMaker including versions of Lorem Ipsum
                </p>
              </div>
            </div>
          <div className={styles2.boxes}>
            <div className={styles2.intxt}> <b>Header</b> </div>
                <div className={styles2.bxcont}>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley of type and scrambled it to make a type 
                    specimen book. It has survived not only five centuries, but also the leap into
                    electronic typesetting, remaining essentially unchanged. It was popularised in
                    the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                    and more recently with desktop publishing software like Aldus 
                    PageMaker including versions of Lorem Ipsum
                  </p>
                </div>
            </div>
        
        </div>
        
        </div>

        
          
        
        </React.Fragment>

    )
}

export default PostViewStudent