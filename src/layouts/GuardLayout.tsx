import { Outlet } from 'react-router'
import { useEffect } from 'react'
import { showToast } from '@/helpers/toastHelper'
import useToastStore from '@/store/toastStore'

const GuardLayout = () => {
  const { message, type, clearToast } = useToastStore()

  useEffect(() => {
    if (message && type) {
      showToast(message, type)
      clearToast()
    }
  }, [message, type, clearToast])

  return (
    <div className='w-full'>
      <div className='md:grid md:grid-cols-2 gap-4'>
        <Outlet />

        <div className='hidden md:block w-full h-screen'>
          <img src='/bg-auth.avif' alt='logo' className='w-full h-full object-cover' />
        </div>
      </div>
    </div>
  )
}

export default GuardLayout
