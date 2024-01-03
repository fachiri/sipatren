import axios from 'axios'
import { apiUrl } from './constants'
import CryptoJS from 'crypto-js'

const getToken = () => {
  try {
    const accessToken = decodeURIComponent(localStorage.getItem('accessToken'))
    const user = JSON.parse(localStorage.getItem('userData'))
    const key = `${user.uuid}-${user.username}`
    const token = CryptoJS.AES.decrypt(accessToken, key).toString(CryptoJS.enc.Utf8)
    return token
  } catch (error) {
    // window.location.href = '/login';
    return null
  }
}

const instance = axios.create({
  baseURL: apiUrl
})

instance.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
      config.headers['ngrok-skip-browser-warning'] = "69420"
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
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('accessToken')
    }
    return Promise.reject(error);
  }
);

export default instance