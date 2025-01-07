import { ListIcon, PlusIcon, UserIcon } from 'lucide-react'

export const sidebarItems = [
  {
    title: 'Tài khoản',
    icon: <UserIcon size={24} />,
    href: '/user',
    children: [
      {
        title: 'Thêm mới',
        icon: <PlusIcon size={24} />,
        href: '/user/create'
      },
      {
        title: 'Danh sách',
        icon: <ListIcon size={24} />,
        href: '/user'
      }
    ]
  }
]
