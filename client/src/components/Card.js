import React, { useState, useEffect } from 'react'
import ImageSlider from './ImageSlider'
import '../stylesheets/card.css'
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
    <div className="cardstyle">
      <div className="statscontainer">
        <div className="innerdiv">
            <div className="innermost">
              <p className="cardcontent">Name: {creadentials.mname}</p>
              <p className="cardcontent">Email: {creadentials.email} </p>
            </div>
            <div className="innermost xyz">
              Topper
            </div>
            <div className="innermost">
              <div className="statscontainer">
                <div>
                <button className="verifybutton" onClick={handleOpen}><img src={document} className="butimgdiv"></img></button>
                </div>
              </div>
            </div>
            <div className="innermost">
              <div className="statscontainer">
                <div>
                <button className="verifybutton" onClick={() => getverify()}><img src={verify} className="butimgdiv"></img></button>
                </div>
              </div>
            </div>
        </div>
      </div>
      {isOpen && (
        <div className="popup-container">
          <div className="popup">
            <button onClick={handleClose}>Close</button>
            <ImageSlider imgarr = {imags}/>
          </div>
        </div>
      )}
      {error && <div className="error">{error}</div>}
    </div>  
  )
}

export default Card
