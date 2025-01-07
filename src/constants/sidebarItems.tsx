import { ListIcon, PlusIcon, ShieldIcon, UserIcon } from 'lucide-react'

export const sidebarItems = [
  {
    title: 'Quản trị viên',
    icon: <ShieldIcon size={24} />,
    href: '/admin',
    children: [
      {
        title: 'Thêm mới',
        icon: <PlusIcon size={24} />,
        href: '/admin/create'
      },
      {
        title: 'Danh sách',
        icon: <ListIcon size={24} />,
        href: '/admin'
      }
    ]
  },
  {
    title: 'Khách hàng',
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
