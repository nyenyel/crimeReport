import React, { useState } from 'react'
import Loading from '../component/Loading'
import { crud } from '../resource/api'
import axios from 'axios'

export default function ReportCard({data, user, token}) {
    const dateString = data?.created_at
    const dateObject = new Date(dateString)
    const [loading, setLoading] = useState(false)
    // Format date and time
    const formattedDate = dateObject.toLocaleDateString('en-US', {
        month: 'short', 
        day: 'numeric', 
        year: 'numeric'
    }).toUpperCase()
    const formattedTime = dateObject.toLocaleTimeString()
    
    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        setSelectedImage('');
    };
    const handleReportUpdate = async (action) => {
        setLoading(true)
        try{
            const response = await axios.put(
                crud.concat(`report/${data?.id}`), //endpoint
                {lib_status_id: `${action}`},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
        } catch (e) {
            console.error("Error: ",e)
        } finally {
            setLoading(false)
        }
    }
  return (
    <>
    {loading && (<Loading />)}
    <div className='bg-white pt-5 pb-5 rounded-md drop-shadow-sm font-semibold text-text mb-4'>
        <div className='px-5 pb-3'>
            <div className='font-bold text-xl mb-1'>{data?.reporter_name}</div>
            <div className='text-sm'>Category: {data?.category?.desc}</div>
            <div className='text-sm'>Status: {data?.status?.desc}</div>
            <div className='text-sm '>{formattedDate} - {formattedTime}</div>
            <div className='text-sm flex '>Description: <div className='ml-1'> {data?.desc}</div></div>

        </div>
        <div className='bg-text text-white text-center bg-opacity-50 flex flex-wrap'>
            {data?.evidence?.map((item, index) => (
                <div key={index} className='flex-grow basis-1/4'> {/* Adjust padding as needed */}
                <img 
                    src={`${item?.image}`} 
                    alt='evidence' 
                    className='h-56 w-full object-cover cursor-pointer hover:scale-101'
                    onClick={() => handleImageClick(item?.image)}
                />
                </div>
            ))}
        </div>
        <div className='flex mt-3 gap-2 text-white select-none' >
            <div onClick={()=>(handleReportUpdate(3))} className='flex-1 bg-src text-center py-2 hover:scale-99 cursor-pointer'>
                Decline
            </div>
            <div onClick={()=>(handleReportUpdate(2))} className='flex-1 bg-prc text-center py-2 hover:scale-101 cursor-pointer'>
                Accept
            </div>
        </div>
    </div>
    {isOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 ' onClick={handleCloseModal}>
          <div className='relative' >
            <img 
              src={selectedImage} 
              alt='Zoomed evidence' 
              className='h-screen max-h-full max-w-auto p-20' 
            />
            <button 
              className='absolute top-3 right-3 text-white text-2xl' 
              onClick={handleCloseModal}
            >
              &times; {/* Close button */}
            </button>
          </div>
        </div>
    )}
</>
  )
}
