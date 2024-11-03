import React, { useEffect, useState } from 'react'
import LoginRedirect from '../component/LoginRedirect'
import AlreadyLoginRedirect from '../component/AlreadyLoginRedirect'
import Logo from '../component/Logo'
import Loading from '../component/Loading'
import bgImage from '../resource/bg.jpg'
import { crud } from '../resource/api'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import { getCurrentLocation } from './LoginModule'


export default function PublicModule() {
    const [loading, setLoading] = useState(false)
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [location,setLocation] = useState([]);

    const currentLocation = async () => {
        try{
            setLoading(true)

            const data = await getCurrentLocation()
            setLocation(data)
        } catch {
            console.log("error")
        } finally {
            setLoading(false)
        }
    }
    useEffect(()=> {
        currentLocation()
    }, [])

    const[reportForm, setReportForm] = useState({
        info: {
            lib_status_id: 1,
            title: '',
            desc: '',
            reporter_name: '',
            category: '',
        },
        location: {
            long: location?.long,
            lat: location?.lat,
        },
        evidence: []
    })
    const handleChange = (e) => {
        const {name, value} = e.target
        setReportForm((prev) => ({
            ...prev,
            info: {
                ...prev.info,
                [name]: value
            }, 
            location: {
                ...prev.location,
                long: location.long,
                lat: location.lat,
            }
        }));

    }
    const handleFileChange = (event) => {
        setReportForm((prev) => ({
          ...prev,
          evidence: Array.from(event.target.files), // Store files directly
        }));
      };

    const handleSubmmit = (e) => {
        e.preventDefault()
        setLoading(true)
        const login = async () => {
            try{
                const response = await axios.post(crud.concat('report'), reportForm, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                })
                console.log(reportForm)
            } catch (e){
                console.log("Error: ", e)
            } finally {
                setLoading(false)
                // navigate('/admin')
            }
        }
        // login()
        console.log(reportForm)
    }

    return (
        <>
        {loading && (<Loading />)}
        <AlreadyLoginRedirect />
        <div className='relative flex h-screen overflow-hidden'>
            <div
                className='absolute -inset-4 bg-cover bg-no-repeat blur-md'
                style={{ backgroundImage: `url(${bgImage})` }}
            ></div>

            <div className='relative flex-1 flex justify-end'>
                <div className='flex-1 bg-gradient-to-l from-src to-prc rounded-r-lg p-10 text-sec-text flex flex-col justify-center z-10'>
                    <NavLink to={'login'}>
                        <Logo />
                    </NavLink>
                    <div className='mt-6 text-4xl font-bold '>Crime Report</div>
                    <div className='mt-1 text-lg mb-5 '>Please describe the crime your reporting.</div>

                    <form className=' w-full' onSubmit={handleSubmmit}>
                        <div className='flex flex-col'>
                            <div className=''>
                                <label className='title text-sm '>Full Name</label>
                                <input
                                    onChange={handleChange}
                                    type='text'
                                    name='reporter_name'
                                    placeholder='Full Name'
                                    className='px-4 py-2 rounded text-black border-2 bg-white w-full'
                                />
                                <div className='flex gap-2 my-2'>
                                    <div className='flex-1'>
                                        <label className='title text-sm '>Title</label>
                                        <input
                                            onChange={handleChange}
                                            type='text'
                                            name='title'
                                            placeholder='Title'
                                            className='px-4 py-2 rounded text-black border-2 bg-white w-full'
                                            />
                                    </div>
                                    <div className='flex-1'>
                                        <label className='title text-sm '>Crime Category</label>
                                        <input
                                            onChange={handleChange}
                                            type='text'
                                            name='category'
                                            placeholder='Crime Category'
                                            className='px-4 rounded  py-2  text-black border-2 bg-white w-full'
                                            />
                                    </div>
                                </div>

                                <label className='title text-sm '>Description</label>
                                <textarea
                                    rows={5}
                                    onChange={handleChange}
                                    type='text'
                                    name='desc'
                                    placeholder='Describe the crime being reported'
                                    className='px-4 py-2 rounded text-black border-2 bg-white w-full'
                                />
                            </div>
                            <label className='title mt-2 text-sm '>Evidence</label>
                            <input
                                type="file"
                                multiple
                                accept="image/*, video/*"
                                className=' bg-white p-2 rounded text-black'
                                onChange={handleFileChange}
                            />
                        </div>

                        <button type='submit' className='w-full bg-src py-2 rounded-md mt-4'>Send Report</button>
                    </form>
                </div>
            </div>
            <div className='flex-1'></div>

        </div>
        </>
    )
}
