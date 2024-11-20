import React from 'react'

export default function Loading() {
  return (
<div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
  <div className="h-5 w-5 bg-src rounded-full animate-bounce [animation-delay:-0.3s]"></div>
  <div className="h-5 w-5 bg-src rounded-full animate-bounce [animation-delay:-0.15s]"></div>
  <div className="h-5 w-5 bg-src rounded-full animate-bounce"></div>
</div>

    
  )
}
