import React, { useState, useEffect } from 'react'
import styles from '../stylesheets/chat.module.css'
import dashboardlogo from '../assets/navbarlogo.png'
import { useNavigate, Link, useParams } from "react-router-dom";
import imageupload from '../assets/imageupload.png'
import jwt_decode from "jwt-decode";

import styles2 from '../stylesheets/postpost.module.css'

const PostGoToViewStudent = () => {
    
    const {findhashtag} = useParams

    const [postdet , setpostdet] = useState({hastag : "", caption : "", imgurl : ""})
    const [imgurl , setimgurl] = useState(null)

    useEffect(() => {
      
        async function getpost(){
            const response = await fetch(`/api/post/getpost/${findhashtag}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
                },
              })

              const json = await response.json()

              if(json.success)
              {

              }
        } 
        

      
    }, [findhashtag])
    

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

        </div>

        <div className={styles.rightmost}>
          

        </div>
        </React.Fragment>

    )
}

export default PostGoToViewStudent