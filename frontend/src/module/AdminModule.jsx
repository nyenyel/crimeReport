import React, { useContext } from 'react'
import SideBar from '../component/SideBar'
import { Outlet } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import LoginRedirect from '../component/LoginRedirect'

export default function AdminModule() {
    return (
        <>
        <LoginRedirect />
        <div className='flex'>
            <div className='sticky top-0 h-full overflow-y-auto'>
                <SideBar />
            </div>
            <div className='flex-1 ml-4 py-4 pr-6'>
                <Outlet />
            </div>
        </div>
        </>
    )
}
