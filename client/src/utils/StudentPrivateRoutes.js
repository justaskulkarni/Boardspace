import { Outlet, Navigate } from "react-router-dom"
import jwt_decode from 'jwt-decode'

const StudentPrivateRoutes = () => {

    const returnRole = (reqtoken) => {
        if (reqtoken) {
            var decoded = jwt_decode(reqtoken)
            return (decoded.role)
        }
        else {
            return (null)
        }
    }

    var frole = returnRole(localStorage.getItem("Token"))

    return (
        (localStorage.getItem("Token") && frole === "Student") ? <Outlet /> : <Navigate to="/student/login" />
    )
}

export default StudentPrivateRoutes