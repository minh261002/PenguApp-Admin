import { Outlet } from 'react-router'
import { useEffect } from 'react'
import { showToast } from '@/helpers/toastHelper'
import useToastStore from '@/store/toastStore'

import Navbar from '@/layouts/Navbar'
import Footer from '@/layouts/Footer'
import Sidebar from '@/layouts/Sidebar'

const Layout = () => {
  const { message, type, clearToast } = useToastStore()

  useEffect(() => {
    if (message && type) {
      showToast(message, type)
      clearToast()
    }
  }, [message, type, clearToast])

  return (
    <div className='flex flex-auto flex-col'>
      <div className='flex flex-auto min-w-0'>
        <Sidebar />

        <div className='flex flex-col flex-auto min-h-screen min-w-0 relative w-full'>
          <Navbar />

          <div className='h-full flex flex-auto flex-col bg-[#f5f5f5] overflow-scroll'>
            <div className='h-full flex flex-auto flex-col justify-between'>
              <main className='h-full'>
                <div className='relative h-full flex flex-auto flex-col px-4 sm:px-6 py-4 sm:py-6 md:px-8 mx-auto'>
                  <div className='container mx-auto h-full'>
                    <Outlet />
                  </div>
                </div>
              </main>

              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
