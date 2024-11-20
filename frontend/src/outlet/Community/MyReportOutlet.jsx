import React, { useCallback, useContext } from 'react'
import LoginRedirect from '../../component/LoginRedirect'
import ResolvedReportCard from '../../card/ResolvedReportCard'
import { AppContext } from '../../context/AppContext'
import DispatchedReportCard from '../../card/DispatchedReportCard'

export default function MyReportOutlet() {
  const{token ,user, apiClient} = useContext(AppContext)
  console.log(user?.data?.reports)
  return (
    <>
    <LoginRedirect />
        <div>
            <div className='flex  pt-4 text-prc font-light text-3xl'>
                <div className='flex-1'/>
                Accepted Crime Report
                </div>
              <div className='mt-4'>
                {user?.data?.reports?.map((item, index) => (
                  <ResolvedReportCard key={index} user={user} data={item} token={token} index={index}/>
                ))}
              </div>
        </div>
    </>
  )
}
