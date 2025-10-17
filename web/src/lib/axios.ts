import axios from "axios"
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios"

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://api.example.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
})

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => Promise.reject(error)
)

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      console.error(`[API Error ${error.response.status}]:`, error.response.data)
    } else {
      console.error("Network Error:", error.message)
    }
    return Promise.reject(error)
  }
)

export default api
