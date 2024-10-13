import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { auth, baseURL } from '../resource/api'

export const AppContext = createContext()

export default function AppProvider({children}) {
    const [token, setToken] =useState(localStorage.getItem('token'))
    const [role, setRole] =useState(localStorage.getItem('role'))
    const [user, setUser] =useState()

    const prod = "https://crime-report.io/"
    const apiClient = axios.create({
        baseURL: `${baseURL}api/`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    apiClient.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token')
            if(token){
                config.headers['Authorization'] = `Bearer ${token}`
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
            setRole(response.data.data.role.desc)
            localStorage.setItem('role', response.data.data.role.desc)
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
