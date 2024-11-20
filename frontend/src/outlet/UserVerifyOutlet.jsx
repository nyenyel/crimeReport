import React, { useContext, useEffect, useState } from 'react'
import LoginRedirect from '../component/LoginRedirect'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import Loading from '../component/Loading'

export default function UserVerifyOutlet() {
    const {id} = useParams()
    const {apiClient} =useContext(AppContext)
    const [loading ,setLoading] = useState(false)
    const navigate = useNavigate()
    const [data, setData] = useState()
    const [rank, setRank] = useState()
    const [station, setStation] = useState()
    const [newDataForm, setNewDataForm] = useState()

    const getData = async () => {
        setLoading(true)
        try {
            const response = await apiClient.get(`v1/crud/user/${id}`)
            setData(response.data.data)
        } catch  (error) {
            console.error("error: ", error.response)
        } finally {
            setLoading(false)
        }
    } 

    const updateData = async () => {
        setLoading(true)
        try {
            if(newDataForm?.lib_role_id){
                const response = await apiClient.put(`v1/crud/user/${id}`, newDataForm)
            } else {
                const response = await apiClient.put(`v1/crud/community-user/${id}`, newDataForm)
            }
            navigate(0)
        } catch  (error) {
            console.error("error: ", error.response.data.errors)
        } finally {
            setLoading(false)
        }
    }

    const deleteData = async () => {
        setLoading(true)
        try {
            const response = await apiClient.delete(`v1/crud/user/${id}`)
            navigate('/admin/user')
        } catch  (error) {
            console.error("error: ", error.response.data.errors)
        } finally {
            setLoading(false)
        }
    }

    const handleVerify = (e) => {
        e.preventDefault()
        updateData()
    }
    const handleDelete = (e) => {
        e.preventDefault()
        deleteData()
    }
    useEffect(()=> {
        getData()
    }, [id])

    useEffect(() => {
        if (data) {
            if(data.isVerified){
                navigate(`/admin/user/profile/${id}`);  // Navigate only if data is loaded and isVerified is false
            }
            setNewDataForm({
                username: data?.username,
                password: '',
                password_confirmation: '',
                email: data?.email,
                first_name: data?.first_name || null,
                last_name: data?.last_name || null,
                middle_name: data?.middle_name|| null,
                phone_no: data?.phone_no,
                badge_no: data?.badge_no || null,
                location_id: data?.location.id,
                lib_role_id: data?.role?.id || null,
                lib_gender_id: data?.gender.id,
                lib_station_id: data?.station?.id || null,
                lib_rank_id: data?.rank?.id || null,
                isVerified: true
            })
            console.log(data)
        }
    }, [data, navigate]);

    if(newDataForm?.lib_role_id){
        return (
        <>
        <LoginRedirect/>
        {loading && <Loading />}
        <div className=''>
            <div className='flex pr-6 pt-4 text-prc font-light text-3xl mb-2'>
                <div className='flex-1'/>
                User Profile
            </div>
            <div className='bg-white p-4 rounded-md drop-shadow-sm font-light text-xl text-text '>
                <form className='flex flex-col text-text' >
                    <div className='flex flex-col'>
                        Basic Information
                        <div className='bg-prc h-0.5 w-96 mt-1 bg-opacity-30 rounded-full'/>
                        <div className='flex-1 flex gap-4 mt-5'>
                            <div className='flex-1 flex flex-col'>
                                <label className='text-sm font-regular'>First Name</label>
                                <div className='font-medium border-b-2 px-2 py-1 bg-gray-400 bg-opacity-5'>
                                    {newDataForm?.first_name}
                                </div>
                            </div>
                            <div className='flex-1 flex flex-col'>
                                <label className='text-sm font-regular'>Middle Name</label>
                                <div  className='font-medium  border-b-2 px-2 py-1 bg-gray-400 bg-opacity-5'>
                                    {newDataForm?.middle_name}
                                </div>
                            </div>
                            <div className='flex-1 flex flex-col'>
                                <label className='text-sm font-regular'>Last Name</label>
                                <div className='font-medium  border-b-2 px-2 py-1 bg-gray-400 bg-opacity-5'>
                                    {newDataForm?.last_name}
                                </div>
                            </div>
                        </div>
                        <div className='flex-1 flex gap-4 mt-2'>
                            <div className='flex-1 flex flex-col'>
                                <label className='text-sm font-regular'>Username</label>
                                <div  className='font-medium border-b-2 px-2 py-1 bg-gray-400 bg-opacity-5'>
                                    {newDataForm?.username}
                                </div>
                            </div>
                            <div className='flex-none flex flex-col text-text'>
                                <label className='text-sm font-regular'>Gender</label>
                                <div  className='font-medium border-b-2 px-2 py-1 bg-gray-400 bg-opacity-5'>
                                    {data?.gender?.desc}
                                </div>
                            </div>
                        </div>
                    <div className='flex-1 flex gap-4 mt-2'>
                            <div className='flex-1 flex flex-col'>
                                <label className='text-sm font-regular'>Phone No.</label>
                                <div className='font-medium border-b-2 px-2 py-1 bg-gray-400 bg-opacity-5'>
                                {newDataForm?.phone_no}
                                </div>
                            </div>
                            <div className='flex-1 flex flex-col'>
                                <label className='text-sm font-regular'>E-mail</label>
                                <div className='font-medium  border-b-2 px-2 py-1 bg-gray-400 bg-opacity-5'>
                                    {newDataForm?.email} 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col mt-5'>
                        Work Information
                        <div className='bg-prc h-0.5 w-96 mt-1 bg-opacity-30 rounded-full'/>
                        <div className='flex-1 flex gap-4 mt-5'>
                            <div className='flex-1 flex flex-col'>
                                <label className='text-sm font-regular'>Badge No.</label>
                                <div  className='font-medium border-b-2 px-2 py-1 bg-gray-400 bg-opacity-5' >
                                    {data?.badge_no}
                                </div>
                            </div>
                            <div className='flex-none flex flex-col'>
                                <label className='text-sm font-regular'>Rank</label>
                                <div  className='font-medium border-b-2 px-2 py-1 bg-gray-400 bg-opacity-5' >
                                    {data?.rank?.desc}
                                </div>
                            </div>
                            <div className='flex-none flex flex-col'>
                                <label className='text-sm font-regular'>Role</label>
                                <div  className='font-medium border-b-2 px-2 py-1 bg-gray-400 bg-opacity-5' >
                                    {data?.role?.desc}
                                </div>
                            </div>
                        </div>
                        <div className='flex-1 flex flex-col mt-2'>
                            <label className='text-sm font-regular'>Station</label>
                            <div  className='font-medium border-b-2 px-2 py-1 bg-gray-400 bg-opacity-5' >
                                {data?.station?.address}
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        <button onClick={handleDelete} className='bg-src flex-1 text-white py-2 rounded-md mt-4'>Delete</button>
                        <button onClick={handleVerify} className='bg-prc flex-1 text-white py-2 rounded-md mt-4'>Verify</button>
                    </div>
                </form>
            </div>
        </div>
        </>
        )
    } else{
        return(
            <>
            <div className=''>
            <div className='flex pr-6 pt-4 text-prc font-light text-3xl mb-2'>
                <div className='flex-1'/>
                Community Profile
            </div>
            <div className='bg-white p-4 rounded-md drop-shadow-sm font-light text-xl text-text '>
                <form className='flex flex-col text-text' >
                    <div className='flex flex-col'>
                        Basic Information
                        <div className='bg-prc h-0.5 w-96 mt-1 bg-opacity-30 rounded-full'/>
                        
                        <div className='flex-1 flex gap-4 mt-2'>
                            <div className='flex-1 flex flex-col'>
                                <label className='text-sm font-regular'>Username</label>
                                <div  className='font-medium border-b-2 px-2 py-1 bg-gray-400 bg-opacity-5'>
                                    {newDataForm?.username}
                                </div>
                            </div>
                            <div className='flex-none flex flex-col text-text'>
                                <label className='text-sm font-regular'>Gender</label>
                                <div  className='font-medium border-b-2 px-2 py-1 bg-gray-400 bg-opacity-5'>
                                    {data?.gender?.desc}
                                </div>
                            </div>
                        </div>
                    <div className='flex-1 flex gap-4 mt-2'>
                            <div className='flex-1 flex flex-col'>
                                <label className='text-sm font-regular'>Phone No.</label>
                                <div className='font-medium border-b-2 px-2 py-1 bg-gray-400 bg-opacity-5'>
                                {newDataForm?.phone_no}
                                </div>
                            </div>
                            <div className='flex-1 flex flex-col'>
                                <label className='text-sm font-regular'>E-mail</label>
                                <div className='font-medium  border-b-2 px-2 py-1 bg-gray-400 bg-opacity-5'>
                                    {newDataForm?.email} 
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className='flex gap-2'>
                        <button onClick={handleDelete} className='bg-src flex-1 text-white py-2 rounded-md mt-4'>Delete</button>
                        <button onClick={handleVerify} className='bg-prc flex-1 text-white py-2 rounded-md mt-4'>Verify</button>
                    </div>
                </form>
            </div>
        </div>
        </>
        )
    }

}
