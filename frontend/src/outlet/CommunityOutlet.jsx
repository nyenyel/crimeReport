import React, { useContext, useEffect, useState } from 'react'
import LoginRedirect from '../component/LoginRedirect'
import { AppContext } from '../context/AppContext'
import { NavLink } from 'react-router-dom'
import Loading from '../component/Loading'

export default function CommunityOutlet() {
  const {apiClient} = useContext(AppContext)
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const getUsers = async() =>{
    setLoading(true)
    try{
      const response = await apiClient.get(`v1/crud/get-community`)
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
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <caption className="p-5  text-lg font-semibold text-left text-white bg-prc ">
                        Community System Users
                        <p className="mt-1 text-sm font-normal text-white text-opacity-90 ">Browse the list of verifed and to be verfied PNP users.</p>
                    </caption>
                    <thead className="text-xs text-white uppercase bg-prc bg-opacity-80 ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Full Name/Username
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
                                {item?.role ? `${item?.last_name}, ${item?.first_name} ${item?.middle_name?.charAt(0)}.` : 'Community'}
                                {console.log(item)}
                            </th>
                            <td className="px-6 py-4">
                                {item?.email}
                            </td>
                            <td className="px-6 py-4">
                              {item?.phone_no}
                            </td>
                            <td className="px-6 py-4">
                              {item?.badge_no ?? 'Community'}
                            </td>
                            <td className="px-6 py-4">
                              {item?.rank?.desc ?? 'Community'}
                            </td>
                            <td className="px-6 py-4">
                              {item?.gender.desc}
                            </td>
                            <td className="px-6 py-4">
                              {item?.station?.address ?? 'Community'}
                            </td>
                            <td className="px-6 py-4">
                              {item?.isVerified === 1 ? 'Verified': 'Pending'}
                            </td>
                            <td className="px-6 py-4 text-right">
                                {item?.isVerified
                                  ?
                                  <NavLink to={`/admin/user/profile/${item?.id}`} className="font-medium text-white px-4 py-2 bg-prc rounded-md mr-4 hover:bg-opacity-85">Edit</NavLink>
                                  :
                                  <NavLink to={`/admin/user/verify/${item?.id}`} className="font-medium text-white px-4 py-2 bg-src rounded-md mr-4 hover:bg-opacity-85">Verify</NavLink>
                                }
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
