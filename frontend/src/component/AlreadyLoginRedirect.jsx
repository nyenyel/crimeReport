import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { Navigate } from 'react-router-dom'

export default function AlreadyLoginRedirect() {
    const {token, role} = useContext(AppContext)
    if (role === 'Admin') {
        return (
            <>
                {token != null && <Navigate to={'/admin'} replace={true} />}
            </>
        )
    } else if(role === 'community'){
        return (
            <>
                {token != null && <Navigate to={'/community'} replace={true} />}
            </>
        )
    } else {
        return (
            <>
                {token != null && <Navigate to={'/pnp'} replace={true} />}
            </>
        )
    }
}
