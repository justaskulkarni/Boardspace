import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Navbar from '../components/Navbar'
import '../stylesheets/auth.css'

const Signup = () => {
  const [creadentials, setCredentials] = useState({ email: "", otp: "", name: "" })
  const [error, setError] = useState(null)
  const [showOtpDiv, setShowOtpDiv] = useState(false)

  let navigate = useNavigate()

  const handleSubmit1 = async (e) => {
    e.preventDefault()

    const response = await fetch("http://localhost:6100/api/mentor/semisignup", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: creadentials.email, name: creadentials.name })
    })

    const json = await response.json()

    if (json.noverify) {
      navigate("/notaccepted", {
        state: {
          message: json.noverify
        }
      })
    }

    if (json.isOtpVerified) {
      localStorage.setItem("Token", json.authToken)
      navigate("/youin")
    }

    if (json.success) {
      setShowOtpDiv(true);
    }

    if (json.error) {
      setError(json.error)
      setCredentials({
        email: "",
        otp: "",
        name: ""
      });
      setTimeout(() => {
        setError(null);
      }, 4000);
    }
  }

  const onChange = (event) => {
    setCredentials({ ...creadentials, [event.target.name]: event.target.value })
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
      navigate("/complete_details", {
        state: {
          email: creadentials.email
        }
      })
    }

    if (json.error) {
      setError(json.error)
      setTimeout(() => {
        setError(null);
      }, 4000);
    }

  }

  return (
    <>
      <Navbar />
      <div className="wrapper">
        <div className="mostout">
          <div className="colour1"></div>
          <div className="rightdiv">
            {!showOtpDiv &&
              <form className="signup" onSubmit={handleSubmit1}>
                <h3 className="formheader"><span className="headertext">Sign Up</span></h3>

                <div className="formcontent">
                  <input
                    type="text"
                    value={creadentials.name}
                    name="name"
                    onChange={onChange}
                    placeholder="Name"
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
                <div className="buttonscontainer">
                <button className="signupbutton" >SignUp</button>
                <button className="loginbutton"><Link className='lol' to={"/login"}>Login</Link></button>
                </div>
                
              </form>
            }

            {showOtpDiv &&
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
            {error && <div className="error">{error}</div>}
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup