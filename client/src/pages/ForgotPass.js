import React from 'react'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import styles from "../stylesheets/MentorAuth2.module.css";

const ForgotPass = () => {

    const [error, setError] = useState(null);



    return (
        <React.Fragment>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" />

            <Navbar />

        </React.Fragment>

    )
}


export default ForgotPass