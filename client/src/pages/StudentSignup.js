import Navbar from '../components/Navbar'
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import styles from '../stylesheets/auth.module.css'


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
            setCredentials({
                email: "",
                phonenum: 0,
                name: "",
                password: ""
            });
            setTimeout(() => {
                setError(null);
            }, 4000);
        }
    }

    const onChange = (event) => {
        setCredentials({ ...creadentials, [event.target.name]: event.target.value })
    }

    return (
        <>
            <Navbar />
            <div className={styles.wrapper}>
            <div className={styles.mostout}>
                <div className={styles.colour1}></div>
                <div className={styles.rightdiv}>
                    <form className={styles.signup} onSubmit={handleSubmit}>
                        <h3 className={styles.formheader}><span className={styles.loginhead1}>Student Sign Up</span></h3>

                        <div className={styles.formcontent}>
                            <input
                                type="text"
                                value={creadentials.name}
                                name="name"
                                onChange={onChange}
                                placeholder="Name"
                                className={styles.inputbox}
                            />

                            <input
                                type="email"
                                value={creadentials.email}
                                name="email"
                                onChange={onChange}
                                placeholder="Email"
                                className={styles.inputbox}
                            />

                            <input
                                type="password"
                                value={creadentials.password}
                                name="password"
                                onChange={onChange}
                                placeholder="Password"
                                className={styles.inputbox}
                            />

                            <input
                                type="number"
                                value={creadentials.phonenum}
                                name="phonenum"
                                onChange={onChange}
                                placeholder="Number (Optional)"
                                className={styles.inputbox}
                            />

                        </div>

                        
                        <button className={styles.loginbutton} >SignUp</button>
                        <button className={styles.signupbutton}><Link className={styles.lol} to={"/student/login"}>Login</Link></button>
                        

                    </form>
                    {error && <div className={styles.error}>{error}</div>}
                </div>
                
            </div>
            </div>
        </>
    )
}

export default StudentSignup