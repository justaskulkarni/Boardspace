import React from 'react'
import { Outlet, Navigate } from "react-router-dom"
import jwt_decode from 'jwt-decode'

const AdminPrivateRoutes = () => {
  const returnRole = (reqtoken) => {
        if (reqtoken) {
            var decoded = jwt_decode(reqtoken)
            console.log(decoded.role)
            return (decoded.role)
        }
        else {
            return (null)
        }
    }

    var frole = returnRole(localStorage.getItem("Token"))

    console.log(frole)

    return (
        (localStorage.getItem("Token") && frole === "Admin") ? <Outlet /> : <Navigate to="/admin/login" />
    )
}

export default AdminPrivateRoutes
