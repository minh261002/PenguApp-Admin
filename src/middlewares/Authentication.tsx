import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import useAuthStore from '@/store/authStore'
import { fetchData } from '@/services/AuthService'

const Authentication = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await fetchData()

        useAuthStore.getState().setUserData(userData)
      } catch (error) {
        navigate('/dang-nhap')
      }
    }

    if (!isAuthenticated) {
      navigate('/dang-nhap')
    } else {
      fetchUserData()
    }
  }, [isAuthenticated, navigate])

  return <div>{children}</div>
}

export default Authentication
