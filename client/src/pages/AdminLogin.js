import Navbar from '../components/Navbar'
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styles from '../stylesheets/auth.module.css'

const AdminLogin = () => {

    const [creadentials, setCredentials] = useState({ email: "", password: "" })
    const [error, setError] = useState(null)

    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch("http://localhost:6100/api/admin/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: creadentials.email, password: creadentials.password })
        })

        const json = await response.json()

        if (json.success) {
            localStorage.setItem("Token", json.authToken)
            navigate("/admin/landing")
        }

        if (json.error) {
            setError(json.error)
            setCredentials({
                email: "",
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
                        <h3 className={styles.formheader}><span className={styles.loginhead1}>Admin Login</span></h3>

                        <div className={styles.formcontent}>
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

                        </div>

                        <div className={styles.buttonscontainer}>
                        <button className={styles.loginbutton} >Login</button>
                        <button className={styles.signupbutton}><Link className={styles.lol} to={"/admin/signup"}>signup</Link></button>
                        </div>
                    </form>
                    <button className={styles.forgotpasswordbutton}>forgot password?</button>
                    {error && <div className={styles.error}>{error}</div>}
                </div>
            </div>
            </div>
        </>
    )
}

export default AdminLogin