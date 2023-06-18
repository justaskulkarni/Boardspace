import React, { useState, useEffect } from 'react'
import styles from '../stylesheets/chat.module.css'
import dashboardlogo from '../assets/navbarlogo.png'
import { useNavigate, Link} from "react-router-dom";
import jwt_decode from "jwt-decode";

import styles2 from '../stylesheets/postpost.module.css'

const PostViewMentor = () => {

    var decoded = jwt_decode(localStorage.getItem("Token"))
    const userId = decoded.id

    const [error, seterror] = useState(null)
    const [jeepost, setjeepost] = useState([])
    const [icsepost, seticsepost] = useState([])
    const [sscpost , setsscpost ] = useState([])
    const [igcsepost, setigcsepost] = useState([])
    const [cbsepost, setcbsepost] = useState([])
    const [iscpost, setiscpost] = useState([])
    const [ibpost, setibpost] = useState([])
    const [hscpost, sethscpost] = useState([])
    const [neetpost, setneetpost] = useState([])


    const getalldoubts = async() => {

        const response = await fetch(`/api/post/getallpost/mentor`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })

        const json = await response.json()

        if(json.error)
        {
            seterror(json.error)
        }

        if(json.success)
        {
            setjeepost(json.jeep)
            setneetpost(json.neetp)
            seticsepost(json.icsep)
            setsscpost(json.sscp)
            setcbsepost(json.cbsep)
            setiscpost(json.iscp)
            setibpost(json.ibp)
            sethscpost(json.hscp)
            setigcsepost(json.igcsep)
        }
    }

    useEffect(() => {  
        getalldoubts()
        console.log(cbsepost)
    },[userId, jeepost,neetpost,cbsepost,sscpost,icsepost,iscpost,ibpost,hscpost,igcsepost])


    let navigate = useNavigate()

    const navigatepost = (hashtag) => {
        navigate(`/mentor/view/${hashtag}`)
        navigate(0)
    }

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

            <div className={styles2.space}>
                <div className={styles2.hdtxt}>
                    <p className={styles.roomname}>All Doubts</p>
                </div>
                {error && <div>{error}</div>}
                <div className={styles2.box}>
                    <div className={styles2.boxes}>
                        <div className={styles2.intxt}> <b>JEE Doubts</b> </div>
                        <div className={styles2.bxcont}>
                        {jeepost.map((elem) => {
                                return <div className={styles2.hashdiv}>
                                    <p>{elem.caption}</p>
                                    <button onClick={() => navigatepost(elem.hashtag)} className={styles2.aplebtn}>#{elem.hashtag}</button>
                                </div>
                            })}
                        </div>
                    </div>
                    <div className={styles2.boxes}>
                        <div className={styles2.intxt}> <b>CBSE</b> </div>
                        <div className={styles2.bxcont}>
                            {cbsepost.map((elem) => {
                                return <div className={styles2.hashdiv}>
                                    <p>{elem.caption}</p>
                                    <button onClick={() => navigatepost(elem.hashtag)} className={styles2.aplebtn}>#{elem.hashtag}</button>
                                </div>
                            })}
                        </div>
                    </div>
                    <div className={styles2.boxes}>
                        <div className={styles2.intxt}> <b>Neet</b> </div>
                        <div className={styles2.bxcont}>
                        {neetpost.map((elem) => {
                                return <div className={styles2.hashdiv}>
                                    <p>{elem.caption}</p>
                                    <button onClick={() => navigatepost(elem.hashtag)} className={styles2.aplebtn}>#{elem.hashtag}</button>
                                </div>
                            })}
                        </div>
                    </div>
                    <div className={styles2.boxes}>
                        <div className={styles2.intxt}> <b>SSC</b> </div>
                        <div className={styles2.bxcont}>
                        {sscpost.map((elem) => {
                                return <div className={styles2.hashdiv}>
                                    <p>{elem.caption}</p>
                                    <button onClick={() => navigatepost(elem.hashtag)} className={styles2.aplebtn}>#{elem.hashtag}</button>
                                </div>
                            })}
                        </div>
                    </div>
                    <div className={styles2.boxes}>
                        <div className={styles2.intxt}> <b>HSC</b> </div>
                        <div className={styles2.bxcont}>
                        {hscpost.map((elem) => {
                                return <div className={styles2.hashdiv}>
                                    <p>{elem.caption}</p>
                                    <button onClick={() => navigatepost(elem.hashtag)} className={styles2.aplebtn}>#{elem.hashtag}</button>
                                </div>
                            })}
                        </div>
                    </div>
                    <div className={styles2.boxes}>
                        <div className={styles2.intxt}> <b>ICSE</b> </div>
                        <div className={styles2.bxcont}>
                        {icsepost.map((elem) => {
                                return <div className={styles2.hashdiv}>
                                    <p>{elem.caption}</p>
                                    <button onClick={() => navigatepost(elem.hashtag)} className={styles2.aplebtn}>#{elem.hashtag}</button>
                                </div>
                            })}
                        </div>
                    </div>
                    <div className={styles2.boxes}>
                        <div className={styles2.intxt}> <b>IGCSE</b> </div>
                        <div className={styles2.bxcont}>
                        {igcsepost.map((elem) => {
                                return <div className={styles2.hashdiv}>
                                    <p>{elem.caption}</p>
                                    <button onClick={() => navigatepost(elem.hashtag)} className={styles2.aplebtn}>#{elem.hashtag}</button>
                                </div>
                            })}
                        </div>
                    </div>
                    <div className={styles2.boxes}>
                        <div className={styles2.intxt}> <b>IB</b> </div>
                        <div className={styles2.bxcont}>
                        {ibpost.map((elem) => {
                                return <div className={styles2.hashdiv}>
                                    <p>{elem.caption}</p>
                                    <button onClick={() => navigatepost(elem.hashtag)} className={styles2.aplebtn}>#{elem.hashtag}</button>
                                </div>
                            })}
                        </div>
                    </div>
                    <div className={styles2.boxes}>
                        <div className={styles2.intxt}> <b>ISC</b> </div>
                        <div className={styles2.bxcont}>
                        {iscpost.map((elem) => {
                                return <div className={styles2.hashdiv}>
                                    <p>{elem.caption}</p>
                                    <button onClick={() => navigatepost(elem.hashtag)} className={styles2.aplebtn}>#{elem.hashtag}</button>
                                </div>
                            })}
                        </div>
                    </div>

                </div>

            </div>




        </React.Fragment>

    )
}

export default PostViewMentor