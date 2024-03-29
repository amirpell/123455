import React from 'react'
import { Navigate } from "react-router-dom"

function ProtectedRouteM(props) {



    if (localStorage.getItem('token')) {
        return props.children;

    } else {
        return <Navigate to="/userlogin" />
    }

}

export default ProtectedRouteM
