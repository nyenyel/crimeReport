import React, { useEffect, useState } from 'react'
import Loading from '../component/Loading'
import { crud } from '../resource/api'
import axios from 'axios'
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
// import './MapComponent.css'; // Your custom styles


export default function AcceptedReportCard({data, user, token, index}) {
    const dateString = data?.created_at
    const dateObject = new Date(dateString)
    const [loading, setLoading] = useState(false)
    const [distance, setDistance] = useState('')
    const reportLat = data?.location?.lat
    const reportLong = data?.location?.long
    const stationLat = user?.data?.station?.location?.lat
    const stationLong = user?.data?.station?.location?.long
    
    // Format date and time
    const formattedDate = dateObject.toLocaleDateString('en-US', {
        month: 'short', 
        day: 'numeric', 
        year: 'numeric'
    }).toUpperCase()
    const formattedTime = dateObject.toLocaleTimeString()
    
    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        setSelectedImage('');
    };
    const handleReportUpdate = async (action) => {
        setLoading(true)
        try{
            const response = await axios.put(
                crud.concat(`report/${data?.id}`), //endpoint
                {lib_status_id: `${action}`},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
        } catch (e) {
            console.error("Error: ",e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        // Check if all required coordinates are defined and valid numbers
        if (
            typeof stationLat === 'number' &&
            typeof stationLong === 'number' &&
            typeof reportLat === 'number' &&
            typeof reportLong === 'number'
        ) {
            const map = L.map(`map-${index}`, {
                center: [stationLat, stationLong],
                zoom: 13,
            });
    
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© OpenStreetMap contributors',
            }).addTo(map);
    
            // Fix for marker icons
            delete L.Icon.Default.prototype._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: markerIcon2x,
                iconUrl: markerIcon,
                shadowUrl: markerShadow,
            });
    
            // Create waypoints using valid latitude and longitude
            const start = L.latLng(stationLat, stationLong);
            const end = L.latLng(reportLat, reportLong);
    
            const routingControl = L.Routing.control({
                waypoints: [start, end],
                createMarker: () => null, // Prevent marker creation
                lineOptions: {
                    styles: [{ color: 'blue', weight: 3 }],
                },
                show: false
            }).addTo(map);
    
            // Listen for the routesfound event to get the route details
            routingControl.on('routesfound', (e) => {
                const route = e.routes[0]; // Get the first route found
                const distance = route.summary.totalDistance; // Distance in meters
                const duration = route.summary.totalTime; // Duration in seconds
    
                // Convert distance from meters to kilometers
                const distanceInKm = (distance / 1000).toFixed(2); // Rounded to 2 decimal places
                const durationInMinutes = (duration / 60).toFixed(2); // Rounded to 2 decimal places
    
                setDistance(distanceInKm);
            });
    
            return () => {
                map.remove();
            };
        } else {
            console.warn("One or more coordinates are undefined or not valid.");
        }
    }, [stationLat, stationLong, reportLat, reportLong]);
  return (
    <>
    {loading && (<Loading />)}
    <div className='bg-white pt-5 pb-5 rounded-md drop-shadow-sm font-semibold text-text mb-4'>
        <div className='px-5 pb-3'>
            <div className='font-bold text-xl mb-1'>{data?.reporter_name}</div>
            <div className='text-sm'>Category: {data?.category?.desc}</div>
            <div className='text-sm'>Status: {data?.status?.desc}</div>
            <div className='text-sm '>{formattedDate} - {formattedTime}</div>
            <div className='text-sm '>Distance: {distance} km</div>
        </div>
        <div className='bg-text h-56 text-white text-center bg-opacity-50 flex flex-wrap'>
            <div id={`map-${index}`} className='w-full'/>
        </div>
        <div className='flex mt-3 gap-2 text-white select-none' >
            <div onClick={()=>(handleReportUpdate(4))} className='flex-1 bg-prc text-center py-4 hover:scale-101 cursor-pointer'>
                SEND DISPATCH
            </div>
        </div>
    </div>
    {isOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 ' onClick={handleCloseModal}>
          <div className='relative' >
            <img 
              src={selectedImage} 
              alt='Zoomed evidence' 
              className='h-screen max-h-full max-w-auto p-20' 
            />
            <button 
              className='absolute top-3 right-3 text-white text-2xl' 
              onClick={handleCloseModal}
            >
              &times; {/* Close button */}
            </button>
          </div>
        </div>
    )}
</>
  )
}
