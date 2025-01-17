import { LoaderIcon } from 'lucide-react'

const LoadingPage = () => {
  return (
    <div className='w-full h-screen z-50 fixed bg-white bg-opacity-90 flex items-center justify-center top-0 left-0 right-0 bottom-0'>
      <div className='flex items-center justify-center h-full'>
        <div className='flex items-center justify-center'>
          <LoaderIcon size='64' className='animate-spin text-primary' />
        </div>
      </div>
    </div>
  )
}

export default LoadingPage
