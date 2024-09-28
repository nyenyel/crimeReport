import React from 'react'
import Logo from './Logo'
import { NavLink } from 'react-router-dom'

export default function SideBar() {
    return (
        <>
            <div className='bg-prc text-sec-text rounded-r-2xl h-screen min-w-72'>
                <div className='mx-6 py-6'>
                    <Logo/>
                </div>
                <div className='bg-white w-full mb-4 h-0.5 bg-opacity-20' />
                <div className=' mb-6'>
                    <div className='mx-6 font-bold text-xs mb-5'>OVERVIEW</div>
                    <NavLink to={'dashboard'} className=' flex content-center px-6 '>
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
                <div className=' mb-6'>
                    <div className='mx-6 font-bold text-xs mb-5'>CRIME REPORT</div>
                    <NavLink to={'report'} className=' flex content-center px-6 mb-5 '>
                        <div className='content-center font-extrabold'>
                            <span className="icon-[iconamoon--arrow-right-2-duotone] h-8 w-8"></span>
                        </div>
                        <div className='mr-2 content-center'>
                            <span className="icon-[icon-park-solid--report] h-7 w-7"></span>
                        </div>
                        <div className=' mt-0.5 font-semibold text-lg'>Report</div>
                    </NavLink>
                    <NavLink to={'dispatch'} className=' flex content-center px-6 '>
                        <div className='content-center font-extrabold'>
                            <span className="icon-[iconamoon--arrow-right-2-duotone] h-8 w-8"></span>
                        </div>
                        <div className='mr-2 content-center'>
                            <span className="icon-[ph--police-car-fill] h-7 w-7"></span>
                        </div>
                        <div className=' mt-0.5 font-semibold text-lg'>Dispatch</div>
                    </NavLink>
                    <NavLink to={'declined'} className=' my-5 flex content-center px-6 '>
                        <div className='content-center font-extrabold'>
                            <span className="icon-[iconamoon--arrow-right-2-duotone] h-8 w-8"></span>
                        </div>
                        <div className='mr-2 content-center'>
                            <span className="icon-[solar--call-cancel-bold] h-7 w-7"></span>
                        </div>
                        <div className=' mt-0.5 font-semibold text-lg'>Declined</div>
                    </NavLink>
                    <NavLink to={'accepted'} className=' flex content-center px-6 '>
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
                <div className=' mb-6'>
                    <div className='mx-6 font-bold text-xs mb-5'>MANAGEMENT</div>
                    <NavLink to={'user'} className=' flex content-center px-6 '>
                        <div className='content-center font-extrabold'>
                            <span className="icon-[iconamoon--arrow-right-2-duotone] h-8 w-8"></span>
                        </div>
                        <div className='mr-2 content-center'>
                            <span className="icon-[heroicons--user-group-solid] h-7 w-7"></span>
                        </div>
                        <div className=' mt-0.5 font-semibold text-lg'>User</div>
                    </NavLink>
                    <NavLink to={'station'} className=' my-5 flex content-center px-6 '>
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
                <div className=' mb-6'>
                    <div className='mx-6 font-bold text-xs mb-5'>ACCOUNT</div>
                    <NavLink to={'profile'} className=' flex content-center px-6 '>
                        <div className='content-center font-extrabold'>
                            <span className="icon-[iconamoon--arrow-right-2-duotone] h-8 w-8"></span>
                        </div>
                        <div className='mr-2 content-center'>
                            <span className="icon-[mdi--user] h-7 w-7"></span>
                        </div>
                        <div className=' mt-0.5 font-semibold text-lg'>Profile</div>
                    </NavLink>
                    <NavLink to={'logout'} className=' my-5 flex content-center px-6 '>
                        <div className='content-center font-extrabold'>
                            <span className="icon-[iconamoon--arrow-right-2-duotone] h-8 w-8"></span>
                        </div>
                        <div className='mr-2 content-center'>
                            <span className="icon-[majesticons--door-exit] h-7 w-7"></span>
                        </div>
                        <div className=' mt-0.5 font-semibold text-lg'>Logout</div>
                    </NavLink>
                </div>
                {/* <div className='bg-white w-full mb-4 h-0.5 bg-opacity-20' /> */}
            </div>
        </>
    )
}
