import axios from 'axios'

const handleAxiosError = (
  error: unknown,
  showToast: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void
): void => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      const statusCode = error.response.status
      showToast(error.response.data.message || 'Invalid data', 'error')
      console.error(`Error Status: ${statusCode}`, error.response.data)
    } else if (error.request) {
      console.error('No response received from server.')
    } else {
      console.error(`Error Message: ${error.message}`)
    }
  } else {
    console.error('Lỗi không xác định:', error)
  }
}

export { handleAxiosError }
