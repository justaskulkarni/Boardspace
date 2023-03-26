import { Outlet, Navigate } from "react-router-dom"

const MentorPrivateRoutes = () =>{

    return(
        (localStorage.getItem("Student")) ? <Outlet/> : <Navigate to = "/student/login" />
    )
}

export default MentorPrivateRoutes