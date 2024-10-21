import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import LoginRedirect from '../component/LoginRedirect';
import Loading from '../component/Loading';
import { useNavigate, useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function NewStationOutlet() {
    const navigate = useNavigate();
    const {id} = useParams()
    const { apiClient } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [stationForm, setStationForm] = useState({
        info: {
            address: '',
            lib_station_status_id: '1',
        },
        location: {
            lat: '',
            long: '',
        }
    });
    const [lat, setLat] = useState(15.487,)
    const [long, setLong] = useState(120.599)
    const storeStation = async () => {
        setLoading(true);
        try {
            const response = await apiClient.post('v1/crud/station', stationForm);
            navigate('/admin/station');
        } catch (error) {
            console.error("error: ", error);
        } finally {
            setLoading(false);
        }
    };

    const updateStation = async () => {
        setLoading(true);
        try {
            const response = await apiClient.put(`v1/crud/station/${id}`, stationForm);
            // navigate('/admin/station');
        } catch (error) {
            console.error("error: ", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStationForm({
            ...stationForm,
            info: {
                ...stationForm.info,
                [name]: value
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(id){
            updateStation()
        } else{
            storeStation();
        }
    };

    useEffect(() => {
        const fetchStationData = async () => {
            try {
                setLoading(true)
                const response = await apiClient.get(`v1/crud/station/${id}`);
                setStationForm({
                    info: {
                        address: response?.data?.data?.address,
                        lib_station_status_id: response?.data?.data?.status?.id,
                    },
                    location: {
                        lat: response?.data?.data?.location?.lat,
                        long:  response?.data?.data?.location?.long,
                    }
                }) // Assuming the data is in response.data
                setLat(response?.data?.data?.location?.lat,)
                setLong(response?.data?.data?.location?.long)
            } catch (err) {
                console.error("Failed to fetch station data", err);
                setError(err);
            }  finally {
                setLoading(false) 
            }
        };

        if(id){
            fetchStationData()
        }
    }, [id])
    // Custom component to handle click on map
    const LocationMarker = () => {
        const map = useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                setStationForm(prevForm => ({
                    ...prevForm,
                    location: {
                        lat: lat.toString(),
                        long: lng.toString()
                    }
                }));
            }
        });
        return stationForm.location.lat ? (
            <Marker position={[stationForm.location.lat, stationForm.location.long]} />
        ) : null;
    };

    return (
        <>
            <LoginRedirect />
            {loading && <Loading />}
            <div className=''>
                <div className='flex  pt-4 text-prc font-light text-3xl mb-2'>
                    <div className='flex-1' />
                    New PNP Station
                </div>
                <div className='bg-white p-5 rounded-md text-text drop-shadow-sm'>
                    <form onSubmit={handleSubmit} className='flex flex-col'>
                        <div className='flex-1 flex flex-col'>
                            <label className='text-sm'>Station Address/Name</label>
                            <input
                                type='text'
                                name='address'
                                value={stationForm?.info?.address || ''}
                                onChange={handleChange}
                                className='font-medium border-b-2 px-4 py-3 bg-gray-400 bg-opacity-5'
                                placeholder='Ex. Tarlac State University, Zamora St.'
                            />
                        </div>

                        <label className='text-sm mt-2'>Select Location</label>

                        <div className='bg-black rounded-md h-96'>
                            <MapContainer
                                center={[lat, long]} // Initial map center (e.g., Tarlac)
                                zoom={13}
                                scrollWheelZoom={true}
                                style={{ height: '100%', width: '100%' }}
                            >
                                <TileLayer
                                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                />
                                <LocationMarker />
                            </MapContainer>
                        </div>

                        <button
                            type='submit'
                            className='bg-prc text-white py-2 font-semibold rounded-md hover:scale-101 mt-2'
                        >
                            {id? 'UPDATE' : 'ADD'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
