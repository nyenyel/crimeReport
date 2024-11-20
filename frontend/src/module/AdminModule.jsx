import React, { useContext } from 'react'
import SideBar from '../component/SideBar'
import { Outlet } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import LoginRedirect from '../component/LoginRedirect'
import Topbar from '../component/Topbar'
import AlreadyLoginRedirect from '../component/AlreadyLoginRedirect'

export default function AdminModule() {
    const {role} = useContext (AppContext)
    if(role !== 'Admin' && role){
        return (
            <AlreadyLoginRedirect />
        )
    }
    return (
        <>
        <LoginRedirect />
        <div className='flex max-[740px]:flex-col'>
            
            <SideBar />
            <div className='min-[740px]:hidden'>
                <Topbar />
            </div>
            <div className='flex-1 ml-4 py-4 pr-6'>
                <Outlet />
            </div>
        </div>
        </>
    )
}
