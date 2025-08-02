import axios from 'axios'

const baseURL = import.meta.env.VITE_APP_API_URL

const apiClient = axios.create({
  baseURL: baseURL,
  headers: { 'Content-Type': 'application/json' }
})

apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token')

  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`
  return config
})

apiClient.interceptors.response.use(
  response => response,
  errors => {
    if (errors.response && errors.response.status === 401) {
      localStorage.removeItem('token')
    }
    return Promise.reject(errors)
  }
)

export default apiClient
