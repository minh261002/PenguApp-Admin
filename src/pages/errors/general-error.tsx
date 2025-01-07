import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import useDocumentTitle from '@/hooks/useDocumentTItle'

interface GeneralErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  minimal?: boolean
}

export default function GeneralError({ className, minimal = false }: GeneralErrorProps) {
  useDocumentTitle('500 - Internal Server Error')

  const navigate = useNavigate()
  return (
    <div className={cn('h-svh w-full', className)}>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        {!minimal && <h1 className='text-[7rem] font-bold leading-tight'>500</h1>}
        <span className='font-medium'>Oops! Something went wrong {`:')`}</span>
        <p className='text-center text-muted-foreground'>
          We apologize for the inconvenience. <br /> Please try again later.
        </p>
        {!minimal && (
          <div className='mt-6 flex gap-4'>
            <Button onClick={() => navigate('/')}>Back to Home</Button>
          </div>
        )}
      </div>
    </div>
  )
}
