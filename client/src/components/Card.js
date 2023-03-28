import React from 'react'
import '../stylesheets/card.css'

const Card = () => {
  return (
    <div className="cardstyle">
      <div className="innerdiv">
        <div className="innermost">
            <p className="cardcontent">Name: Yaha pe name display hoga</p>
            <p className="cardcontent">Email: Yaha pe email display hoga</p>
        </div>
        <button className="verifybutton">Verify</button>
      </div>
    </div>
  )
}

export default Card
