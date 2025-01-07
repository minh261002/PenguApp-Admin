import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { BellIcon, FullscreenIcon, LockIcon, LogOutIcon, SearchIcon, UserIcon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { showToast } from '@/helpers/toastHelper'
import useAuthStore from '@/store/authStore'

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuthStore()

  const handleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      document.documentElement.requestFullscreen()
    }
  }

  const handleLogout = () => {
    showToast('Đăng xuất thành công', 'success')
    logout()
  }

  return (
    <header className='shadow dark:shadow-2xl border-b-2'>
      <div className='h-[64px] w-full grid grid-cols-1 md:grid-cols-3 items-center justify-between px-10'>
        <div className='col-span-1 relative hidden md:block'>
          <Input className='md:block w-full' placeholder='Tìm kiếm nội dung' />
          <Button className='absolute top-1/2 right-0 transform -translate-y-1/2' size={'icon'}>
            <SearchIcon size={24} />
          </Button>
        </div>
        <div className='col-span-1'></div>
        <div className='col-span-1 flex items-center justify-end gap-6'>
          <DropdownMenu>
            <DropdownMenuTrigger className='focus:outline-none'>
              {isAuthenticated && user ? (
                <div className='flex items-center gap-2 cursor-pointer'>
                  <Avatar>
                    <AvatarImage src={user?.avatar || ''} alt={user.name} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  <div className='flex flex-col items-start'>
                    <span className='text-md font-medium'>{user.name}</span>
                    <span className='block text-xs text-muted-foreground'>Administrator</span>
                  </div>
                </div>
              ) : (
                <Button className='text-sm font-medium'>Đăng nhập</Button>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserIcon size={24} />
                Thông tin cá nhân
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LockIcon />
                Đổi mật khẩu
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button className='text-sm font-medium' size={'sm'} onClick={handleLogout}>
                  <LogOutIcon size={24} />
                  Đăng xuất
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className='cursor-pointer' onClick={handleFullscreen}>
            <FullscreenIcon size={28} />
          </div>

          <div className='cursor-pointer relative'>
            <BellIcon size={28} />
            <span className='absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-medium'>
              0
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
