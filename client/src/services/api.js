import axios from 'axios'
import { ADMIN_KEY, TOKEN_KEY } from '../utils/constants'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const isLoginRequest = error.config?.url?.includes('/auth/login')
      if (!isLoginRequest) {
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(ADMIN_KEY)
        if (window.location.pathname.startsWith('/admin')) {
          window.location.assign('/admin/login')
        }
      }
    }
    return Promise.reject(error)
  },
)

export default api
