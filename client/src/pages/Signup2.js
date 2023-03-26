import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import Navbar from '../components/Navbar'
import '../stylesheets/signup2.css'

const Signup2 = () => {
  
  const location = useLocation()
  const navigate = useNavigate()

  const[error,setError] = useState(null)
  const [topper,setTopper] = useState([])
  const [details, setDetails] = useState({ password: "", idurl: "" ,email:location.state.email})

  const onChange1 = (event) => {
    setDetails({ ...details, [event.target.name]: event.target.value })
  }

  const onChange2 = (event) => {
    setTopper({ ...topper, [event.target.name] : event.target.value })
    console.log(topper)
  }

  const handleSubmit2 = async (e) => {

    e.preventDefault()
    console.log(details)

    const response = await fetch("http://localhost:6100/api/mentor/signup", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: details.email, idurl: details.idurl, password:details.password })
    })

    const json = await response.json()

    if (json.success) {
      localStorage.setItem("Mentor",json.authToken)
      console.log(localStorage.getItem("Mentor"))
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
            <div className="rightdiv">
            <form className="signup" onSubmit={handleSubmit2}>
                <h3 className="formheader"><span className="headertext">Enter your Details</span></h3>
                <div className="formcontent">
                    <input
                    type="text"
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
                    onChange={onChange2}
                    name="Board Topper"
                    /><p>Board Topper</p>
                    </label>
                    <label htmlFor="jeetopper" className="checkboxstyle">
                    <input
                    type="checkbox"
                    defaultChecked={false}
                    value={"JEE Topper"}
                    onChange={onChange2}
                    name="JEE Topper"
                    /><p>JEE Topper</p>
                    </label>
                    <label htmlFor="neettopper" className="checkboxstyle">
                    <input
                    type="checkbox"
                    defaultChecked={false}
                    value={"Neet Topper"}
                    onChange={onChange2}
                    name="Neet Topper"
                    /><p>NEET Topper</p>
                    </label>
                    <label htmlFor="masters" className="checkboxstyle">
                    <input
                    type="checkbox"
                    defaultChecked={false}
                    value={"Masters"}
                    onChange={onChange2}
                    name="Masters"
                    /><p>Masters Student</p>
                    </label>
                    <label htmlFor="phd" className="checkboxstyle">
                    <input
                    type="checkbox"
                    defaultChecked={false}
                    value={"PHD"}
                    onChange={onChange2}
                    name="PHD"
                    /><p>PHD Student</p>
                    </label>
                </div>
                <button className="signupbutton">Submit</button>
            </form>
            </div>
        </div>
    </div>
    </>
  )
}

export default Signup2
