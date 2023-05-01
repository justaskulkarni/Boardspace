import React, { useState } from 'react'
import styles from '../stylesheets/chat.module.css'
import dashboardlogo from '../assets/navbarlogo.png'
import { useNavigate, Link } from "react-router-dom";
import imageupload from '../assets/imageupload.png'
import jwt_decode from "jwt-decode";

import styles2 from '../stylesheets/postpost.module.css'
import { useRef } from 'react';

const PostPostStudent = () => {

  const [image, setImage] = useState(null)
  const [selectedOption, setSelectedOption] = useState('')
  const [inputText, setInputText] = useState('')
  const [error, setError] = useState(null);
  const ufile = useRef(null)

  const onImageChange = (event) => {
    ufile.current = event.target.files[0]
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]))
    }
  }

  const returnid = (reqtoken) => {
		if (reqtoken) {
			var decoded = jwt_decode(reqtoken);
			return decoded.id;
		} else {
			return null;
		}
	}

  var fid = returnid(localStorage.getItem("Token"));

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  }

  const handleTextChange = (e) => {
    setInputText(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if(selectedOption === '')
    {
      setError("Please choose a tag")
      return error
    }

    let data = new FormData()
    data.append("image", ufile.current)
    data.append("caption", inputText)
    data.append("tag", selectedOption)
    data.append("sid",fid)

    const response = await fetch(`/api/post/create`, {
			method: "POST",
			body: data,
		});

		const json = await response.json();

		if (json.error) {
			setError(json.error);
		}

    if(json.success)
    {
      setImage(null)
      setInputText('')
      setSelectedOption('')
      ufile.current = null

      navigate("/student/view")

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

  const viewdoubt = () => {
    navigate("/student/view")
  }

  return (
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
      <form onSubmit={handleSubmit}  encType="multipart/form">
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
            <input type='text' value={inputText} onChange={handleTextChange} />

          </div>

          <button className={styles2.postbutton} type="submit">
            <span className={styles2.posttext}>Post Doubt</span>
            {error && <div>{error}</div>}
          </button>

        </div>

        <div className={styles.rightmost}>
          <fieldset>
            <legend>Select an tag:</legend>
            <label>
              <input type="radio" value="JEE" checked={selectedOption === 'JEE'} onChange={handleOptionChange} />
              JEE
            </label>
            <br />
            <label>
              <input type="radio" value="Neet" checked={selectedOption === 'Neet'} onChange={handleOptionChange} />
              Neet
            </label>
            <br />
            <label>
              <input type="radio" value="ICSE" checked={selectedOption === 'ICSE'} onChange={handleOptionChange} />
              ICSE
            </label>
            <br />
            <label>
              <input type="radio" value="SSC" checked={selectedOption === 'SSC'} onChange={handleOptionChange} />
              SSC
            </label>
            <br />
            <label>
              <input type="radio" value="IGCSE" checked={selectedOption === 'IGCSE'} onChange={handleOptionChange} />
              IGCSE
            </label>
            <br />
            <label>
              <input type="radio" value="CBSE" checked={selectedOption === 'CBSE'} onChange={handleOptionChange} />
              CBSE
            </label>
            <br />
            <label>
              <input type="radio" value="ISC" checked={selectedOption === 'ISC'} onChange={handleOptionChange} />
              ISC
            </label>
            <br />
            <label>
              <input type="radio" value="IB" checked={selectedOption === 'IB'} onChange={handleOptionChange} />
              IB
            </label>
            <br />
            <label>
              <input type="radio" value="HSC" checked={selectedOption === 'HSC'} onChange={handleOptionChange} />
              HSC
            </label>
          </fieldset>
        </div>
      </form>
    </React.Fragment>
  )
}

export default PostPostStudent