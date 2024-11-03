import React, { useContext, useEffect, useState } from 'react'
import LoginRedirect from '../component/LoginRedirect'
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import AcceptedReportCard from '../card/AcceptedReportCard'
import DispatchedReportCard from '../card/DispatchedReportCard'
import { AppContext } from '../context/AppContext'
import UserOutlet from './UserOutlet'
import Loading from '../component/Loading'
import L from 'leaflet';
import axios from 'axios'
import { crud } from '../resource/api'

export default function SelectPNPOutlet() {
    const {user, apiClient} = useContext(AppContext)
    const location = useLocation()
    const {id}= useParams()
    const report = location.state || []
    const [data, setData] = useState()
    const [loading,setLoading] = useState()
    const reportLocation = {
        lat: report?.location?.lat,
        long: report?.location?.long
    }
    const getUsers = async() =>{
        setLoading(true)
        try{
          const response = await apiClient.get(`v1/crud/get-pnp`)
          setData(response.data.data)
        } catch (error){
          console.error("Error: ", error)
        } finally {
          setLoading(false)
        }
    }
    useEffect(()=> {
        getUsers()
    }, [])
    return (
    <>
    <LoginRedirect />
    {loading && <Loading />}
    <div>
        <div className='flex  pt-4 text-prc font-light text-3xl'>
            <div className='flex-1'/>
            Dispatch PNP
            </div>
          <div className='mt-4'>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500">
                        <caption className="p-5  text-lg font-semibold text-left text-white bg-prc ">
                            PNP System Users
                            <p className="mt-1 text-sm font-normal text-white text-opacity-90 ">Browse the list of verifed and to be verfied PNP users.</p>
                        </caption>
                        <thead className="text-xs text-white uppercase bg-prc bg-opacity-80 ">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Full Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    E-mail
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Phone No.
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Badge No.
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Rank
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Gender
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Station
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Distance
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {data?.map((item, index)=> (
                           rowData(item, index, reportLocation, id, apiClient)
                        ))}
                        </tbody>
                    </table>
                </div>
          </div>
    </div>
    </>
  )
}

function rowData(item, index, reportLocation, id, apiClient){
    const userLocation = item?.location
    const distance = userLocation && reportLocation
        ?  (L.latLng(reportLocation.lat, reportLocation.long).distanceTo(
            L.latLng(userLocation.lat, userLocation.long)
          ) / 1000).toFixed(2) // Convert from meters to kilometers
        : 'N/A';
    const data = {
        lib_status_id: 4,
        dispatch_user: item?.id
    }
    
    const handleReportUpdate = async (action) => {
        try{
            const response = await apiClient.put(
                crud.concat(`report/${id}`), //endpoint
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            )
        } catch (e) {
            console.error("Error: ",e)
        } finally {
            window.location.href = '/admin/accepted'
        }
    }
    
    return(
        <tr className="bg-white border-b" key={index}>
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
            {item?.last_name}, {item?.first_name} {item?.middle_name.charAt(0)}.
        </th>
        <td className="px-6 py-4">
            {item?.email}
        </td>
        <td className="px-6 py-4">
        {item?.phone_no}
        </td>
        <td className="px-6 py-4">
        {item?.badge_no}
        </td>
        <td className="px-6 py-4">
        {item?.rank.desc}
        </td>
        <td className="px-6 py-4">
        {item?.gender.desc}
        </td>
        <td className="px-6 py-4">
        {item?.station.address}
        </td>
        <td className="px-6 py-4">
          {distance} km
        </td>
        <td className="px-6 py-4 text-right">
            <div onClick={handleReportUpdate} className="font-medium text-white cursor-pointer px-4 py-2 bg-prc rounded-md mr-4 hover:bg-opacity-85">Dispatch</div>
        </td>
    </tr>
    )
}