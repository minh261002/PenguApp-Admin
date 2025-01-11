import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import useAuthStore from '@/store/authStore'

const Authentication = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/dang-nhap')
    }
  }, [isAuthenticated, navigate])

  return <div>{children}</div>
}

export default Authentication
