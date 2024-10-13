import React, { useContext, useEffect, useState } from 'react'
import LoginRedirect from '../component/LoginRedirect'
import ReportCard from '../card/ReportCard'
import axios from 'axios'
import { crud } from '../resource/api'
import { AppContext } from '../context/AppContext'
import AcceptedReportCard from '../card/AcceptedReportCard'

export default function AcceptedOutlet() {
  const{token ,user} = useContext(AppContext)
  const [data, setData] =useState({})
  const getReport = async () => {
    try{
      const response = await axios.get(crud.concat('status/2'), {
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
                Accepted Crime Report
                </div>
              <div className='mt-4'>
                {data?.report?.map((item, index) => (
                  <AcceptedReportCard key={index} user={user} data={item} token={token} index={index}/>
                ))}
              </div>
        </div>
    </>
  )
}

