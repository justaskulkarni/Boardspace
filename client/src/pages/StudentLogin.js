import Navbar from '../components/Navbar'
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import '../stylesheets/auth.css'

const StudentLogin = () => {

    const [creadentials, setCredentials] = useState({ email: "", password: "" })
    const [error, setError] = useState(null)

    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch("http://localhost:6100/api/student/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: creadentials.email, password: creadentials.password })
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
            <div className="wrapper">
            <div className="mostout">
                <div className="colour1"></div>
                <div className="rightdiv">
                    <form className="signup" onSubmit={handleSubmit}>
                        <h3 className="formheader"><span className="loginhead1">Student Login</span></h3>

                        <div className="formcontent">
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

                        </div>

                        <div className="buttonscontainer">
                        <button className="loginbutton" >Login</button>
                        <button className="signupbutton"><Link className="lol" to={"/student/signup"}>SignUp</Link></button>
                        </div>
                    </form>
                    <button className="forgotpasswordbutton">forgot password?</button>
                    {error && <div className="error">{error}</div>}
                </div>
            </div>
            </div>
        </>
    )
}

export default StudentLogin