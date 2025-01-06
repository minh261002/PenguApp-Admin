import { toast } from 'react-toastify'

export type ToastType = 'success' | 'error' | 'info' | 'warning' | undefined

export const showToast = (message: string, type: ToastType) => {
  if (message) {
    toast.dismiss()

    switch (type) {
      case 'success':
        toast.success(message)
        break
      case 'error':
        toast.error(message)
        break
      case 'info':
        toast.info(message)
        break
      case 'warning':
        toast.warning(message)
        break
      default:
        break
    }
  }
}
