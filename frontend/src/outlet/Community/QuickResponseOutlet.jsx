import React, { useContext, useEffect, useState } from 'react'
import LoginRedirect from '../../component/LoginRedirect'
import AlreadyLoginRedirect from '../../component/AlreadyLoginRedirect'
import Logo from '../../component/Logo'
import Loading from '../../component/Loading'
import bgImage from '../../resource/bg.jpg'
import { baseURL, crud } from '../../resource/api'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import { getCurrentLocation } from '../../module/LoginModule'
import { useCrimeContext } from '../../context/CrimeContext'
import { AppContext } from '../../context/AppContext'

export function QuickResponseOutlet() {
    const {crimeCategories, municipality} = useCrimeContext()
    const {user, apiClient} = useContext(AppContext)
    const [loading, setLoading] = useState(false)
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [location,setLocation] = useState([]);
    const [pnp,setPNP] = useState([]);
    const [nearest, setNearest] = useState([]);
    const [selectedMunicipality, setSelectedMunicipality] = useState("");
    const [barangays, setBarangays] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [types, setTypes] = useState([]);
    const [modal, setModal] = useState(false)
    const [reportTracker, setReportTracker] = useState({})
    
    const handleModal = () => setModal(!modal)  
    const [privacyAndTerms, setPrivacyAndTerms] = useState(false)
    const [privacyAndTermsModal, setPrivacyAndTermsModal] = useState(false)
    // Function to toggle modal
    const handlePrivacyAndTermsModal = () => {
        setPrivacyAndTermsModal(!privacyAndTermsModal);
    };

    // Function to handle checkbox change
    const handlePrivacyAndTerms = () => {
        if (!privacyAndTerms) {
            // Show modal only when checkbox is unchecked
            handlePrivacyAndTermsModal();
        } else {
            // Unchecking directly without modal
            setPrivacyAndTerms(false);
        }
    };

    // Function to handle modal actions
    const handleModalAction = (accept) => {
        if (accept) {
            setPrivacyAndTerms(true); // Set checkbox as checked if user accepts
        } else {
            setPrivacyAndTerms(false); // Keep checkbox unchecked if user cancels
        }
        handlePrivacyAndTermsModal(); // Close the modal in both cases
    };
    
    
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
        const getPnp = async () => {
            try{
                setLoading(true)
                const response = await apiClient.get(`v1/crud/get-pnp`)
                setPNP(response.data.data)
            } catch {
                console.log("error")
            } finally {
                setLoading(false)
            }
        }
        getPnp()
    }, [])

    useEffect (() => {
        if(pnp){
            setNearest(findNearestUser(pnp, location)?.user?.id)
        }
    }, [pnp])
    const[reportForm, setReportForm] = useState({
        info: {
            lib_status_id: 4,
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
                [name]: name === 'address' ? prev.info.addressmun + ', ' + value : value,
                reporter_account: user?.data?.id,
                dispatch_user: nearest
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
        // console.log(reportForm)
    }

    return (
        <>
        {loading && (<Loading />)}
        {modal && 
        <>
            <div className="absolute z-50 bg-black w-full h-full bg-opacity-60 flex items-center justify-center">
                <div className="bg-prc drop-shadow text-md font-bold p-5 text-white rounded-md">
                    <div className='flex'>
                        <div className='flex-1'>   
                            The report has been successfully submitted!
                        </div>
                        <div className='cursor-pointer font-thin -mt-1 hover:scale-105' onClick={handleModal}>x</div>
                    </div>
                    <div className='mt-2 text-sm font-normal'>To track your report save this link and password before reloading or exiting</div>
                    <div className='mt-2 text-sm font-normal'>Link</div>
                    <div className='text-sm font-normal bg-white text-prc p-4 rounded-md'>{`https://crimereport.site/${reportTracker.code}`}</div>
                    <div className='mt-2 text-sm font-normal'>Password</div>
                    <div className='text-sm font-normal bg-white text-prc p-4 rounded-md'>{`${reportTracker.password}`}</div>
                </div>
            </div>
        </>
        }

        <div className='relative flex h-screen overflow-hidden'>

            {/* <div className='flex-1'></div> */}
            {/* <div className='relative flex-1 flex justify-center'> */}
            <div className="flex min-h-screen w-full justify-center items-center">
            {/* bg-gradient-to-l from-src to-prc text-sec-text */}
                <div className='flex-1 rounded-r-lg p-10 bg-white rounded-md drop-shadow-sm  flex flex-col justify-center z-10'>
                    {/* <NavLink to={'login'} replace={true}>
                        <Logo />
                    </NavLink> */}
                    <div className='mt-6 text-4xl font-bold '>Quick Response</div>
                    <div className='mt-1 text-lg '>Please describe the crime your reporting.</div>
                    <div className='mt-1 mb-5 flex mr-2 text-red-800 text-xl'> <p className='mr-1'>WARNING!!!</p>Upon sending this report the nearest Police officer will be notify about the report and be dispatched immidietly to your location.</div>

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
                                checked={privacyAndTerms}
                                onChange={() => handlePrivacyAndTerms(true)}
                                className="flex-none content-center"
                            />
                            <label htmlFor="privacyAgreement" className="flex items-center ml-2">
                                I agree to the <div className="cursor-pointer text-blue-600 px-1 underline" >Privacy Policy</div> and <div  className="cursor-pointer text-blue-600 px-1 underline" >Terms and Conditions</div>.
                            </label>
                        </div>

                        <button type='submit' className='w-full bg-src py-2 text-white rounded-md mt-4'>Send Report</button>
                    </form>
                </div>
            </div>
            {/* <div className='flex-1'></div> */}

            {privacyAndTermsModal &&
            <>
                <div className="absolute z-50 bg-black w-full h-full bg-opacity-60 flex items-center justify-center">
                    <div className="bg-prc drop-shadow text-md font-bold p-5 text-white rounded-md max-h-96 max-w-[900px] overflow-y-auto">
                        <div className='text-xl font-normal'>Privacy Policy</div>
                        <div className='flex'>
                            <div className='w-0.5 bg-white mt-2'/>
                            <div>
                                <div className='text-md font-thin p-2'>
                                    By signing below, you consent to Philippine National Police collecting, using, and storing your personal data for the purposes of Crime Report in accordance with the Data Privacy Act of 2012 (Republic Act No. 10173) and all other applicable data protection laws.
                                </div>
                                <div className='text-md font-thin p-2'>
                                We are committed to protecting your personal data in accordance with the requirements of the Data Privacy Act of 2012 and will retain it only for as long as necessary to fulfill the purposes stated above or as required by law.
                                </div>
                                <div className='text-md font-thin p-2'>
                                By checking this form, you confirm that you understand and agree to the collection and use of your personal data as outlined above.
                                </div>
                            </div>
                        </div>
                        <div className='text-xl font-normal mt-5'>Terms and Condition</div>
                        <div className='flex'>
                            <div className='w-0.5 bg-white mt-2'/>
                            <div>
                                <div className='text-md font-thin p-2'>
                                    Version 1.0
                                </div>
                                <div className='text-md font-thin p-2'>
                                    Last Updated: November 08, 2024
                                </div>
                                <div className='text-md font-thin p-2'>
                                    This End-User License Agreement ("EULA") is a legal agreement between you ("User") and the operators of the Enhancing Community Empowerment with a Web-Based Crime Report System ("Website"), governing your use of this Website and its associated services. By accessing, using, or submitting a report on this Website, you agree to comply with and be bound by the terms of this EULA.
                                </div>
                                <div className='text-md font-thin p-2'>
                                    <strong>Grant of License</strong><br/>
                                    You are granted a limited, non-exclusive, non-transferable, revocable license to access and use the Website strictly for lawful purposes and in accordance with this EULA.
                                </div>
                                <div className='text-md font-thin p-2'>
                                    <strong>User Responsibilities and Restrictions</strong><br/>
                                    • Accurate Information: You agree to provide accurate and truthful information when submitting crime reports or any other data.<br/>
                                    • Lawful Use: You agree not to use the Website for any unlawful or harmful activities, including submitting false information, spam, harassment, or any malicious content.<br/>
                                    • Unauthorized Access: You shall not attempt to gain unauthorized access to the Website, its servers, or any associated networks.<br/>
                                    • No Modification: You agree not to modify, alter, or create derivative works of the Website or its content.
                                </div>
                                <div className='text-md font-thin p-2'>
                                    <strong>User-Submitted Content</strong><br/>
                                    By submitting information, reports, or data, you grant the Website a non-exclusive, royalty-free, and worldwide license to use, distribute, and display this content solely to achieve the intended purpose of the Website. The Website reserves the right to review, remove, or modify any content that violates this EULA, the Privacy Policy, or applicable laws.
                                </div>
                                <div className='text-md font-thin p-2'>
                                    <strong>Privacy and Data Collection</strong><br/>
                                    The Website collects and processes personal data in accordance with its Privacy Policy. By using this Website, you agree to the collection, storage, and use of your information as outlined in the Privacy Policy.
                                </div>
                                <div className='text-md font-thin p-2'>
                                    <strong>Disclaimers of Warranty</strong><br/>
                                    The Website is provided on an "as-is" and "as-available" basis. The operators make no warranties, express or implied, regarding the accuracy, completeness, or reliability of the information on the Website. The Website does not guarantee that its services will be uninterrupted or error-free.
                                </div>
                                <div className='text-md font-thin p-2'>
                                    <strong>Limitation of Liability</strong><br/>
                                    To the fullest extent permitted by law, the operators of the Website shall not be liable for any damages, including but not limited to direct, indirect, incidental, punitive, or consequential damages arising from your use of, or inability to use, the Website. The operators shall not be responsible for any inaccuracies in the data submitted by users or displayed on the Website.
                                </div>
                                <div className='text-md font-thin p-2'>
                                    <strong>Account Security</strong><br/>
                                    You are responsible for maintaining the confidentiality of your login credentials and are solely responsible for any activity that occurs under your account. You agree to notify the Website administrators immediately of any unauthorized use of your account.
                                </div>
                                <div className='text-md font-thin p-2'>
                                    <strong>Modifications to the EULA</strong><br/>
                                    The Website reserves the right to update or modify this EULA at any time. Changes will be posted on the Website, and your continued use of the Website constitutes acceptance of any modifications.
                                </div>
                                <div className='text-md font-thin p-2'>
                                    <strong>Termination</strong><br/>
                                    The Website may suspend or terminate your account and access to the Website at its discretion if you violate any terms of this EULA.
                                </div>
                                <div className='text-md font-thin p-2'>
                                    <strong>Governing Law</strong><br/>
                                    This EULA shall be governed by the laws of the Philippines, without regard to its conflict of laws principles.
                                </div>
                                <div className='text-md font-thin p-2'>
                                    <strong>Contact Information</strong><br/>
                                    If you have questions or concerns about this EULA, please contact us at karlgarcianapiza@gmail.com.
                                </div>
                                <div className='text-md font-thin p-2'>
                                    By using this Website, you acknowledge that you have read, understood, and agree to be bound by the terms of this EULA.
                                </div>
                            </div>

                        </div>
                        <div className='flex select-none gap-4 mt-4'>
                            <div className='flex-1 p-2'/>
                            <div className='flex-none p-2 font-normal hover:underline cursor-pointer' onClick={() => handleModalAction(false)}>Cancel</div>
                            <div className=' flex-none p-2 bg-white rounded-md px-4 cursor-pointer text-prc hover:bg-gray-300' onClick={()=>handleModalAction(true)}>Accept</div>
                        </div>
                    </div>
                </div>
                </>
            }
        </div>
        </>
    )
}

function findNearestUser(users, reportLocation) {
    if (!reportLocation) return null;

    // Initialize variables to track the nearest user and smallest distance
    let nearestUser = null;
    let smallestDistance = Infinity;

    users.forEach(user => {
        const userLocation = user?.location;

        if (userLocation) {
            const distance = L.latLng(reportLocation.lat, reportLocation.long).distanceTo(
                L.latLng(userLocation.lat, userLocation.long)
            );

            if (distance < smallestDistance) {
                smallestDistance = distance;
                nearestUser = user;
            }
        }

    });
    // Return the nearest user and the distance in kilometers
    return nearestUser
        ? { user: nearestUser, distance: (smallestDistance / 1000).toFixed(2) }
        : null;
}