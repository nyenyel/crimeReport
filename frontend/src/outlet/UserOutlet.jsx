import React from 'react'
import LoginRedirect from '../component/LoginRedirect'

export default function UserOutlet() {
  return (
    <>
    <LoginRedirect/>
        <div>
            <div className='flex pr-6 pt-4 text-prc font-light text-3xl'>
                <div className='flex-1'/>
                User Management
            </div>
        </div>
    </>
  )
}
