import React, { useEffect, useState } from 'react'
import LoginRedirect from '../component/LoginRedirect'
import AlreadyLoginRedirect from '../component/AlreadyLoginRedirect'
import Logo from '../component/Logo'
import Loading from '../component/Loading'
import bgImage from '../resource/bg.jpg'
import { baseURL, crud } from '../resource/api'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import { getCurrentLocation } from './LoginModule'
import { useCrimeContext } from '../context/CrimeContext'

export default function PublicModule() {
    const {crimeCategories, municipality} = useCrimeContext()
    const [loading, setLoading] = useState(false)
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [location,setLocation] = useState([]);
    const [selectedMunicipality, setSelectedMunicipality] = useState("");
    const [barangays, setBarangays] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [types, setTypes] = useState([]);
    const [modal, setModal] = useState(false)
    const [reportTracker, setReportTracker] = useState({})
    const handleModal = () => setModal(!modal)  
    
    const handleCategoryChange = (e) => {
        const {name, value} = e.target
        const category = value;
        setSelectedCategory(category);
    
        // Find the types associated with the selected category
        const selectedCategoryData = crimeCategories.find(cat => cat.category === category);
        setTypes(selectedCategoryData ? selectedCategoryData.types : []);
        setReportForm((prev) => ({
            ...prev,
            info: {
                ...prev.info,
                [name]: value
            }, 
            location: {
                ...prev.location,
                long: location.long,
                lat: location.lat,
            }
        }));
    };

    const handleMunicipalityChange = (e) => {
        const { name, value } = e.target;
        const selectedMunicipalityData = municipality.find(
            (mun) => mun.municipality === value
        );

        setSelectedMunicipality(value);
        setBarangays(selectedMunicipalityData ? selectedMunicipalityData.barangays : []);

        // Update report form state with selected municipality and location data
        setReportForm((prev) => ({
            ...prev,
            info: {
                ...prev.info,
                [name]: value
            }, 
            location: {
                ...prev.location,
                long: location.long,
                lat: location.lat,
            }
        }));
    };

    const currentLocation = async () => {
        try{
            setLoading(true)

            const data = await getCurrentLocation()
            setLocation(data)
        } catch {
            console.log("error")
        } finally {
            setLoading(false)
        }
    }
    useEffect(()=> {
        currentLocation()
    }, [])

    const[reportForm, setReportForm] = useState({
        info: {
            lib_status_id: 1,
            title: '',
            desc: '',
            reporter_name: '',
            category: '',
        },
        location: {
            long: location?.long,
            lat: location?.lat,
        },
        evidence: []
    })
    const handleChange = (e) => {
        const {name, value} = e.target
        setReportForm((prev) => ({
            ...prev,
            info: {
                ...prev.info,
                [name]: name === 'address' ? prev.info.addressmun + ', ' + value : value
            },
            location: {
                ...prev.location,
                long: location.long,
                lat: location.lat,
            }
        }));

    }
    const handleFileChange = (event) => {
        setReportForm((prev) => ({
          ...prev,
          evidence: Array.from(event.target.files), // Store files directly
        }));
    };

    const handleIdentification = (event) => {
        setReportForm((prev) => ({
          ...prev,
          identification: Array.from(event.target.files), // Store files directly
        }));
    };

    const handleSubmmit = (e) => {
        e.preventDefault()
        setLoading(true)
        const login = async () => {
            try{
                const response = await axios.post(crud.concat('report'), reportForm, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                })
                if(response.status === 200){
                    handleModal()
                    setReportTracker((prev) => ({
                        ...prev,
                        code: response.data.code,
                        password: response.data.password,
                    }))
                }
            } catch (e){
                console.log("Error: ", e)
            } finally {
                setLoading(false)
                // navigate('/admin')
            } 
        }
        login()
        console.log(reportForm)
    }

    return (
        <>
        {loading && (<Loading />)}
        <AlreadyLoginRedirect />
        {modal && 
        <>
            <div className="absolute z-50 bg-black w-full h-full bg-opacity-60 flex items-center justify-center">
                <div className="bg-prc drop-shadow text-md font-bold p-5 text-white rounded-md">
                    The report has been successfully submitted!
                    <div className='mt-2 text-sm font-normal'>To track your report save this link and password before reloading or exiting</div>
                    <div className='mt-2 text-sm font-normal'>Link</div>
                    <div className='text-sm font-normal bg-white text-prc p-4 rounded-md'>{`http://localhost:5173/${reportTracker.code}`}</div>
                    <div className='mt-2 text-sm font-normal'>Password</div>
                    <div className='text-sm font-normal bg-white text-prc p-4 rounded-md'>{`${reportTracker.password}`}</div>
                </div>
            </div>
        </>
        }
        <div className='relative flex h-screen overflow-hidden'>
            <div
                className='absolute -inset-4 bg-cover bg-no-repeat blur-md'
                style={{ backgroundImage: `url(${bgImage})` }}
            ></div>

            <div className='relative flex-1 flex justify-end'>
                <div className='flex-1 bg-gradient-to-l from-src to-prc rounded-r-lg p-10 text-sec-text flex flex-col justify-center z-10'>
                    <NavLink to={'login'}>
                        <Logo />
                    </NavLink>
                    <div className='mt-6 text-4xl font-bold '>Crime Report</div>
                    <div className='mt-1 text-lg mb-5 '>Please describe the crime your reporting.</div>

                    <form className=' w-full' onSubmit={handleSubmmit}>
                        <div className='flex flex-col'>
                            <div className=''>
                                <label className='title text-sm '>Full Name</label>
                                <input
                                    onChange={handleChange}
                                    type='text'
                                    name='reporter_name'
                                    placeholder='Full Name'
                                    className='px-4 py-2 rounded text-black border-2 bg-white w-full'
                                />
                                <div className='flex-1 flex-col flex mt-2'>
                                    <label className='title text-sm '>Address</label>
                                    <div className='flex'>
                                        <select name="addressmun" value={selectedMunicipality} onChange={handleMunicipalityChange} className='px-4 py-2 rounded text-black border-2 mr-2 bg-white w-full'>
                                            <option value="">Select Municipality</option>
                                            {municipality.map((municipality) => (
                                                <option key={municipality.municipality} value={municipality.municipality}>
                                                    {municipality.municipality}
                                                </option>
                                            ))}
                                        </select>
                                        <select name="address" disabled={!barangays.length} onChange={handleChange } className='px-4 py-2 rounded text-black border-2 bg-white w-full'>
                                            <option value="">Select Barangay</option>
                                            {barangays.map((barangay) => (
                                                <option key={barangay} value={barangay}>
                                                    {barangay}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                </div>
                                <div className='flex gap-2 my-2'>
                                    <div className='flex-1'>
                                        <label className='title text-sm'>Select Crime Category</label>
                                        <select name='title' value={selectedCategory} onChange={handleCategoryChange} className='px-4 py-2 rounded text-black border-2 bg-white w-full'>
                                            <option value="">-- Select a Category --</option>
                                            {crimeCategories?.map((cat, index) => (
                                                <option key={index} value={cat.category}>{cat.category}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='flex-1'>
                                        <label className='title text-sm'>Select Crime Type</label>
                                        <select onChange={handleChange} name='category' disabled={!types.length} className='px-4 py-2 rounded text-black border-2 bg-white w-full'>
                                            <option value="">-- Select a Type --</option>
                                            {types?.map((type, index) => (
                                                <option key={index} value={type}>{type}</option>
                                            ))}
                                        </select>
                                    </div>
                                    
                                    
                                </div>

                                <label className='title text-sm '>Description</label>
                                <textarea
                                    rows={5}
                                    onChange={handleChange}
                                    type='text'
                                    name='desc'
                                    placeholder='Describe the crime being reported'
                                    className='px-4 py-2 rounded text-black border-2 bg-white w-full'
                                />
                            </div>
                            <label className='title mt-2 text-sm '>Evidence</label>
                            <input
                                type="file"
                                multiple
                                accept="image/*, video/*"
                                className=' bg-white p-2 rounded text-black'
                                onChange={handleFileChange}
                            />
                            <label className='title mt-2 text-sm '>{`Identification (Any type of ID PhileHalt, NationalID, School ID, etc.)`}</label>
                            <input
                                type="file"
                                required
                                accept="image/*, video/*"
                                className=' bg-white p-2 rounded text-black'
                                onChange={handleIdentification}
                            />
                        </div>
                        <div className="flex mt-2">
                            <input 
                                required
                                type="checkbox" 
                                id="privacyAgreement" 
                                className="flex-none content-center"
                            />
                            <label htmlFor="privacyAgreement" className="flex items-center ml-2">
                                I agree to the <a href="/privacy-policy" className="text-blue-600 px-1 underline">Privacy Policy</a> and <a href="/terms-conditions" className="text-blue-600 px-1 underline">Terms and Conditions</a>.
                            </label>
                        </div>

                        <button type='submit' className='w-full bg-src py-2 rounded-md mt-4'>Send Report</button>
                    </form>
                </div>
            </div>
            <div className='flex-1'></div>

        </div>
        </>
    )
}
