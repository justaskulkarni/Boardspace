import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
  const [creadentials, setCredentials] = useState({email:"", password:""})
  const [error, setError] = useState(null)

  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch("http://localhost:6100/api/login" , {
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
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>
      
      <label htmlFor="email">Email:</label>
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

      <button>Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
    <button><Link to="/signup">Signup</Link></button>
    </>
  )
}

export default Login