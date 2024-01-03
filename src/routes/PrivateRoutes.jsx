import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import axios from '../utils/axios'
import fetcher from "../utils/fetcher"
import FullLoader from "../components/FullLoader"
import useSWR from 'swr'

export default function PrivateRoutes({ role }) {
  const [token, setToken] = useState(true)

  // const { data: verifyData, error: verifyError, isLoading: verifyIsLoading } = useSWR(`/auth/verify-token`, fetcher)

  // console.log(verifyData)


  // useEffect(() => {
  //   const accessToken = localStorage.getItem('accessToken')
  //   const userData = JSON.parse(localStorage.getItem('userData'))

  //   if (!accessToken) {
  //     toast.error('Akses tidak valid')
  //     return setToken(false)
  //   }

  //   axios.get(`/auth/verify-token/${userData.role}`)
  //     .then((user) => {
  //       if (user.data.data.role != role) {
  //         return setToken(false)
  //       }
  //       setToken(true)
  //     })
  //     .catch((error) => {
  //       toast.error(error.response?.data?.message || error.message)
  //       return setToken(false)
  //     })
  // }, [])

  if (token === null) {
    return <FullLoader />
  }

  return (
    token ? <Outlet /> : <Navigate to="/login" />
  )
}