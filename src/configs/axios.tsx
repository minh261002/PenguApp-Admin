import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import useAuthStore from '@/store/authStore'

export const baseURL = 'http://localhost:3000/api'

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean
}

axios.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState()
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`
  }
  return config
})

const refreshToken = async () => {
  const { refreshToken } = useAuthStore.getState()
  if (!refreshToken) {
    throw new Error('Refresh token is missing')
  }

  try {
    const response = await axios.post(`${baseURL}/auth/refresh-token`, {
      refreshToken: refreshToken
    })

    const { accessToken, refreshToken: newRefreshToken } = response.data.tokens || {}

    if (!accessToken || !newRefreshToken) {
      throw new Error('Refresh token response is invalid')
    }

    useAuthStore.getState().refreshAccessToken(accessToken, newRefreshToken)
  } catch (error) {
    console.error('Error refreshing token:', error)
    throw new Error('Unable to refresh token')
  }
}

axios.interceptors.response.use(
  (response) => {
    return response
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        await refreshToken()

        const newAccessToken = useAuthStore.getState().accessToken
        if (newAccessToken) {
          originalRequest.headers = originalRequest.headers || {}
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`

          return axios(originalRequest)
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError)
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

axios.defaults.withCredentials = true
axios.defaults.baseURL = baseURL
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Accept'] = 'application/json'

export default axios
