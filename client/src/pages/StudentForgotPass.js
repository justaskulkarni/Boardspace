import React from 'react'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import styles from "../stylesheets/MentorAuth.module.css";

import jwt_decode from 'jwt-decode'

const ForgotPass = () => {

    const [credentials, setCredentials] = useState("");
    const [enotp, setotp] = useState("");
    const [error, setError] = useState(null);
    const [showOtpDiv, setShowOtpDiv] = useState(false);
    const [sendotp, setsendotp] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);

    let navigate = useNavigate();

    const handleSubmit1 = async (e) => {
        e.preventDefault();

        // show loading sign
        setIsLoading(true);

        const response = await fetch("/api/student/forgotp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: credentials }),
        });

        const json = await response.json();

        if (json.success) {
            setIsLoading(false);
            localStorage.setItem("Otp", json.authToken)
            setsendotp(false)
            setShowOtpDiv(true);
        }

        if (json.error) {
            setIsLoading(false);
            setError(json.error);
            setCredentials("");
            setTimeout(() => {
                setError(null);
            }, 4000);
        }
    };

    const onChange = (event) => {
        event.preventDefault()
        setCredentials(event.target.value)
    };

    const onChange2 = (event) => {
        event.preventDefault()
        setotp(event.target.value)
    };

    const handleSubmit2 = async (e) => {
        e.preventDefault();

        // show loading sign
        setIsLoading2(true);

        var decoded = jwt_decode(localStorage.getItem("Otp"));

        if (decoded.otp === enotp) {

            const response = await fetch("/api/student/enterproc", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: credentials}),
            });

            const json = await response.json();

            if (json.success) {
                setIsLoading2(false);
                localStorage.setItem("UpdateToken", json.granttoken)
                localStorage.removeItem("Otp")
                navigate("/student/updatepass")
            }

            if (json.error) {

                setIsLoading2(false);
                setError(json.error);
                setTimeout(() => {
                    setError(null);
                }, 4000);
            }
        }
        else {

            setIsLoading2(false);
            setError("Otp invalid");
            setTimeout(() => {
                setError(null);
            }, 4000); 
            localStorage.removeItem("Otp")
            setsendotp(true)
            setShowOtpDiv(false)
        }

    }

    return (
        <React.Fragment>

            <Navbar />

            <div className={styles.colordiv}>
                <div className={styles.colour1}></div>
            </div>
            <div className={styles.signupform}>
                <h3 className={styles.login2}>Forgot Password</h3>

                <form className={styles.forms2} onSubmit={handleSubmit1}>

                    <label htmlFor="Email">Email</label>
                    <input type="email" name="email" onChange={onChange} placeholder="" className={styles.fields} />

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
                        {!isLoading && sendotp && (
                            <button className={styles.loginbutton} id="submitButton">
                                <span className={styles.logintext}>Send OTP</span>
                            </button>
                        )}
                    </div>
                </form>


                {showOtpDiv && (
                    <form className={styles.forms2} onSubmit={handleSubmit2}>
                        <label htmlFor="otp">Enter OTP</label>
                        <input type="number" name="otp" onChange={onChange2} placeholder="" className={styles.fields} />
                        <div>
                            {isLoading2 ? (
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
                            ) : (
                                <button className={styles.loginbutton} id="submitButton">
                                    <span className={styles.logintext}>Verify</span>
                                </button>
                            )}
                        </div>
                    </form>
                )}

                {error && (
                    <div className={styles.error} style={{ marginTop: "2.4rem" }}>
                        {error}
                    </div>
                )}
            </div>
        </React.Fragment>

    )
}


export default ForgotPass