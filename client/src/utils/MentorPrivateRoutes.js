import { Outlet, Navigate } from "react-router-dom"

const StudentPrivateRoutes = () =>{

    return(
        (localStorage.getItem("Mentor")) ? <Outlet/> : <Navigate to = "/login" />
    )
}

export default StudentPrivateRoutes