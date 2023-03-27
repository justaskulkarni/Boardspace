import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Navbar from '../components/Navbar'
import '../stylesheets/signup2.css'

const Signup2 = () => {
  
  const location = useLocation()
  const navigate = useNavigate()

  const[error,setError] = useState(null)
  const topper = []
  const [details, setDetails] = useState({ password: "", idurl: "" ,email:location.state.email})

  var isNeetTopper = false
  var isJeeTopper = false
  var isBoardTopper = false
  var isMasters = false
  var isPHD = false

  const onChange1 = (event) => {
    setDetails({ ...details, [event.target.name]: event.target.value })
  }

  const onChange2 = () => {
    isNeetTopper = !isNeetTopper
  }

  const onChange3 = () => {
    isBoardTopper = !isBoardTopper
  }

  const onChange4 = () => {
    isJeeTopper = !isJeeTopper
  }

  const onChange5 = () => {
    isMasters = !isMasters
  }

  const onChange6 = () => {
    isPHD = !isPHD
  }

  const handleSubmit2 = async (e) => {

    e.preventDefault()
    console.log(details)
    
    if(isBoardTopper)
    {
      topper.push("Board Topper")
    }

    if(isJeeTopper)
    {
      topper.push("JEE Topper")
    }

    if(isMasters)
    {
      topper.push("Masters")
    }

    if(isNeetTopper)
    {
      topper.push("Neet Topper")
    }

    if(isPHD)
    {
      topper.push("PHD")
    }

    console.log(topper)

    const response = await fetch("http://localhost:6100/api/mentor/signup", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: details.email, idurl: details.idurl, password:details.password, topper:topper })
    })

    const json = await response.json()

    if (json.success) {
      localStorage.setItem("Token",json.authToken)
      navigate("/youin")
    }

    if (json.error) {
      setError(json.error)
    }

  }
  return (
    <>
    <div>
        <Navbar />
        <div className="mostout">
            <div className="colourdiv"></div>
            <div className="rightdiv2">
            <form className="signup" onSubmit={handleSubmit2}>
                <h3 className="formheader"><span className="headertext">Enter your Details</span></h3>
                <div className="formcontent">
                    <input
                    type="password"
                    value={details.password}
                    name="password"
                    onChange={onChange1}
                    placeholder="password"
                    className="inputbox"
                    />
                    <input
                    type="text"
                    value={details.idurl}
                    name="idurl"
                    onChange={onChange1}
                    placeholder="idurl"
                    className="inputbox"
                    />
                    <label htmlFor="boardtopper" className="checkboxstyle">
                    <input
                    type="checkbox"
                    defaultChecked={false}
                    value={"Board Topper"}
                    onChange={onChange3}
                    name="Board Topper"
                    className="boxstyle"
                    /><p>Board Topper</p>
                    </label>
                    <label htmlFor="jeetopper" className="checkboxstyle">
                    <input
                    type="checkbox"
                    defaultChecked={false}
                    value={"JEE Topper"}
                    onChange={onChange4}
                    name="JEE Topper"
                    className="boxstyle"
                    /><p>JEE Topper</p>
                    </label>
                    <label htmlFor="neettopper" className="checkboxstyle">
                    <input
                    type="checkbox"
                    defaultChecked={false}
                    value={"Neet Topper"}
                    onChange={onChange2}
                    name="Neet Topper"
                    className="boxstyle"
                    /><p>NEET Topper</p>
                    </label>
                    <label htmlFor="masters" className="checkboxstyle">
                    <input
                    type="checkbox"
                    defaultChecked={false}
                    value={"Masters"}
                    onChange={onChange5}
                    name="Masters"
                    className="boxstyle"
                    /><p>Masters Student</p>
                    </label>
                    <label htmlFor="phd" className="checkboxstyle">
                    <input
                    type="checkbox"
                    defaultChecked={false}
                    value={"PHD"}
                    onChange={onChange6}
                    name="PHD"
                    className="boxstyle"
                    /><p>PHD Student</p>
                    </label>
                </div>
                <button className="signupbutton2">Submit</button>
            </form>
            </div>
            {error && <div className="error">{error}</div>}
        </div>
    </div>

    </>
  )
}

export default Signup2
