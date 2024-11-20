import React, { useContext, useEffect, useState } from 'react'
import Logo from './Logo'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import Loading from './Loading'

export default function Topbar() {
    const {apiClient, role, setToken} =useContext(AppContext)
    const [loading, setLoading ] = useState(false)
    const [toggle, setToggle ] = useState(false)
    const handleToggler = () => setToggle(!toggle)
    const [modal, setModal] = useState(false)
    const handleModal = () => setModal(!modal)
    const nav = useNavigate()
    const location = useLocation()
    const logout = async (e) => {
        setLoading(true)
        handleModal()
        try {
            const response = await apiClient.post('v1/auth/logout', {})
            if(response.status === 200){
                localStorage.removeItem('token')
                localStorage.removeItem('role')
                setToken(null)
                nav('/')
                console.log('token')
            }
        } catch (error) {
            console.error("Error: ", error)
        } finally {
            setLoading(false)

        } 
    }


    if(role === 'Admin'){
        return (
            <>
            {loading && <Loading />}
            {modal && 
                <div className="absolute z-50 bg-black w-full h-full bg-opacity-60 flex items-center justify-center">
                    <div className="bg-prc drop-shadow text-md font-bold p-5 text-white rounded-md">
                        Logging Out
                        <div className="mt-2 text-sm font-normal">
                            Are you sure you want to logut now?
                        </div>
                        <div className='flex'>
                            <div className='flex-1'></div>
                            <div className="flex-none mt-2 text-sm font-normal hover:underline cursor-pointer p-2" onClick={handleModal}>Cancel</div>
                            <div className="flex-none mt-2 text-sm font-normal rounded-md hover:bg-gray-100 hover:text-prc cursor-pointer p-2" onClick={logout}>Logout</div>
                        </div>
                    </div>
                </div>
            }
                <div>
                  <div className='px-6 py-6 bg-prc cursor-pointer' onClick={handleToggler}>
                    <Logo/>
                  </div>
                </div>
                <div className={`${toggle ? '': 'hidden absolute '} bg-prc text-sec-text  min-w-72 sticky top-0 h-screen overflow-y-auto`}>
                    <div className='bg-white w-full mb-4 h-0.5 bg-opacity-20' />
                    <div className=' mb-6'>
                        <div className='mx-6 font-bold text-xs mb-3'>OVERVIEW</div>
                        <NavLink to={'dashboard'} onClick={handleToggler}
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
                        <div className='mx-6 font-bold text-xs mb-2 '>CRIME MANAGEMENT</div>
                        <NavLink to={'report'} onClick={handleToggler} className={({ isActive }) => {
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
                        <NavLink to={'dispatch'} onClick={handleToggler} className={({ isActive }) => {
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
                        <NavLink to={'declined'} onClick={handleToggler} className={({ isActive }) => {
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
                        <NavLink to={'accepted'} onClick={handleToggler} className={({ isActive }) => {
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
                        <div className='mx-6 font-bold text-xs mb-2'>SYSTEM MANAGEMENT</div>
                        <NavLink to={'user'} onClick={handleToggler} className={({ isActive }) => {
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
                        <NavLink to={'station'} onClick={handleToggler} className={({ isActive }) => {
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
                        <NavLink to={'profile'} onClick={handleToggler} className={({ isActive }) => {
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
                        <div onClick={handleModal} className='flex cursor-pointer content-center px-6 '>
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
    } else if(role === 'community'){
        return (
            <>
            {loading && <Loading />}
            {modal && 
                <div className="absolute z-50 bg-black w-full h-full bg-opacity-60 flex items-center justify-center">
                    <div className="bg-prc drop-shadow text-md font-bold p-5 text-white rounded-md">
                        Logging Out
                        <div className="mt-2 text-sm font-normal">
                            Are you sure you want to logut now?
                        </div>
                        <div className='flex'>
                            <div className='flex-1'></div>
                            <div className="flex-none mt-2 text-sm font-normal hover:underline cursor-pointer p-2" onClick={handleModal}>Cancel</div>
                            <div className="flex-none mt-2 text-sm font-normal rounded-md hover:bg-gray-100 hover:text-prc cursor-pointer p-2" onClick={logout}>Logout</div>
                        </div>
                    </div>
                </div>
            }
                <div>
                  <div className='px-6 py-6 bg-prc cursor-pointer' onClick={handleToggler}>
                    <Logo/>
                  </div>
                </div>
                <div className={`${toggle ? '': 'hidden absolute '} bg-prc text-sec-text  min-w-72 sticky top-0 h-screen overflow-y-auto`}>
                    <div className='bg-white w-full mb-4 h-0.5 bg-opacity-20' />
                    <div className=' mb-6'>
                        <div className='mx-6 font-bold text-xs mb-3'>OVERVIEW</div>
                        <NavLink to={'my-report'} onClick={handleToggler}
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
                            <div className=' mt-0.5 font-semibold text-lg'>My Reports</div>
                        </NavLink>
                    </div>
                    <div className='bg-white w-full mb-4 h-0.5 bg-opacity-20' />
                    <div className=' mb-6 flex flex-col gap-2'>
                        <div className='mx-6 font-bold text-xs mb-2 '>CRIME MANAGEMENT</div>
                        <NavLink to={'report'} onClick={handleToggler} className={({ isActive }) => {
                                return `rounded-xl flex content-center px-6 ${isActive && 'border-b-2 bg-src pt-2 mx-4'}`
                            }}
                        >
                            <div className='content-center font-extrabold'>
                                <span className="icon-[iconamoon--arrow-right-2-duotone] h-8 w-8"></span>
                            </div>
                            <div className='mr-2 content-center'>
                                <span className="icon-[ph--police-car-fill] h-7 w-7"></span>
                            </div>
                            <div className=' mt-0.5 font-semibold text-lg'>Report</div>
                        </NavLink>
                        <NavLink to={'quick-response'} onClick={handleToggler} className={({ isActive }) => {
                                return `rounded-xl flex content-center px-6 ${isActive && 'border-b-2 bg-src pt-2 mx-4'}`
                            }}
                        >
                            <div className='content-center font-extrabold'>
                                <span className="icon-[iconamoon--arrow-right-2-duotone] h-8 w-8"></span>
                            </div>
                            <div className='mr-2 content-center'>
                                <span className="icon-[mage--message-check-fill] h-7 w-7"></span>
                            </div>
                            <div className=' mt-0.5 font-semibold text-lg'>Quick Response</div>
                        </NavLink>
                    </div>
                    
                    <div className='bg-white w-full mb-4 h-0.5 bg-opacity-20' />
                    <div className=' mb-6 flex flex-col gap-2'>
                        <div className='mx-6 font-bold text-xs mb-2'>ACCOUNT</div>
                        <NavLink to={'profile'} onClick={handleToggler} className={({ isActive }) => {
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
                        <div onClick={handleModal} className='flex cursor-pointer content-center px-6 '>
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
            {modal && 
                <div className="absolute z-50 bg-black w-full h-full bg-opacity-60 flex items-center justify-center">
                    <div className="bg-prc drop-shadow text-md font-bold p-5 text-white rounded-md">
                        Logging Out
                        <div className="mt-2 text-sm font-normal">
                            Are you sure you want to logut now?
                        </div>
                        <div className='flex'>
                            <div className='flex-1'></div>
                            <div className="flex-none mt-2 text-sm font-normal hover:underline cursor-pointer p-2" onClick={handleModal}>Cancel</div>
                            <div className="flex-none mt-2 text-sm font-normal rounded-md hover:bg-gray-100 hover:text-prc cursor-pointer p-2" onClick={logout}>Logout</div>
                        </div>
                    </div>
                </div>
            }
                <div>
                  <div className='px-6 py-6 bg-prc cursor-pointer' onClick={handleToggler}>
                    <Logo/>
                  </div>
                </div>
                <div className={`${toggle ? '': 'hidden absolute '} bg-prc text-sec-text  min-w-72 sticky top-0 h-screen overflow-y-auto`}>
                    <div className='bg-white w-full mb-4 h-0.5 bg-opacity-20' />
                    <div className=' mb-6'>
                        <div className='mx-6 font-bold text-xs mb-3'>OVERVIEW</div>
                        <NavLink to={'dashboard'} onClick={handleToggler}
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
                        <div className='mx-6 font-bold text-xs mb-2 '>CRIME MANAGEMENT</div>
                        <NavLink to={'dispatch'} onClick={handleToggler} className={({ isActive }) => {
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
                        <NavLink to={'resolved'} onClick={handleToggler} className={({ isActive }) => {
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
                        <NavLink to={'profile'} onClick={handleToggler} className={({ isActive }) => {
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
                        <div onClick={handleModal} className='flex cursor-pointer content-center px-6 '>
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
