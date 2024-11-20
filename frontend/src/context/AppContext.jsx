import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { auth, baseURL } from '../resource/api'
import Cookie from 'js-cookie'


export const AppContext = createContext()

export default function AppProvider({children}) {
    const [token, setToken] =useState(localStorage.getItem('token'))
    const [role, setRole] =useState(localStorage.getItem('role'))
    const [user, setUser] =useState()

    const apiClient = axios.create({
        baseURL: `${baseURL}api/`,
        withCredentials: true, 
        headers: {
            'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
            'Content-Type': 'application/json'
        }
    })
    apiClient.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token'); // Get token from localStorage
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`
                config.headers['X-XSRF-TOKEN'] = getCookie('XSRF-TOKEN')// Set the token dynamically
            }
            return config
        }, (error) => {
            return Promise.reject(error)
        }
    )
    const getUser = async () => {
        try{
            const response = await axios.get(auth.concat('user'), {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setUser(response.data)
            setRole(response?.data?.data?.role?.desc ?? 'community')
            localStorage.setItem('role', response?.data?.data?.role?.desc ?? 'community')
        } catch (e){
            console.log("error", e)
            if(token) {
                localStorage.removeItem('token')
                localStorage.removeItem('role')
            }
        } 
    } 

    useEffect(() => {
        if(token){
            getUser()
        }
    }, [token])
    return (
        <>
            <AppContext.Provider value={{ token, role, user, setToken, setRole, setUser, apiClient }}>
                {children}
            </AppContext.Provider>
        </>
    )
}

const getCookie = (cookieName) => {
    return Cookie.get(cookieName)
}
