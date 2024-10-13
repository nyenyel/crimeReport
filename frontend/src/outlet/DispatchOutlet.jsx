import React, { useContext, useEffect, useState } from 'react'
import LoginRedirect from '../component/LoginRedirect'
import ReportCard from '../card/ReportCard'
import axios from 'axios'
import { crud } from '../resource/api'
import { AppContext } from '../context/AppContext'
import DispatchedReportCard from '../card/DispatchedReportCard'

export default function DispatchOutlet() {
  const{token ,user} = useContext(AppContext)
  const [data, setData] =useState({})
  const getReport = async () => {
    try{
      const response = await axios.get(crud.concat('status/4'), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setData(response.data.data)
      // console.log(response.data.data)
    } catch(e) {
      console.log(e)
    }
  }
  useEffect (() => {
    if(token) (
      getReport()
    )
  }, [token])
  return (
    <>
    <LoginRedirect />
        <div>
            <div className='flex  pt-4 text-prc font-light text-3xl'>
                <div className='flex-1'/>
                Dispatched
                </div>
              <div>
                {data?.report?.map((item, index) => (
                  <DispatchedReportCard key={index} index={index} data={item} user={user}/>
                ))}
              </div>
        </div>
    </>
  )
}
