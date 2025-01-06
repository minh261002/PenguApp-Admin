import { Outlet } from 'react-router'
import { useEffect } from 'react'
import { showToast } from '@/helpers/toastHelper'
// import Sidebar from '@/components/partials/Sidebar'
import useToastStore from '@/store/toastStore'
// import Navbar from '@/components/partials/Navbar'

const Layout = () => {
  const { message, type, clearToast } = useToastStore()

  useEffect(() => {
    if (message && type) {
      showToast(message, type)
      clearToast()
    }
  }, [message, type, clearToast])

  return (
    <div className='w-full flex items-start justify-start gap-0'>
      <div className='h-screen w-64'>{/* <Sidebar /> */}</div>
      <div className='flex-1 flex flex-col'>
        {/* <Navbar /> */}

        <div className='flex-1 p-4'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
