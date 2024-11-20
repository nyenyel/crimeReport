import React, { useContext } from 'react'
import SideBar from '../component/SideBar'
import { Outlet } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import LoginRedirect from '../component/LoginRedirect'
import AlreadyLoginRedirect from '../component/AlreadyLoginRedirect'

export default function CommunityModule() {
    const {role} = useContext(AppContext)
    return (
        <>
        <LoginRedirect />
        <div className='flex'>
            <SideBar />
            <div className='flex-1 ml-4 py-4 pr-6'>
                <Outlet />
            </div>
        </div>
        </>
    )
}
