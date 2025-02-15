import axios from 'axios'
import config from '@/config'

const axiosInstance = axios.create({
  baseURL: config.API_URL
})

axiosInstance.interceptors.request.use(async function(config) {
  try {
    const token = await window.Telegram.WebApp.CloudStorage.getItem('ACCESS_TOKEN')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  } catch (error) {
    // Ошибка при получении токена
  }
  return config
})

export default axiosInstance
