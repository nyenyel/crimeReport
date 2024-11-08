import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { crud } from '../resource/api'
import Loading from '../component/Loading'

export default function TrackerModule() {
    const {code} = useParams()
    const {apiClient} = useContext(AppContext)
    const [state, setState] = useState({
        loading: false,
        authenticated: false,
        data: null,
        error: null,
        form: {
            code: code,
            password: ''
        },
    })
    
    const handleSubmit = async (e) => {
        if (e.key === 'Enter') {
            console.log(state.form)
            setState((prev) => ({
                ...prev,
                loading: true
            }))
            try{
                const response = await apiClient.post(crud.concat('my-report'), state.form)
                setState((prev) => ({
                    ...prev,
                    data: response.data
                }))
                console.log(response.data)
            } catch (error) {
                setState((prev) => ({
                    ...prev,
                    error: error.response.data.message
                }))
                console.log(error.response.data.message)
            } finally {
                setState((prev) => ({
                    ...prev,
                    loading: false
                }))
            }
        }
    }
    const handleChange = (e) => {
        const {name, value} = e.target
        setState((prev) => ({
            ...prev,
            form: {
                ...prev.form,
                [name]: value
            }
        }))
    }

    return (
        <>
        {state.loading && <Loading />}
        {state?.data === null ? (
            <div className="absolute  bg-black w-full h-full bg-opacity-60 flex items-center justify-center">
            <div className="bg-prc drop-shadow text-md font-bold p-5 text-white rounded-md">
                This page is for report tracking!
                <div className='mt-2 text-sm font-normal'>To track your report please enter the password</div>
                <div className='mt-2 text-sm font-normal'>Password</div>
                <input onKeyDown={handleSubmit} onChange={handleChange} name='password' type='password' className='rounded-md p-2 font-normal text-prc w-full' placeholder='Please Enter your password'/>
                {state.error !==null  &&<label className='text-sm font-normal text-red-600'>{state?.error}</label>}
            </div>
        </div>
        ):(
        <div className="absolute z-50 bg-black w-full h-full bg-opacity-60 flex items-center justify-center">
            <div className="bg-prc drop-shadow text-md font-bold p-5 text-white rounded-md">
                Welcome! here's you report tracking!
                <div className='bg-white pt-5 pb-5 rounded-md drop-shadow-sm font-semibold text-text mb-4'>
                <div className='px-5 pb-3'>
                    <div className='text-sm'>Title: {state?.data?.title}</div>
                    <div className='text-sm'>Category: {state?.data?.category?.desc}</div>
                    <div className='text-sm'>Status: {state?.data?.status?.desc}</div>
                    <div className='text-sm'>Dispatched Officer: {state?.data?.user === null ? 'None' : `${state?.data?.user?.first_name} ${state?.data?.user?.last_name}` }</div>
                </div>

            </div>
            </div>
        </div>  
        )}
        
        </>
    )
}
