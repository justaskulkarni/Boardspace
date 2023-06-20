import { Outlet, Navigate } from "react-router-dom"
import jwt_decode from 'jwt-decode'

const MentorPassUpdate = () => {
    
    const returnUpdate = (reqtoken) => {
        try {
            if (reqtoken) {
                var decoded = jwt_decode(reqtoken)
                return (decoded.note)
            }
            else {
                return (null)
            }    
        } catch (error) {
            return (null)
        }
        
    }
    var fnote = returnUpdate(localStorage.getItem("UpdateToken"))

    return (
        (localStorage.getItem("UpdateToken") && fnote === "Lethimupdate") ? <Outlet /> : <Navigate to="/mentor/forgotpassword" />
    )
}

export default MentorPassUpdate