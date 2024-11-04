import React, { useContext, useEffect, useState } from 'react'
import Logo from '../component/Logo'
import Loading from '../component/Loading'
import axios from 'axios'
import { auth } from '../resource/api'
import { AppContext } from '../context/AppContext'
import { NavLink, useNavigate } from 'react-router-dom'
import AlreadyLoginRedirect from '../component/AlreadyLoginRedirect'
import bgImage from '../resource/bg.jpg'

export default function RegisterModule() {
    const navigate = useNavigate()
    const {setToken, apiClient} = useContext(AppContext) 
    const [loading, setLoading] = useState(false)
    const [newDataForm, setNewDataForm] = useState()
    const [rank, setRank] = useState()
    const [station, setStation] = useState()
    const [apiResponse, setApiResponse] = useState()

    const getData = async () => {
        setLoading(true)
        try {
            const rank = await apiClient.get(`v1/crud/rank`)
            const station = await apiClient.get(`v1/crud/station`)
            setRank(rank.data.data)
            setStation(station.data.data)
        } catch  (error) {
            console.error("error: ", error.response)
        } finally {
            setLoading(false)
        }
    } 

    const handleChange = (e) => {
        const {name, value} = e.target
        setNewDataForm({
            ...newDataForm,
            [name]: value,
            location_id: 1
        })

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        storeData()
    }
    const storeData = async () => {
        setLoading(true)
        try {
            const response = await apiClient.post(`v1/auth/register`, newDataForm)
            navigate(0)
        } catch  (error) {
            console.error("error: ", error.response.data.errors)
            setApiResponse(error.response.data.errors)
        } finally {
            setLoading(false)
        }
    }
    useEffect(()=> {
        getData()
    }, [])
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
                <div className='flex-1'></div>
                <div className='flex-1 bg-gradient-to-l from-src to-prc rounded-lg p-10 text-sec-text flex flex-col justify-center z-10'>
                    <NavLink to={'/'}>
                        <Logo />
                    </NavLink>
                    <div className='mt-1 text-4xl font-bold '>Register</div>
                    <div className='mt-1 text-lg mb-4 '>Please enter your credentials!</div>

                    <form className='flex flex-col text-white' onSubmit={handleSubmit} >
                        <div className='flex flex-col'>
                            Basic Information
                            <div className='bg-prc h-0.5 w-96 mt-1 bg-opacity-30 rounded-full'/>
                            <div className='flex-1 flex gap-4 mt-5'>
                                <div className='flex-1 flex flex-col'>
                                    <label className='text-sm font-regular'>First Name</label>
                                    <input type='text' name='first_name' onChange={handleChange} value={newDataForm?.first_name || ''} className='font-medium border-b-2 px-2 py-1 bg-gray-400 bg-opacity-5' placeholder='First Name'/>
                                    {apiResponse?.first_name?.map((item, index) => (
                                        <div className='text-red-700 text-opacity-75 text-sm' key={index}> {item} </div>
                                    ))}
                                </div>
                                <div className='flex-1 flex flex-col'>
                                    <label className='text-sm font-regular'>Middle Name</label>
                                    <input type='text' name='middle_name' onChange={handleChange} value={newDataForm?.middle_name || ''} className='font-medium  border-b-2 px-2 py-1 bg-gray-400 bg-opacity-5' placeholder='Middle Name'/>
                                    {apiResponse?.middle_name?.map((item, index) => (
                                        <div className='text-red-700 text-opacity-75 text-sm' key={index}> {item} </div>
                                    ))}
                                </div>
                                <div className='flex-1 flex flex-col'>
                                    <label className='text-sm font-regular'>Last Name</label>
                                    <input type='text' name='last_name' onChange={handleChange} value={newDataForm?.last_name || ''} className='font-medium  border-b-2 px-2 py-1 bg-gray-400 bg-opacity-5' placeholder='Last Name'/>
                                    {apiResponse?.last_name?.map((item, index) => (
                                        <div className='text-red-700 text-opacity-75 text-sm' key={index}> {item} </div>
                                    ))}
                                </div>
                            </div>
                            <div className='flex-1 flex gap-4 mt-2'>
                                <div className='flex-1 flex flex-col'>
                                    <label className='text-sm font-regular'>Username</label>
                                    <input type='text' name='username' onChange={handleChange} value={newDataForm?.username || ''} className='font-medium border-b-2 px-2 py-1 bg-gray-400 bg-opacity-5' placeholder='Username'/>
                                    {apiResponse?.username?.map((item, index) => (
                                        <div className='text-red-700 text-opacity-75 text-sm' key={index}> {item} </div>
                                    ))}
                                </div>
                                <div className='flex-none flex flex-col text-white'>
                                    <label className='text-sm font-regular mb-2'>Gender</label>
                                    <div className='flex flex-row gap-6'>
                                        <div className="flex items-center ">
                                            <input onChange={handleChange} value={1} id="default-radio-1" type="radio"  name="lib_gender_id" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 "/>
                                            <label htmlFor="default-radio-1" className="ms-2 text-sm text-gray-900">Male</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input onChange={handleChange}   value={2} id="default-radio-2" type="radio"  name="lib_gender_id" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 "/>
                                            <label htmlFor="default-radio-2" className="ms-2 text-sm ">Female</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <div className='flex-1 flex gap-4 mt-2'>
                                <div className='flex-1 flex flex-col'>
                                    <label className='text-sm font-regular'>Phone No.</label>
                                    <input type='text' name='phone_no' onChange={handleChange} value={newDataForm?.phone_no || ''} className='font-medium border-b-2 px-2 py-1 bg-gray-400 bg-opacity-5' placeholder='Phone No'/>
                                    {apiResponse?.phone_no?.map((item, index) => (
                                        <div className='text-red-700 text-opacity-75 text-sm' key={index}> {item} </div>
                                    ))}
                                </div>
                                <div className='flex-1 flex flex-col'>
                                    <label className='text-sm font-regular'>E-mail</label>
                                    <input type='email' name='email' onChange={handleChange} value={newDataForm?.email || ''} className='font-medium  border-b-2 px-2 py-1 bg-gray-400 bg-opacity-5' placeholder='E-mail'/>
                                    {apiResponse?.email?.map((item, index) => (
                                        <div className='text-red-700 text-opacity-75 text-sm' key={index}> {item} </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col mt-5'>
                            Work Information
                            <div className='bg-prc h-0.5 w-96 mt-1 bg-opacity-30 rounded-full'/>
                            <div className='flex-1 flex gap-4 mt-5'>
                                <div className='flex-1 flex flex-col'>
                                    <label className='text-sm font-regular'>Badge No.</label>
                                    <input type='text' name='badge_no' onChange={handleChange} value={newDataForm?.badge_no || ''} className='font-medium border-b-2 px-2 py-1 bg-gray-400 bg-opacity-5' placeholder='Badge No'/>
                                    {apiResponse?.badge_no?.map((item, index) => (
                                        <div className='text-red-700 text-opacity-75 text-sm' key={index}> {item} </div>
                                    ))}
                                </div>
                                <div className='flex-none flex flex-col'>
                                    <label className='text-sm font-regular'>Rank</label>
                                    <select name='lib_rank_id' value={newDataForm?.lib_rank_id} onChange={handleChange}  className="bg-gray-400 font-medium bg-opacity-5 block py-2 px-4  w-full text-sm text-white  border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                                        {rank?.map((item, index) => (
                                            <option value={item?.id} key={`rank-${index}`}>{item?.desc}</option>    
                                        ))}
                                    </select>
                                </div>
                                <div className='flex-none flex flex-col'>
                                    <label className='text-sm font-regular'>Role</label>
                                    <select name='lib_role_id' value={newDataForm?.lib_role_id} onChange={handleChange} className="bg-gray-400 font-medium bg-opacity-5 block py-2 px-4  w-full text-sm text-white  border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                                        <option value={1} >Admin</option>    
                                        <option value={2} >PNP</option>    
                                    </select>
                                </div>
                            </div>
                            <div className='flex-1 flex flex-col mt-2'>
                                <label className='text-sm font-regular'>Station</label>
                                <select name='lib_station_id' value={newDataForm?.lib_station_id} onChange={handleChange}  className="bg-gray-400 font-medium bg-opacity-5 block py-2 px-4  w-full text-sm text-white  border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                                    {station?.map((item, index) => (
                                        <option value={item?.id} key={`station-${index}`}> {item?.address} </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='flex flex-col mt-5'>
                            Password
                            <div className='bg-prc h-0.5 w-96 mt-1 bg-opacity-30 rounded-full'/>
                            <div className='flex-1 flex gap-4 mt-5'>
                                <div className='flex-1 flex flex-col'>
                                    <label className='text-sm font-regular'>New Password</label>
                                    <input type='password' name='password' onChange={handleChange} className=' border-b-2 px-2 py-1 bg-gray-400 bg-opacity-5' placeholder='Password'/>
                                </div>
                            </div>
                            <div className='flex-1 flex gap-4 mt-2'>
                                <div className='flex-1 flex flex-col'>
                                    <label className='text-sm font-regular'>Confirm Password</label>
                                    <input type='password' name='password_confirmation' onChange={handleChange} className='border-b-2 px-2 py-1 bg-gray-400 bg-opacity-5' placeholder='Confirm Password'/>
                                </div>
                            </div>
                            {apiResponse?.password?.map((item, index) => (
                                <div className='text-red-700 text-opacity-75 text-sm' key={index}> {item} </div>
                            ))}
                        </div>
                        <button type='submit' className='bg-prc text-white py-2 rounded-md mt-4'>Register</button>
                    </form>
                </div>
            </div>
        </div>
    </>
    )
}
