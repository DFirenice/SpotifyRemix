import axios from "axios";

/** Used to call protected routes with backend being base url. Includes credentials */
export const useProtectedApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
    withCredentials: true,
})