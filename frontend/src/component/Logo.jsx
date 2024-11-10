import React from 'react'
import pnpLogo from '../resource/pnp-logo.png';

export default function Logo() {
  return (
    <>
    {/* <div className='flex text-sec-text'>
        <img src={pnpLogo} className='h-14 w-auto'/>
        <div className='ml-2 text-xl -mt-2 content-center'>
            <div className='font-bold'>PNP</div>
            <div className='text-sm'>Philppine National</div>
            <div className='text-sm'>Police Headquarter</div>
        </div>
    </div> */}
        <div className='flex text-sec-text'>
        <img src={pnpLogo} className='h-14 w-auto'/>
        <div className='ml-2 text-xl -mt-2 content-center'>
            <div className='font-bold'>PNP</div>
            <div className='text-sm'>Pambansang Pulisya </div>
            <div className='text-sm'>Ng Pilipinas</div>
        </div>
    </div>
    </>
  )
}
