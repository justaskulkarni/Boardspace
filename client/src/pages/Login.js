import React, {useState} from 'react'

const Login = () => {
    
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(inputs);
    }

    return (
    <div>
        <form onSubmit = {handleSubmit}>
            <label htmlFor = "username">Enter username:</label>
            <input type = "text" value = {inputs.username} name = "username" onChange = {handleChange}/>
            <label htmlFor = "password">Enter password:</label>
            <input type = "text" value = {inputs.password} name = "password" onChange = {handleChange}/>
            <button>Submit</button>
        </form>
    </div>
  )
}

export default Login
