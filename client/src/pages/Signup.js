import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Navbar from '../components/Navbar'
import '../stylesheets/auth.css'

const Signup = () => {
  const [creadentials, setCredentials] = useState({ email: "", otp: null, name: "" })
  const [details, setDetails] = useState({password:"", idurl:""})
  const [error, setError] = useState(null)
  const [showOtpDiv, setShowOtpDiv] = useState(false)
  const [showSecondForm, setShowSecondForm] = useState(false)
  const [isBoardTopper, setIsBoardTopper] = useState(false)
  const [isJEETopper, setIsJEETopper] = useState(false)
  const [isNEETTopper, setIsNEETTopper] = useState(false)
  const [isMastersStudent, setIsMastersStudent] = useState(false)
  const [isPHDStudent, setIsPHDStudent] = useState(false)
  

  let navigate = useNavigate()

  const handleSubmit1 = async (e) => {
    e.preventDefault()

    const response = await fetch("http://localhost:6100/api/mentor/semisignup", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: creadentials.email, name: creadentials.name })
    })

    const json = await response.json()

    if (json.success) {
      setShowOtpDiv(true);
    }

    if (json.error) {
      setError(json.error)
    }
  }

  const onChange1 = (event) => {
    setCredentials({ ...creadentials, [event.target.name]: event.target.value })
  }

  const onChange2 = (event) => {
    setDetails({ ...details, [event.target.name]: event.target.value })
  }

  const handleSubmit2 = async (e) => {

    e.preventDefault()

    const response = await fetch("http://localhost:6100/api/mentor/verifyotp", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: creadentials.email, otp: creadentials.otp })
    })

    const json = await response.json()

    if (json.success) {
      console.log("Success che balak")
      /* navigate("/") */
      setShowSecondForm(true)
    }

    if (json.error) {
      setError(json.error)
    }

  }

  const handleSubmit3 = async (e) => {

    e.preventDefault()

  }

  return (
    <>
      <Navbar />
      <div className="mostout">
        <div className="colourdiv"></div>
        <div className="rightdiv">
          {!showOtpDiv &&
            <form className="signup" onSubmit={handleSubmit1}>
              <h3 className="formheader"><span className="headertext">Sign Up</span></h3>

          <div className="formcontent">
            <input
              type="text"
              value={creadentials.name}
              name="name"
              onChange={onChange1}
              placeholder="Name"
              className="inputbox"
            />

            <input
              type="email"
              value={creadentials.email}
              name="email"
              onChange={onChange1}
              placeholder="Email"
              className="inputbox"
            />

          </div>
          
            <button className="signupbutton" >sign up</button>
            <button className="loginbutton"><Link to="/login"><span className="buttontext">login</span></Link></button>
            </form>
          }
        
        
        {error && <div className="error">{error}</div>}
        { showOtpDiv && !showSecondForm && 
          (<div>
            <form className="signup" onSubmit={handleSubmit2}>
              <h3 className="formheader"><span className="headertext">Enter your OTP</span></h3>
              <div className="formcontent">
                <input
                  type="number"
                  value={creadentials.otp}
                  name="otp"
                  onChange={onChange1}
                  placeholder="OTP"
                  className="inputbox"
                />

                <input
                  type="email"
                  value={creadentials.email}
                  name="email"
                  onChange={onChange}
                  placeholder="Email"
                  className="inputbox"
                />

              </div>

              <button className="signupbutton" >sign up</button>
              <button className="loginbutton"><Link to="/login"><span className="buttontext">login</span></Link></button>
            </form>
            </div>)
          }


          {error && <div className="error">{error}</div>}
          {showOtpDiv 
            (<div>
              <form className="signup" onSubmit={handleSubmit2}>
                <h3 className="formheader"><span className="headertext">Enter your OTP</span></h3>
                <div className="formcontent">
                  <input
                    type="number"
                    value={creadentials.otp}
                    name="otp"
                    onChange={onChange}
                    placeholder="OTP"
                    className="inputbox"
                  />
                </div>



                <button className="signupbutton" >Submit OTP</button>
              </form>
          </div>)
        }
        {
          showSecondForm &&
          (
            <div>
              
              </div>
            

            
              <button className="signupbutton" >Submit Details</button>
              </form>
            </div>
          )
        }
      </div>
  
    </>
  )
}

export default Signup