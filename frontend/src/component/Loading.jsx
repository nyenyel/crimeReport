import React from 'react'

export default function Loading() {
  return (
    <div className='absolute z-50 w-full flex space-x-2 justify-center items-center bg-black bg-opacity-5 h-screen '>
        <div className='h-5 w-5 bg-src rounded-full animate-bounce [animation-delay:-0.3s]'></div>
      <div className='h-5 w-5 bg-src rounded-full animate-bounce [animation-delay:-0.15s]'></div>
      <div className='h-5 w-5 bg-src rounded-full animate-bounce'></div>
    </div>
    
  )
}
