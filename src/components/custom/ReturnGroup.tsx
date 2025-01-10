import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

interface ReturnGroupProps {
  link: string
  type: string
}

const ReturnGroup = ({ link, type }: ReturnGroupProps) => {
  return (
    <Card className='mt-5'>
      <CardHeader className='flex-row items-center justify-between border-b mb-5'>
        <CardTitle className='font-medium'>Thao tác</CardTitle>
      </CardHeader>

      <CardContent className='flex items-center justify-between gap-4'>
        <Link to={link} className='w-full'>
          <Button type='button' variant='outline' className='w-full'>
            Quay lại
          </Button>
        </Link>
        <Button type='submit' className='w-full' variant='default'>
          {type == 'create' ? 'Thêm mới' : 'Lưu thay đổi'}
        </Button>
      </CardContent>
    </Card>
  )
}

export default ReturnGroup
