import Navbar from '../components/Navbar'
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

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
            localStorage.setItem("Student", json.authToken)
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
                        <h3 className="formheader"><span className="headertext">Student Login</span></h3>

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
                                placeholder="Passowrd"
                                className="inputbox"
                            />

                        </div>

                        <button className="signupbutton" >Login</button>
                        <button className=""><Link to={"/student/signup"}>Signup</Link></button>
                    </form>
                    {error && <div className="error">{error}</div>}
                </div>
            </div>
        </>
    )
}

export default StudentLogin