import { HomeIcon, ListIcon, PlusIcon, UserIcon } from 'lucide-react'

export const navBarItems = [
  {
    icon: <HomeIcon />,
    text: 'Dashboard',
    link: '/',
  },
  {
    icon: <UserIcon />,
    subMenu: [
      {
        icon: <PlusIcon />,
        text: 'Thêm mới',
        link: '/user/create',
      },
      {
        icon: <ListIcon />,
        text: 'Danh sách',
        link: '/user',
      },
    ],
    text: 'Khách hàng',
  },
]
