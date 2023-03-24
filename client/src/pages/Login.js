import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [creadentials, setCredentials] = useState({email:"", password:""})
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch("http://localhost:6100/api/login" , {
      method : 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email:creadentials.email,password:creadentials.password})
    })

    const json = await response.json()
    
    if(json.error)
    {
      setError(json.mssg)
    }

    console.log(json)

  }

  const onChange = (event) =>{
    setCredentials({...creadentials,[event.target.name]:event.target.value})
  }

  return (
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
      <button><Link to="/signup">Signup</Link></button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Login