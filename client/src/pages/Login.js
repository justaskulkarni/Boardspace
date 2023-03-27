import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../stylesheets/auth.css'
import Navbar from "../components/Navbar";

const Login = () => {
  const [creadentials, setCredentials] = useState({ email: "", password: "" })
  const [error, setError] = useState(null)

  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:6100/api/mentor/login", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: creadentials.email, password: creadentials.password })
    })

    const json = await response.json()

    if (json.success) {
      localStorage.setItem("Token", json.authToken)
      navigate("/youin")
    }

    if (json.error) {
      setError(json.error)
    }

  }

  const onChange = (event) => {
    setCredentials({ ...creadentials, [event.target.name]: event.target.value })
  }

  return (
    <>
      <Navbar />
      <div className="mostout">
        <div className="colourdiv"></div>
        <div className="rightdiv">
          <form className="login" onSubmit={handleSubmit}>
            <h3 className="formheader"><span className="headertext">Log In</span></h3>
            <div className="formcontent">
              <input
                type="email"
                value={creadentials.email}
                name="email"
                onChange={onChange}
                placeholder="email"
              />
              <input
                type="password"
                value={creadentials.password}
                name="password"
                onChange={onChange}
                placeholder="password"
              />
            </div>


            <div className="buttonscontainer">
              <button className="loginbutton">login</button>
              <button className="signupbutton"><Link to={"/signup"}>signup</Link></button>
            </div>
          </form>
          <button className="forgotpasswordbutton">forgot password?</button>
          {error && <div className="error">{error}</div>}

        </div>
      </div>
    </>
  )
}

export default Login