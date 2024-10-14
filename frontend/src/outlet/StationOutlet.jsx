import React, { useContext, useEffect, useState } from 'react'
import LoginRedirect from '../component/LoginRedirect'
import { AppContext } from '../context/AppContext'
import { NavLink } from 'react-router-dom'
import Loading from '../component/Loading'

export default function StationOutlet() {
  const {apiClient ,user} = useContext(AppContext)
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const getUsers = async() =>{
    setLoading(true)
    try{
      const response = await apiClient.get(`v1/crud/station`)
      setData(response.data.data)
    } catch (error){
      console.error("Error: ", error.response)
    } finally {
      setLoading(false)
    }
  }
  useEffect(()=> {
    getUsers()
  }, [])
  return (
    <>
    <LoginRedirect/>
    {loading && <Loading />}
        <div className=''>
            <div className='flex pr-6 pt-4 text-prc font-light text-3xl mb-2'>
                <div className='flex-1'/>
                PNP Station Management
            </div>
            <div className=' flex gap-2 mb-4'>
              <div className='p-5  flex-1 text-lg text-text font-semibold bg-white rounded-md drop-shadow-sm '>
                My Station
                <div className='bg-prc h-0.5 w-72 mb-2'/>
                <div className='text-sm font-normal'>
                  Address: {user?.data?.station?.address}
                </div>
                <div className='text-sm font-normal'>
                  Latitude: {user?.data?.location?.lat}
                </div>
                <div className='text-sm font-normal'>
                  Longitude: {user?.data?.location?.long}
                </div>
                <div className='text-sm font-normal flex gap-2 content-center mt-2'>
                  <div className='content-center'>
                    Status:
                  </div>
                  <div className='bg-prc hover:scale-105 cursor-pointer select-none px-3 py-1 rounded-md text-white'>{user?.data?.station?.status?.desc}</div>
                </div>
              </div>
              <NavLink to={'new'} className='flex flex-col items-center justify-center rounded-md bg-prc text-white text-2xl p-5 select-none cursor-pointer font-bold hover:scale-101'>
                New Station
                <div className='flex items-center justify-center  mt-2'>
                  <span className="icon-[mdi--police-station] h-16 w-16 "></span>
                </div>
              </NavLink>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <caption className="p-5 text-lg font-semibold text-left text-white bg-prc ">
                        PNP System Users
                        <p className="mt-1 text-sm font-normal text-white text-opacity-90 ">Browse the list of verifed and to be verfied PNP users.</p>
                    </caption>
                    <thead className="text-xs text-white uppercase bg-prc bg-opacity-80 ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Address
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Latitude
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Longitude
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                      {data?.map((item, index)=> (
                        <tr className="bg-white border-b" key={index}>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                {item?.address}
                            </th>
                            <td className="px-6 py-4">
                                {item?.location?.lat}
                            </td>
                            <td className="px-6 py-4">
                                {item?.location?.long}
                            </td>
                            <td className="px-6 py-4">
                              {item?.status?.desc}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <NavLink to={`verify/${item?.id}`} className="font-medium text-white px-4 py-2 bg-src rounded-md mr-4 hover:bg-opacity-85">Edit</NavLink>
                            </td>
                        </tr>
                      ))}
                    </tbody>
                </table>
            </div>

        </div>
    </>
  )
}
