import React from 'react'
import DashboardCard from '../card/DashboardCard'
import LoginRedirect from '../component/LoginRedirect'

export default function DashboardOutlet() {
  return (
    <>
    <LoginRedirect />
        <div>
            <div className='flex pr-6 pt-4 text-prc font-light text-3xl'>
                <div className='flex-1'/>
                Dashboard
            </div>
            <div className='pr-6 mt-4'>
                <DashboardCard />
                <DashboardCard />
                <DashboardCard />
                <DashboardCard />
                <DashboardCard />
                <DashboardCard />
                <DashboardCard />
                <DashboardCard />

            </div>
        </div>
    </>
  )
}
