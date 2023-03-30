import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Notaccepted = () => {

    const location = useLocation()

    return (
        <>

            <Navbar />
            <div>
                {location.state && <div>{location.state.message}</div>}
            </div>

        </>
    )
}

export default Notaccepted