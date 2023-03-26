import { Outlet, Navigate } from "react-router-dom"

const PrivateRoutes = () =>{

    return(
        (localStorage.getItem("Mentor")) ? <Outlet/> : <Navigate to = "/login" />
    )
}

export default PrivateRoutes