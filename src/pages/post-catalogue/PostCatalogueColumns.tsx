import { DataTableColumnHeader } from '@/components/datatable/ColumnHeader'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Edit } from 'lucide-react'
import DeleteButton from '@/components/datatable/DeleteButton'
import { Switch } from '@/components/ui/switch'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { showToast } from '@/helpers/toastHelper'
import { ActiveStatus } from '@/constants/enum'
import { HttpStatus } from '@/constants/httpStatus'
import type { PostCatalogue } from '@/types/PostCatalogue'
import { deletePostCatalogue, updateStatusPostCatalogue } from '@/services/PostCatalogueService'
import { Badge } from '@/components/ui/badge'

export const postCatalogueColumns: ColumnDef<PostCatalogue | null>[] = [
  {
    accessorKey: 'image',
    header: 'Ảnh',
    cell: ({ row }) => <img src={row.original?.image ?? ''} alt='image' className='w-16 h-16 object-cover' />
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Tên chuyên mục' />
  },
  {
    accessorKey: 'show_menu',
    header: 'Hiển thị menu',
    cell: ({ row }) => {
      const value = row.original?.show_menu
      if (value) {
        return <Badge className='bg-green-500'>Hiển thị</Badge>
      } else {
        return <Badge className='bg-red-500'>Ẩn</Badge>
      }
    }
  },
  {
    accessorKey: 'show_home',
    header: 'Hiển thị trang chủ',
    cell: ({ row }) => {
      const value = row.original?.show_home
      if (value) {
        return <Badge className='bg-green-500'>Hiển thị</Badge>
      } else {
        return <Badge className='bg-red-500'>Ẩn</Badge>
      }
    }
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ row, getValue }) => {
      const queryClient = useQueryClient()
      const [isLoading, setIsLoading] = useState(false)
      const value = getValue()
      const catalogueId = row.original?._id

      const handleUpdateStatus = async (_id: string, status: string) => {
        setIsLoading(true)
        try {
          const response = await updateStatusPostCatalogue(_id, status)
          if (response && response.status === HttpStatus.OK) {
            await queryClient.invalidateQueries({ queryKey: ['users'] })
            showToast('Cập nhật trạng thái thành công', 'success')
          }
        } catch (error) {
          console.error('Error updating status', error)
        } finally {
          setIsLoading(false)
        }
      }

      return (
        <Switch
          checked={value === ActiveStatus.ACTIVE}
          onCheckedChange={async (checked) => {
            if (catalogueId) {
              handleUpdateStatus(catalogueId, checked ? ActiveStatus.ACTIVE : ActiveStatus.INACTIVE)
            }
          }}
          disabled={isLoading}
        />
      )
    }
  },
  {
    accessorKey: '_id',
    header: 'Thao tác',
    cell: ({ row }) => {
      const catalogueId = row.getValue('_id')

      return (
        <div className='flex items-center justify-start gap-2'>
          <Button variant='outline' size='sm'>
            <Link to={`/post-catalogue/${catalogueId}/edit`}>
              <Edit size={16} />
            </Link>
          </Button>

          <DeleteButton action={deletePostCatalogue} _id={String(catalogueId)} queryKey={['postCatalogues']} />
        </div>
      )
    }
  }
]
