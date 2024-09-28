import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { Navigate } from 'react-router-dom'

export default function LoginRedirect() {
    const {token} = useContext(AppContext)
    return (
        <>
        {token == null &&(<Navigate to={'/login'} replace={true}/>)}
        </>
    )
}
