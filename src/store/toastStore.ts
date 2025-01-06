import { create } from 'zustand'

interface ToastStore {
  message: string
  type?: 'success' | 'error' | 'info' | 'warning'
  setMessage: (message: string) => void
  setType: (type: 'success' | 'error' | 'info' | 'warning') => void
  clearToast: () => void
}

const useToastStore = create<ToastStore>((set) => ({
  message: '',
  type: 'success',
  setMessage: (message) => set({ message }),
  setType: (type) => set({ type }),
  clearToast: () => set({ message: '', type: 'success' }),
}))

export default useToastStore
