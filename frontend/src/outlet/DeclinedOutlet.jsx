import React, { useContext, useEffect, useState } from 'react'
import LoginRedirect from '../component/LoginRedirect'
import ReportCard from '../card/ReportCard'
import axios from 'axios'
import { crud } from '../resource/api'
import { AppContext } from '../context/AppContext'
import DeclinedReportCard from '../card/DeclinedReportCard'

export default function DeclinedOutlet() {
  const{token} = useContext(AppContext)
  const [data, setData] =useState({})
  const getReport = async () => {
    try{
      const response = await axios.get(crud.concat('status/3'), {
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
            <div className='flex pt-4 text-prc font-light text-3xl'>
                <div className='flex-1'/>
                Declined Crime Report
                </div>
              <div className='mt-4'>
                {data?.report?.map((item, index) => (
                  <DeclinedReportCard key={index} data={item}/>
                ))}
              </div>
        </div>
    </>
  )
}
