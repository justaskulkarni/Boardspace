import React from 'react'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import styles from "../stylesheets/MentorAuth.module.css";

import jwt_decode from 'jwt-decode'


export const StudentUpdatePass = () => {

    const [pass1, setpass1] = useState("");
    const [pass2, setpass2] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showpass, setshowpass] = useState(true);

    let navigate = useNavigate();

    const handleSubmit1 = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        if (pass1 !== pass2) {
            setIsLoading(false)
            setError("Passwords dont match kindly re-enter")
            setpass2("")
            setTimeout(() => {
                setError(null);
            }, 4000);
        }
        else {
            var decoded = jwt_decode(localStorage.getItem("UpdateToken"));
            console.log(decoded.email)
            console.log(pass1)
            const response = await fetch("/api/student/changepass", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ pass: pass1, email: decoded.email }),
            });

            const json = await response.json();

            if (json.success) {
                //kd idr daal deh green wala ki password update karo
                localStorage.removeItem("UpdateToken")
                setTimeout(() => {
                    navigate("/student/login")
                }, 3000)
                setTimeout(() => {
                    setIsLoading(false)
                }, 1000)
            }

            if (json.error) {
                setIsLoading(false);
                setError(json.error);
                setpass1("")
                setpass2("")
                setTimeout(() => {
                    setError(null);
                }, 4000);
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            }
        }

    }

    const onChange = (event) => {
        event.preventDefault()
        setpass1(event.target.value)
    }

    const onChange2 = (event) => {
        event.preventDefault()
        setpass2(event.target.value)
    }

    const togglepass = (e) => {
        e.preventDefault()
        setshowpass(!showpass)
    }

    return (

        <React.Fragment>

            <Navbar />

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" />

            <div className={styles.colordiv}>
                <div className={styles.colour1}></div>
            </div>
            <div className={styles.signupform}>
                <h3 className={styles.login3}>Change Password</h3>

                <form className={styles.forms2} onSubmit={handleSubmit1}>

                    {(showpass) ?
                        (
                            <React.Fragment>
                                <label htmlFor="Email">Enter new Password</label>
                                <input type="password" value={pass1} onChange={onChange} placeholder="" className={styles.fields} />
                                <i className="far fa-eye" onClick={togglepass} style={{ marginLeft: "-1.875rem", cursor: "pointer" }}></i>


                                <label htmlFor="otp">Confirm Password</label>
                                <input type="password" value={pass2} onChange={onChange2} placeholder="" className={styles.fields} />
                            </React.Fragment>
                        )
                        :
                        (
                            <React.Fragment>
                                <label htmlFor="Email">Enter new Password</label>
                                <input type="text" value={pass1} onChange={onChange} placeholder="" className={styles.fields} />
                                <i className="far fa-eye" onClick={togglepass} style={{ marginLeft: "-1.875rem", cursor: "pointer" }}></i>


                                <label htmlFor="otp">Confirm Password</label>
                                <input type="text" value={pass2} onChange={onChange2} placeholder="" className={styles.fields} />
                            </React.Fragment>
                        )
                    }


                    <div>
                        {isLoading && (
                            <div className={styles.loadingAnim}>
                                <div className={styles.dotSpinner}>
                                    <div className={styles.dotSpinnerDot}></div>
                                    <div className={styles.dotSpinnerDot}></div>
                                    <div className={styles.dotSpinnerDot}></div>
                                    <div className={styles.dotSpinnerDot}></div>
                                    <div className={styles.dotSpinnerDot}></div>
                                    <div className={styles.dotSpinnerDot}></div>
                                    <div className={styles.dotSpinnerDot}></div>
                                    <div className={styles.dotSpinnerDot}></div>
                                </div>
                            </div>
                        )}
                        {!isLoading && (
                            <button className={styles.loginbutton} id="submitButton">
                                <span className={styles.logintext}>Update Password</span>
                            </button>
                        )}
                    </div>
                </form>

                {error && (
                    <div className={styles.error2} style={{ marginTop: "7rem" }}>
                        {error}
                    </div>
                )}
            </div>
        </React.Fragment>
    )
}
