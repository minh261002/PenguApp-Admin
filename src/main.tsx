import { RouterProvider } from 'react-router'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastContainer } from 'react-toastify'

import '@/index.css'
import router from '@/router'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ToastContainer position='top-right' />
    <ReactQueryDevtools initialIsOpen={true} />
  </QueryClientProvider>
)
