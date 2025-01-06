import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { UserData } from '@/types/Auth'

interface AuthStore {
  user: UserData | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  login: (data: { accessToken: string; refreshToken: string }) => void
  setUserData: (userData: UserData) => void
  logout: () => void
  checkAuth: () => boolean
  refreshAccessToken: (newAccessToken: string, newRefreshToken: string) => void // Cập nhật refreshToken
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      setUserData: (userData) => {
        set({ user: userData })
      },
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      login: ({ accessToken, refreshToken }) => {
        set({
          accessToken,
          refreshToken,
          isAuthenticated: true,
        })
      },
      logout: () => {
        set({
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        })
      },
      checkAuth: () => !!get().accessToken,
      refreshAccessToken: (newAccessToken, newRefreshToken) => {
        set({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        })
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useAuthStore
