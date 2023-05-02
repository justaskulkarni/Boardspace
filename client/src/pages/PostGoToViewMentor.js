import React, { useState, useEffect } from 'react'
import styles from '../stylesheets/chat.module.css'
import dashboardlogo from '../assets/navbarlogo.png'
import { useNavigate, Link, useParams } from "react-router-dom";
import imageupload from '../assets/imageupload.png'
import jwt_decode from "jwt-decode";
import subicon from "../assets/send.png";
import styles2 from '../stylesheets/gotoview.module.css'

const PostGoToViewMentor = () => {

    const { findhashtag } = useParams()

    var decoded = jwt_decode(localStorage.getItem("Token"))
    const userId = decoded.id

    const [postdet, setpostdet] = useState({ hastag: "", caption: "", pid: "", owner: "" })
    const [imgurl, setimgurl] = useState(null)
    const [error, seterror] = useState(null)

    useEffect(() => {

        async function getpost() {
            const response = await fetch(`/api/post/getpost/${findhashtag}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            const json = await response.json()

            if (json.error) {
                seterror(json.error)
            }

            if (json.success) {
                setimgurl(json.imgurl)
                setpostdet({ hashtag: json.rpost.hashtag, caption: json.rpost.caption, pid: json.postid, owner: json.rpost.doubtaskedby })
            }
        }

        getpost()

    }, [])


    let navigate = useNavigate()


    const handleLogout = () => {
        localStorage.removeItem("Token")
        navigate("/")
        navigate(0)
    }

    const gotochat = () => {
        navigate("/mentor/chat")
    }

    const viewdoubt = () => {
        navigate("/mentor/view")
    }

    return (

        <React.Fragment>
            <div className={styles.column + " " + styles.left}>
                <Link to="/"><img className={styles.imgstyle} src={dashboardlogo} alt="" /></Link>
                <div className={styles.smallcardleftnew}>
            <button className={styles.leftbuttonnew} onClick={gotochat}><span className={styles.notificationsnew}>Chat</span></button>
            <button className={styles.leftbuttonnew} onClick={viewdoubt}><span className={styles.notificationsnew}>View Doubt</span></button>
          </div>
          {localStorage.getItem("Token") && <button className={styles.logoutbtn} onClick={handleLogout}><span className={styles.welcometext2}>Logout</span></button>}
        </div>
    
        <div className={styles.right}> 
          <h3 className={styles2.roomname}>#{findhashtag}</h3>
            <div className={styles2.dispimg}>
                    <p className={styles2.txt}>Caption :</p>
                    <br />
                    <p className={styles2.caption} style={{fontSize:17,marginLeft:"2vh"}}>{postdet.caption}</p>
                    <div className={styles2.something}>
                        <p className={styles2.txt}>Image :</p>
                        <div className={styles2.dispdiv}>
                            <img src={imgurl} className={styles2.previmg} />
                        </div>
                    </div>
                </div>
                {error && <div>{error}</div>}
            </div>

            <div className={styles2.rightmost}>
                <div className={styles2.nums}><b>Comments</b></div>
                <div className={styles2.poster}>
                    
                        <div className={styles2.entertxt  }>
                          {/* <div className={styles2.nums}><b>#comment no</b></div> */}
                          <div className={styles.contrast}>
                              <div className={styles2.comm}>
                                <div className={styles2.inner}>
                                  <p> <b>Name</b></p>
                                  <p>Tags</p>
                                </div>
                                <div className={styles2.commcon}>
                                  <p>Content</p>
                                </div>
                              </div>

                              <div className={styles2.comm}>
                                <div className={styles2.inner}>
                                  <p> <b>Name</b></p>
                                  <p>Tags</p>
                                </div>
                                <div className={styles2.commcon}>
                                  <p>Content</p>
                                </div>
                              </div>
                              <div className={styles2.comm}>
                                <div className={styles2.inner}>
                                  <p> <b>Name</b></p>
                                  <p>Tags</p>
                                </div>
                                <div className={styles2.commcon}>
                                  <p>Content</p>
                                </div>
                              </div>
                              <div className={styles2.comm}>
                                <div className={styles2.inner}>
                                  <p> <b>Name</b></p>
                                  <p>Tags</p>
                                </div>
                                <div className={styles2.commcon}>
                                  <p>Content</p>
                                </div>
                              </div>
                              <div className={styles2.comm}>
                                <div className={styles2.inner}>
                                  <p> <b>Name</b></p>
                                  <p>Tags</p>
                                </div>
                                <div className={styles2.commcon}>
                                  <p>Content</p>
                                </div>
                              </div>
                              <div className={styles2.comm}>
                                <div className={styles2.inner}>
                                  <p> <b>Name</b></p>
                                  <p>Tags</p>
                                </div>
                                <div className={styles2.commcon}>
                                  <p>Content</p>
                                </div>
                              </div>
                          </div>
                          
                            <form action="">
                                <textarea className={styles2.incomment} placeholder="Comment something" />
                                <button className={styles2.uploadbutton} >
                                    <img src={subicon} className={styles2.butimgdiv} alt=" "></img>
                                </button>
                            </form>
                        </div>
                    

                </div>
            </div>

        </React.Fragment>

    )
}

export default PostGoToViewMentor