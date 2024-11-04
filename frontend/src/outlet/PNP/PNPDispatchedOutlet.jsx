import React, { useContext, useEffect, useState } from 'react'
import LoginRedirect from '../../component/LoginRedirect'
import ReportCard from '../../card/ReportCard'
import axios from 'axios'
import { crud } from '../../resource/api'
import { AppContext } from '../../context/AppContext'
import AcceptedReportCard from '../../card/AcceptedReportCard'
import ResolveReportCard from '../../card/UnresolveReportCard'
import UnresolveReportCard from '../../card/UnresolveReportCard'

export default function PNPDispatchedOutlet() {
  const{token ,user, apiClient} = useContext(AppContext)
  const [data, setData] =useState([])
  const getReport = async () => {
    try{
      const response = await apiClient.get(crud.concat(`pnp-unresolved/${user?.data?.id}`))
      setData(response.data.data)
      // console.log(response.data.data)
    } catch(e) {
      console.log(e)
    }
  }
  console.log(user?.data?.id)
  useEffect (() => {
    if(token && user?.data?.id) (
      getReport()
    )
  }, [token, user?.data?.id])
  
  return (
    <>
    <LoginRedirect />
        <div>
            <div className='flex  pt-4 text-prc font-light text-3xl'>
                <div className='flex-1'/>
                Accepted Crime Report
                </div>
              <div className='mt-4'>
                {data?.map((item, index) => (
                  <UnresolveReportCard key={index} user={user} data={item} token={token} index={index}/>
                ))}
              </div>
        </div>
    </>
  )
}

