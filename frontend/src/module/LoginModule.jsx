    import React, { useContext, useState } from 'react'
import Logo from '../component/Logo'
import Loading from '../component/Loading'
import axios from 'axios'
import { auth } from '../resource/api'
import { AppContext } from '../context/AppContext'
import { NavLink, useNavigate } from 'react-router-dom'
import AlreadyLoginRedirect from '../component/AlreadyLoginRedirect'
import bgImage from '../resource/bg.jpg'

export default function LoginModule() {
    const navigate = useNavigate()
    const {setToken} = useContext(AppContext) 
    const [loading, setLoading] = useState(false)
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    })
    const handleChange = (e) => {
        const {name, value} = e.target
        setLoginForm({
            ...loginForm,
            [name]: value
        })
    }
    const handleSubmmit = (e) => {
        e.preventDefault()
        setLoading(true)
        const login = async () => {
            try{
                const response = await axios.post(auth.concat('login'), loginForm, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                setToken(response.data.token)
                localStorage.setItem('token', response.data.token)
            } catch (e){
                console.log("Error: ", e)
            } finally {
                setLoading(false)
                navigate('/admin')
            }
        }
        login()
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
                <div className='flex-1'></div>
                <div className='flex-1 bg-gradient-to-l from-src to-prc rounded-lg p-10 text-sec-text flex flex-col justify-center z-10'>
                    <NavLink to={'/'}>
                        <Logo />
                    </NavLink>
                    <div className='mt-14 text-4xl font-bold '>Welcome</div>
                    <div className='mt-1 text-lg mb-10 '>Please enter your email and password to login!</div>

                    <form className='max-w-96 w-full' onSubmit={handleSubmmit}>
                        <div className='flex flex-col'>
                        <input
                            onChange={handleChange}
                            type='text'
                            name='email'
                            placeholder='E-mail'
                            className='px-4 py-2 rounded-xl text-black border-2 bg-white w-full'
                        />
                        <input
                            onChange={handleChange}
                            type='password'
                            name='password'
                            placeholder='Password'
                            className='px-4 mt-4 py-2 rounded-xl text-black border-2 bg-white w-full'
                        />
                        </div>
                        <div className='flex mt-4'>
                        <div className='opacity-80 text-sm mr-1'>Does not have an Account?</div>
                        <NavLink to={'/register'} className='opacity-80 text-sm underline'>Register Now</NavLink>
                        </div>
                        <button type='submit' className='w-full bg-src py-2 rounded-md mt-4'>Login</button>
                    </form>
                </div>
            </div>
        </div>
    </>
    )
}
