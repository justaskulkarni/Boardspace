import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

// import '../stylesheets/notaccepted.css'

const Notaccepted = () => {

    const location = useLocation()

    return (
        <>

            <Navbar />
            <div>
                {location.state && <div>{location.state.message}</div>}
            </div>

            <div className="wrapper">
                <div className="box">
                    {location.state && <p>{location.state.message}</p> }
                    <p>Sorry, it's not allowed to go beyond this point!</p>
                </div>
            </div>

        </>
    )
}

export default Notaccepted