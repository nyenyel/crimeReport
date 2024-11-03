import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import Loading from './Loading'

export default function SideBar() {
    const {apiClient, role} =useContext(AppContext)
    const [loading, setLoading ] = useState(false)
    const nav = useNavigate()
    const logout = (e) => {
        const logoutAcc =  async () => {
            setLoading(true)
            try {
                const response = await apiClient.post('v1/auth/logout', {})
                localStorage.removeItem('token')
                localStorage.removeItem('role')
            } catch (error) {
                console.error("Error: ", error)
            } finally {
                setLoading(false)
                nav(0)
            } 
        } 
        logoutAcc()
    }
    if(role === 'Admin'){
        return (
            <>
            {loading && <Loading />}
                <div className='bg-prc text-sec-text rounded-r-2xl h-screen min-w-72'>
                    <div className='mx-6 py-6'>
                        <Logo/>
                    </div>
                    <div className='bg-white w-full mb-4 h-0.5 bg-opacity-20' />
                    <div className=' mb-6'>
                        <div className='mx-6 font-bold text-xs mb-3'>OVERVIEW</div>
                        <NavLink to={'dashboard'} 
                            className={({ isActive }) => {
                                return `rounded-xl flex content-center px-6 ${isActive && 'border-b-2 bg-src pt-2 mx-4'}`
                            }}
                        >
                            <div className='content-center font-extrabold'>
                            <span className="icon-[iconamoon--arrow-right-2-duotone] h-8 w-8"></span>

                            </div>
                            <div className='mr-2 content-center'>
                                <span className="icon-[mage--dashboard-fill] h-7 w-7"></span>
                            </div>
                            <div className=' mt-0.5 font-semibold text-lg'>Dashboard</div>
                        </NavLink>
                    </div>
                    <div className='bg-white w-full mb-4 h-0.5 bg-opacity-20' />
                    <div className=' mb-6 flex flex-col gap-2'>
                        <div className='mx-6 font-bold text-xs mb-2 '>CRIME REPORT</div>
                        <NavLink to={'report'} className={({ isActive }) => {
                                return `rounded-xl flex content-center px-6 ${isActive && 'border-b-2 bg-src pt-2 mx-4'}`
                            }}
                        >
                            <div className='content-center font-extrabold'>
                                <span className="icon-[iconamoon--arrow-right-2-duotone] h-8 w-8"></span>
                            </div>
                            <div className='mr-2 content-center'>
                                <span className="icon-[icon-park-solid--report] h-7 w-7"></span>
                            </div>
                            <div className=' mt-0.5 font-semibold text-lg'>Report</div>
                        </NavLink>
                        <NavLink to={'dispatch'} className={({ isActive }) => {
                                return `rounded-xl flex content-center px-6 ${isActive && 'border-b-2 bg-src pt-2 mx-4'}`
                            }}
                        >
                            <div className='content-center font-extrabold'>
                                <span className="icon-[iconamoon--arrow-right-2-duotone] h-8 w-8"></span>
                            </div>
                            <div className='mr-2 content-center'>
                                <span className="icon-[ph--police-car-fill] h-7 w-7"></span>
                            </div>
                            <div className=' mt-0.5 font-semibold text-lg'>Dispatched</div>
                        </NavLink>
                        <NavLink to={'declined'} className={({ isActive }) => {
                                return `rounded-xl flex content-center px-6 ${isActive && 'border-b-2 bg-src pt-2 mx-4'}`
                            }}
                        >
                            <div className='content-center font-extrabold'>
                                <span className="icon-[iconamoon--arrow-right-2-duotone] h-8 w-8"></span>
                            </div>
                            <div className='mr-2 content-center'>
                                <span className="icon-[solar--call-cancel-bold] h-7 w-7"></span>
                            </div>
                            <div className=' mt-0.5 font-semibold text-lg'>Declined</div>
                        </NavLink>
                        <NavLink to={'accepted'} className={({ isActive }) => {
                                return `rounded-xl flex content-center px-6 ${isActive && 'border-b-2 bg-src pt-2 mx-4'}`
                            }}
                        >
                            <div className='content-center font-extrabold'>
                                <span className="icon-[iconamoon--arrow-right-2-duotone] h-8 w-8"></span>
                            </div>
                            <div className='mr-2 content-center'>
                                <span className="icon-[mage--message-check-fill] h-7 w-7"></span>
                            </div>
                            <div className=' mt-0.5 font-semibold text-lg'>Accepted</div>
                        </NavLink>
                    </div>
                    <div className='bg-white w-full mb-4 h-0.5 bg-opacity-20' />
                    <div className=' mb-6 flex flex-col gap-2'>
                        <div className='mx-6 font-bold text-xs mb-2'>MANAGEMENT</div>
                        <NavLink to={'user'} className={({ isActive }) => {
                                return `rounded-xl flex content-center px-6 ${isActive && 'border-b-2 bg-src pt-2 mx-4'}`
                            }}
                        >
                            <div className='content-center font-extrabold'>
                                <span className="icon-[iconamoon--arrow-right-2-duotone] h-8 w-8"></span>
                            </div>
                            <div className='mr-2 content-center'>
                                <span className="icon-[heroicons--user-group-solid] h-7 w-7"></span>
                            </div>
                            <div className=' mt-0.5 font-semibold text-lg'>User</div>
                        </NavLink>
                        <NavLink to={'station'} className={({ isActive }) => {
                                return `rounded-xl flex content-center px-6 ${isActive && 'border-b-2 bg-src pt-2 mx-4'}`
                            }}
                        >
                            <div className='content-center font-extrabold'>
                                <span className="icon-[iconamoon--arrow-right-2-duotone] h-8 w-8"></span>
                            </div>
                            <div className='mr-2 content-center'>
                                <span className="icon-[mdi--police-station] h-7 w-7"></span>
                            </div>
                            <div className=' mt-0.5 font-semibold text-lg'>Station</div>
                        </NavLink>
                    </div>
                    <div className='bg-white w-full mb-4 h-0.5 bg-opacity-20' />
                    <div className=' mb-6 flex flex-col gap-2'>
                        <div className='mx-6 font-bold text-xs mb-2'>ACCOUNT</div>
                        <NavLink to={'profile'} className={({ isActive }) => {
                                return `rounded-xl flex content-center px-6 ${isActive && 'border-b-2 bg-src pt-2 mx-4'}`
                            }}
                        >
                            <div className='content-center font-extrabold'>
                                <span className="icon-[iconamoon--arrow-right-2-duotone] h-8 w-8"></span>
                            </div>
                            <div className='mr-2 content-center'>
                                <span className="icon-[mdi--user] h-7 w-7"></span>
                            </div>
                            <div className=' mt-0.5 font-semibold text-lg'>Profile</div>
                        </NavLink>
                        <div onClick={logout} className='flex cursor-pointer content-center px-6 '>
                            <div className='content-center font-extrabold'>
                                <span className="icon-[iconamoon--arrow-right-2-duotone] h-8 w-8"></span>
                            </div>
                            <div className='mr-2 content-center'>
                                <span className="icon-[majesticons--door-exit] h-7 w-7"></span>
                            </div>
                            <div className=' mt-0.5 font-semibold text-lg'>Logout</div>
                        </div>
                    </div>
                    {/* <div className='bg-white w-full mb-4 h-0.5 bg-opacity-20' /> */}
                </div>
            </>
        )
    } else {
        return (
            <>
            {loading && <Loading />}
                <div className='bg-prc text-sec-text rounded-r-2xl h-screen min-w-72'>
                    <div className='mx-6 py-6'>
                        <Logo/>
                    </div>
                    <div className='bg-white w-full mb-4 h-0.5 bg-opacity-20' />
                    <div className=' mb-6'>
                        <div className='mx-6 font-bold text-xs mb-3'>OVERVIEW</div>
                        <NavLink to={'dashboard'} 
                            className={({ isActive }) => {
                                return `rounded-xl flex content-center px-6 ${isActive && 'border-b-2 bg-src pt-2 mx-4'}`
                            }}
                        >
                            <div className='content-center font-extrabold'>
                            <span className="icon-[iconamoon--arrow-right-2-duotone] h-8 w-8"></span>

                            </div>
                            <div className='mr-2 content-center'>
                                <span className="icon-[mage--dashboard-fill] h-7 w-7"></span>
                            </div>
                            <div className=' mt-0.5 font-semibold text-lg'>Dashboard</div>
                        </NavLink>
                    </div>
                    <div className='bg-white w-full mb-4 h-0.5 bg-opacity-20' />
                    <div className=' mb-6 flex flex-col gap-2'>
                        <div className='mx-6 font-bold text-xs mb-2 '>CRIME REPORT</div>
                        <NavLink to={'dispatch'} className={({ isActive }) => {
                                return `rounded-xl flex content-center px-6 ${isActive && 'border-b-2 bg-src pt-2 mx-4'}`
                            }}
                        >
                            <div className='content-center font-extrabold'>
                                <span className="icon-[iconamoon--arrow-right-2-duotone] h-8 w-8"></span>
                            </div>
                            <div className='mr-2 content-center'>
                                <span className="icon-[ph--police-car-fill] h-7 w-7"></span>
                            </div>
                            <div className=' mt-0.5 font-semibold text-lg'>Dispatched</div>
                        </NavLink>
                        <NavLink to={'resolved'} className={({ isActive }) => {
                                return `rounded-xl flex content-center px-6 ${isActive && 'border-b-2 bg-src pt-2 mx-4'}`
                            }}
                        >
                            <div className='content-center font-extrabold'>
                                <span className="icon-[iconamoon--arrow-right-2-duotone] h-8 w-8"></span>
                            </div>
                            <div className='mr-2 content-center'>
                                <span className="icon-[mage--message-check-fill] h-7 w-7"></span>
                            </div>
                            <div className=' mt-0.5 font-semibold text-lg'>Resolved</div>
                        </NavLink>
                    </div>
                    
                    <div className='bg-white w-full mb-4 h-0.5 bg-opacity-20' />
                    <div className=' mb-6 flex flex-col gap-2'>
                        <div className='mx-6 font-bold text-xs mb-2'>ACCOUNT</div>
                        <NavLink to={'profile'} className={({ isActive }) => {
                                return `rounded-xl flex content-center px-6 ${isActive && 'border-b-2 bg-src pt-2 mx-4'}`
                            }}
                        >
                            <div className='content-center font-extrabold'>
                                <span className="icon-[iconamoon--arrow-right-2-duotone] h-8 w-8"></span>
                            </div>
                            <div className='mr-2 content-center'>
                                <span className="icon-[mdi--user] h-7 w-7"></span>
                            </div>
                            <div className=' mt-0.5 font-semibold text-lg'>Profile</div>
                        </NavLink>
                        <div onClick={logout} className='flex cursor-pointer content-center px-6 '>
                            <div className='content-center font-extrabold'>
                                <span className="icon-[iconamoon--arrow-right-2-duotone] h-8 w-8"></span>
                            </div>
                            <div className='mr-2 content-center'>
                                <span className="icon-[majesticons--door-exit] h-7 w-7"></span>
                            </div>
                            <div className=' mt-0.5 font-semibold text-lg'>Logout</div>
                        </div>
                    </div>
                    {/* <div className='bg-white w-full mb-4 h-0.5 bg-opacity-20' /> */}
                </div>
            </>
        )
    }
}
