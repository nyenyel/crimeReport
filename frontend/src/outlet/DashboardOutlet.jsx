import React, { useContext, useEffect, useState } from 'react'
import LoginRedirect from '../component/LoginRedirect'
import { crud } from '../resource/api'
import { AppContext } from '../context/AppContext'
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const locationhehe = [
  { id: 1, name: 'Location 1', position: [51.505, -0.09] },
  { id: 2, name: 'Location 2', position: [51.515, -0.1] },
  { id: 3, name: 'Location 3', position: [51.525, -0.12] },
];

export default function DashboardOutlet() {
  const {apiClient, user} = useContext(AppContext)
  const [data, setData] =useState()
  const [locations, setLocation] =useState()
  
  const getData = async () => {
    try{
      const response = await apiClient.get(crud.concat('dashboard'))
      setData(response.data)
      const loc = response.data.station.map((item, index) => ({
        id: index,
        name: item.address,
        position: [item.location.lat, item.location.long]
      }));
      setLocation(loc)
      console.log(response.data)
    } catch(e) {
      console.log(e)
    }
  }
  console.log(locations)
  useEffect(() => {
      getData()
  },[])
  if(data){
    const xAxisData = data?.daily?.map(item => item.date.split('-')[2]); 
    const seriesData = data?.daily?.map(item => item.count);
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
              <div className='pr-6 mt-4 bg-white rounded-md py-5 font-bold'>
                <div className='pl-5 mb-2'>Stations</div>
                <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '500px', width: '100%' }}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {locations.map((location) => (
                    <Marker key={location.id} position={location.position}>
                      <Popup>{location.name}</Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
          </div>
      </>
    )
  }
}
