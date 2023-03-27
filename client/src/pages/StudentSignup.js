import Navbar from '../components/Navbar'
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import '../stylesheets/auth.css'

const StudentSignup = () => {

    const [creadentials, setCredentials] = useState({ email: "", phonenum: 0, name: "", password: "" })
    const [error, setError] = useState(null)

    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch("http://localhost:6100/api/student/signup", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: creadentials.email, name: creadentials.name, phonenum: creadentials.phonenum, password: creadentials.password })
        })

        const json = await response.json()

        if (json.success) {
            localStorage.setItem("Token", json.authToken)
            navigate("/studentin")
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
                    <form className="signup" onSubmit={handleSubmit}>
                        <h3 className="formheader"><span className="headertext">Student Sign Up</span></h3>

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

                            <input
                                type="password"
                                value={creadentials.password}
                                name="password"
                                onChange={onChange}
                                placeholder="Password"
                                className="inputbox"
                            />

                            <input
                                type="number"
                                value={creadentials.phonenum}
                                name="phonenum"
                                onChange={onChange}
                                placeholder="Number (Optional)"
                                className="inputbox"
                            />

                        </div>

                        <button className="signupbutton" >Sign up</button>
                        <button className=""><Link to={"/student/login"}>Login</Link></button>
                    </form>
                    {error && <div className="error">{error}</div>}
                </div>
                
            </div>
            
        </>
    )
}

export default StudentSignup