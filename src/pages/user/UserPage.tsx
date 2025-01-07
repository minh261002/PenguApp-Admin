import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { DataTable } from '@/components/datatable/Table'
import { userColumns } from './UserColumns'
import { useQuery } from '@tanstack/react-query'
import type { User } from '@/types/User'
import useDocumentTitle from '@/hooks/useDocumentTItle'
import { getAllUsers } from '@/services/UserService'
import Loader from '@/layouts/Loader'

const UserPage = () => {
  useDocumentTitle('Quản lý tài khoản')

  const {
    data: users = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers
  })

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <>Error</>
  }

  const safeUsers = users as User[]
  return (
    <>
      <Card className='mt-5'>
        <CardHeader className='flex-row items-center justify-between border-b mb-5'>
          <CardTitle className='font-medium'>Danh sách tài khoản</CardTitle>
          <Button className='space-y-0'>
            <Link to='/user/create'>Thêm mới</Link>
          </Button>
        </CardHeader>

        <CardContent>
          <DataTable key={JSON.stringify(users)} columns={userColumns} data={safeUsers} />
        </CardContent>
      </Card>
    </>
  )
}

export default UserPage
