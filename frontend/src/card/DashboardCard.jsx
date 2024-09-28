import React from 'react'

export default function DashboardCard() {
  return (
    <>
        <div className='bg-white pt-5 pb-5 rounded-md drop-shadow-sm font-semibold text-text mb-4'>
            <div className='px-5 pb-3'>
                <div className='font-bold text-xl mb-1'>Reporter Full Name</div>
                <div className='text-sm'>Category: Theft</div>
                <div className='text-sm'>Status: Dispatched</div>
                <div className='text-sm '>November 10, 2024 12:01 A.M.</div>
            </div>
            <div className='bg-text h-56 text-white text-center bg-opacity-50'>Location</div>
        </div>
    </>
  )
}
