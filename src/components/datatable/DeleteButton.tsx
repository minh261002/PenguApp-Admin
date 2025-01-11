import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { HttpStatus } from '@/constants/httpStatus'
import { showToast } from '@/helpers/toastHelper'
import Loader from '@/layouts/Loader'

type response = {
  status: number
  message: string
}

type DeleteButtonProps = {
  action: (_id: string) => Promise<response | null>
  _id: string
  queryKey: string[]
}

const DeleteButton = ({ action, _id, queryKey }: DeleteButtonProps) => {
  const [loading, setLoading] = useState<boolean>(false)

  const queryClient = useQueryClient()

  const handleDelete = async (_id: string) => {
    setLoading(true)
    const response = await action(_id)

    if (response) {
      if (response.status === HttpStatus.OK) {
        queryClient.invalidateQueries({ queryKey: queryKey })
        showToast(response.message, 'success')
      } else {
        showToast(response.message, 'error')
        console.log(response)
      }
    } else {
      showToast('An error occurred', 'error')
    }
    setLoading(false)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='default' size='sm'>
          <Trash size={16} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cảnh báo !</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có chắc chắn muốn xóa bản ghi này không? Dữ liệu sẽ bị xoá hoàn toàn và không thể khôi phục.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Huỷ</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete(_id)}>{loading ? <Loader /> : 'Xác nhận'}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteButton
