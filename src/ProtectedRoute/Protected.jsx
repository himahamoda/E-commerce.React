import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export default function Protected(props) {

    if (localStorage.getItem('userToken') !== null) {
        return props.children
    }
    else {
        return <Navigate to={'/Login'} />
    }

}
