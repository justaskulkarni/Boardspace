import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"


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
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
  
      <label htmlFor="email">Email address:</label>
      <input 
        type="email" 
        value={creadentials.email}
        name = "email"
        onChange={onChange}
      />
      <label htmlFor="password">Password:</label>
      <input 
        type="password"  
        value={creadentials.password}
        name = "password"
        onChange={onChange}
      />

      <button>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
    <button><Link to="/login">Login</Link></button>
    </>
  )
}

export default Signup