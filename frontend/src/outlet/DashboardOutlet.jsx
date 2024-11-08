import React, { useContext, useEffect, useState } from 'react'
import DashboardCard from '../card/DashboardCard'
import LoginRedirect from '../component/LoginRedirect'
import axios from 'axios'
import { crud } from '../resource/api'
import { AppContext } from '../context/AppContext'
import DispatchedReportCard from '../card/DispatchedReportCard'
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';

export default function DashboardOutlet() {
  const {apiClient, user} = useContext(AppContext)
  const [data, setData] =useState()
  const getData = async () => {
    try{
      const response = await apiClient.get(crud.concat('dashboard'))
      setData(response.data)
    } catch(e) {
      console.log(e)
    }
  }
  useEffect(() => {
      getData()
  },[])
  if(data){
    const xAxisData = data?.daily?.map(item => item.date.split('-')[2]); 
    const seriesData = data?.daily?.map(item => item.count);
    console.log("x",xAxisData)
    console.log("ser",seriesData)
    return (
      <>
          <LoginRedirect />
          <div>
              <div className='flex pr-6 pt-4 text-prc font-light text-3xl'>
                  <div className='flex-1'/>
                  Dashboard
              </div>
              <div className='pr-6 mt-4 bg-white rounded-md p-5 font-bold'>
                This Months Daily Report
                <LineChart
                  xAxis={[{ data: xAxisData }]}  // Set xAxis data dynamically
                  series={[{ data: seriesData }]} // Set series data dynamically
                  width='1300'
                  height={300}
                />
              </div>
              <div className='pr-6 mt-4 bg-white rounded-md p-5 font-bold'>
                Total Report Status
                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: data?.status?.pending, label: 'Pending' },
                        { id: 1, value: data?.status?.accepted, label: 'Accepted' },
                        { id: 2, value: data?.status?.declined, label: 'Declined' },
                        { id: 3, value: data?.status?.dispatched, label: 'Dispatched' },
                        { id: 4, value: data?.status?.resolved, label: 'Resolved' },
                      ],
                    },
                  ]}
                  width='400'
                  height={200}
                />
              </div>
          </div>
      </>
    )
  }
}
