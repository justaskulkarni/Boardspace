import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Navbar from '../components/Navbar'
import '../stylesheets/auth.css'

const Signup = () => {
  const [creadentials, setCredentials] = useState({email:"", password:""})
  const [error, setError] = useState(null)

  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch("http://localhost:6100/api/signup" , {
      method : 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email:creadentials.email,password:creadentials.password})
    })

    const json = await response.json()

    if(json.success)
    {
      navigate("/youin")
    }

    if(json.error)
    {
      setError(json.error)
    }
  }

  const onChange = (event) =>{
    setCredentials({...creadentials,[event.target.name]:event.target.value})
  }

  return (
    <>
    <div className="rightdiv">
      <form className="signup" onSubmit={handleSubmit}>
        <h3 className="formheader"><span className="headertext">Sign Up</span></h3>
    
        <div className="formcontent">
        <input 
          type="email" 
          value={creadentials.email}
          name = "email"
          onChange={onChange}
          placeholder="email"
          className="inputbox"
        />
  
        <input 
          type="password"  
          value={creadentials.password}
          name = "password"
          onChange={onChange}
          placeholder="password"
          className="inputbox"
        />

        <button className="signupbutton">Sign up</button>
        </div>
      </form>
      <button className="loginbutton"><Link to="/login">Login</Link></button>
      {error && <div className="error">{error}</div>}
    </div>
    </>
  )
}

export default Signup