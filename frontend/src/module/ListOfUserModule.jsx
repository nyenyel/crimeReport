import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function ListOfUserModule() {
  return (
    <>
    <div className=''>
        <div className='flex pt-4 text-prc font-light text-3xl mb-2'>
            <div className='flex-1'/>
            User Management
        </div>
        <div className='p-2 mb-2 flex'>
          <NavLink to={'pnp'} 
            className={({ isActive }) => {
                return ` flex-none content-center px-5 ${isActive && 'border-b-4 border-prc pb-2 '}`
            }}
          >
            <div className=' font-semibold text-lg'>PNP</div>
          </NavLink>
          <NavLink to={'community'} 
            className={({ isActive }) => {
                return ` flex-none content-center px-5 ${isActive && 'border-b-4 border-prc pb-2 '}`
            }}
          >
            <div className=' font-semibold text-lg'>Community</div>
          </NavLink>
        </div>
        <div><Outlet/></div>
    </div>
    </>
  )
}
