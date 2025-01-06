import React, { useEffect } from 'react'
import useAuthStore from '@/store/authStore'
import { useNavigate } from 'react-router'

const NoAuthentication = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  return <div>{children}</div>
}

export default NoAuthentication
