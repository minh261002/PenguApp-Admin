import { DataTableColumnHeader } from '@/components/datatable/ColumnHeader'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Edit } from 'lucide-react'
import DeleteButton from '@/components/datatable/DeleteButton'
import type { User } from '@/types/User'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { deleteUser, updateStatusUser } from '@/services/UserService'
import { showToast } from '@/helpers/toastHelper'
import { UserRole, UserStatus } from '@/constants/enum'

export const userColumns: ColumnDef<User | null>[] = [
  {
    accessorKey: 'avatar',
    header: 'Ảnh',
    cell: ({ row }) => <img src={row.original?.avatar} alt='image' className='w-16 h-16 object-cover' />
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Họ và tên' />
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Email' />
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ row, getValue }) => {
      const queryClient = useQueryClient()
      const [isLoading, setIsLoading] = useState(false)
      const value = getValue()
      const userId = row.original?._id

      const handleUpdateStatus = async (_id: string, status: string) => {
        setIsLoading(true)
        try {
          await updateStatusUser(_id, status)
          await queryClient.invalidateQueries({ queryKey: ['users'] })
          showToast('Cập nhật trạng thái thành công', 'success')
        } catch (error) {
          console.error('Error updating status', error)
        } finally {
          setIsLoading(false)
        }
      }

      return (
        <Switch
          checked={value === UserStatus.ACTIVE}
          onCheckedChange={async (checked) => {
            if (userId) {
              handleUpdateStatus(userId, checked ? UserStatus.ACTIVE : UserStatus.INACTIVE)
            }
          }}
          disabled={isLoading}
        />
      )
    }
  },
  {
    accessorKey: 'role',
    header: 'Vai trò',
    cell: ({ getValue }) => {
      const value = getValue()
      return value === UserRole.ADMIN ? (
        <Badge className='bg-sky-500 rounded-md'>Quản trị viên</Badge>
      ) : (
        <Badge className='bg-green-500'>Khách hàng</Badge>
      )
    }
  },
  {
    accessorKey: '_id',
    header: 'Thao tác',
    cell: ({ row }) => {
      const userId = row.getValue('_id')

      return (
        <div className='flex items-center justify-start gap-2'>
          <Button variant='outline' size='sm'>
            <Link to={`/user/${userId}/edit`}>
              <Edit size={16} />
            </Link>
          </Button>

          <DeleteButton action={deleteUser} id={Number(userId)} queryKey={['users']} />
        </div>
      )
    }
  }
]
