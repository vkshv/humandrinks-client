import axios from 'axios'
import config from '@/config'
import { useAuthStore } from '@/stores/auth'

const axiosInstance = axios.create({
  baseURL: config.API_URL
})

axiosInstance.interceptors.request.use(function(config) {
  try {
    const { ACCESS_TOKEN } = useAuthStore()
    if (ACCESS_TOKEN) {
      config.headers.Authorization = `Bearer ${ACCESS_TOKEN}`
    }
  } catch (error) {
    // Ошибка при получении токена
  }
  return config
})

export default axiosInstance
