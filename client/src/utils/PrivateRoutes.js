import { Outlet, Navigate } from "react-router-dom"

const PrivateRoutes = () =>{

    return(
        (localStorage.getItem("Token")) ? <Outlet/> : <Navigate to = "/login" />
    )
}

export default PrivateRoutes