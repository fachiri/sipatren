import axios from 'axios'
import { apiUrl } from './constants'
import { toast } from 'react-toastify'

const instance = axios.create({
  baseURL: apiUrl
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken') 

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      toast.error(error.response.data?.message)
    }

    if (error.response && error.response.status === 401) {
      localStorage.removeItem('accessToken')
    }

    return Promise.reject(error);
  }
);

export default instance