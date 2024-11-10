import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { Navigate } from 'react-router-dom'

export default function AlreadyLoginRedirect() {
    const {token, role} = useContext(AppContext)
    console.log(token)
    if (role === 'Admin') {
        return (
            <>
                {token != null && <Navigate to={'/admin'} replace={true} />}
            </>
        )
    }
    else {
        return (
            <>
                {token != null && <Navigate to={'/pnp'} replace={true} />}
            </>
        )
    }
}
