import React, { useContext, useEffect, useState } from 'react'
import DashboardCard from '../card/DashboardCard'
import LoginRedirect from '../component/LoginRedirect'
import axios from 'axios'
import { crud } from '../resource/api'
import { AppContext } from '../context/AppContext'
import DispatchedReportCard from '../card/DispatchedReportCard'

export default function DashboardOutlet() {
  const {token, user} = useContext(AppContext)
  const [data, setData] =useState()
  const getData = async () => {
    try{
      const response = await axios.get(crud.concat('report'), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setData(response.data.data)
    } catch(e) {
      console.log(e)
    }
  }
  useEffect(() => {
    if(token) {
      getData()
    } 
  },[token])
  return (
    <>
        <LoginRedirect />
        <div>
            <div className='flex pr-6 pt-4 text-prc font-light text-3xl'>
                <div className='flex-1'/>
                Dashboard
            </div>
            <div className='pr-6 mt-4'>
              {data?.map((item, index) => (
                <DispatchedReportCard user={user} index={index} key={index} data={item} />
              ))}
            </div>
        </div>
    </>
  )
}
