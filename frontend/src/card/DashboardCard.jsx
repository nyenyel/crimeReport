import React from 'react'

export default function DashboardCard({data}) {
  const dateString = data?.created_at
  const dateObject = new Date(dateString)

  // Format date and time
  const formattedDate = dateObject.toLocaleDateString('en-US', {
      month: 'short', 
      day: 'numeric', 
      year: 'numeric'
  }).toUpperCase()
  const formattedTime = dateObject.toLocaleTimeString()
  return (
    <>
        <div className='bg-white pt-5 pb-5 rounded-md drop-shadow-sm font-semibold text-text mb-4'>
        <div className='px-5 pb-3'>
            <div className='font-bold text-xl mb-1'>{data?.reporter_name}</div>
            <div className='text-sm'>Category: {data?.category?.desc}</div>
            <div className='text-sm'>Status: {data?.status?.desc}</div>
            <div className='text-sm '>{formattedDate} - {formattedTime}</div>
        </div>
        <div className='bg-text h-56 text-white text-center bg-opacity-50'>Location</div>
    </div>
    </>
  )
}
