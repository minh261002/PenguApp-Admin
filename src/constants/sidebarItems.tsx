import { AlbumIcon, BlocksIcon, GripIcon, ListIcon, PlusIcon, UserIcon } from 'lucide-react'

export const sidebarItems = [
  {
    title: 'Danh mục',
    icon: <BlocksIcon size={24} />,
    href: '/category',
    children: [
      {
        title: 'Thêm mới',
        icon: <PlusIcon size={24} />,
        href: '/category/create'
      },
      {
        title: 'Danh sách',
        icon: <ListIcon size={24} />,
        href: '/category'
      }
    ]
  },
  {
    title: 'Chuyên mục',
    icon: <GripIcon size={24} />,
    href: '/post-catalogue',
    children: [
      {
        title: 'Thêm mới',
        icon: <PlusIcon size={24} />,
        href: '/post-catalogue/create'
      },
      {
        title: 'Danh sách',
        icon: <ListIcon size={24} />,
        href: '/post-catalogue'
      }
    ]
  },
  {
    title: 'Bài viết',
    icon: <AlbumIcon size={24} />,
    href: '/post',
    children: [
      {
        title: 'Thêm mới',
        icon: <PlusIcon size={24} />,
        href: '/post/create'
      },
      {
        title: 'Danh sách',
        icon: <ListIcon size={24} />,
        href: '/post'
      }
    ]
  },
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
