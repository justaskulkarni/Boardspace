import React, { useState, useEffect } from 'react'
import '../stylesheets/card.css'

const Card = ({mentid}) => {

  const [error, setError] = useState(null)
  const [creadentials, setCredentials] = useState({ email: "", mname: ""})



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
      <div className="innerdiv">
        <div className="innermost">
            <p className="cardcontent">Name: {creadentials.mname}</p>
            <p className="cardcontent">Email: {creadentials.email} </p>
        </div>
        <button className="verifybutton" onClick={() => getverify()}>Verify</button>
      </div>
      {error && <div className="error">{error}</div>}
    </div>  
  )
}

export default Card
