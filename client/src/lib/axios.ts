import axios from "axios";

/** @description Has a base of a clean backend URL */
export const ProtectedApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL
})

const getToken = () => localStorage.getItem('jwt')

ProtectedApi.interceptors.request.use(config => {
    const token = getToken()
    
    if (token) {
        config.headers = config.headers || {}
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
}, error => Promise.reject(error) )