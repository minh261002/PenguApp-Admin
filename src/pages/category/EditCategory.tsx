import useDocumentTitle from '@/hooks/useDocumentTItle'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Controller, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import ReturnGroup from '@/components/custom/ReturnGroup'
import LoadingPage from '@/layouts/LoadingPage'
import { HttpStatus } from '@/constants/httpStatus'
import { showToast } from '@/helpers/toastHelper'
import { useNavigate, useParams } from 'react-router-dom'
import ImageCustom from '@/components/custom/ImageCustom'
import { Select as ShadSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ActiveStatus } from '@/constants/enum'
import { Checkbox } from '@/components/ui/checkbox'
import { Category } from '@/types/Category'
import { getCategoryById, updateCategory } from '@/services/CategoryService'

const EditCategory = () => {
  useDocumentTitle('Chỉnh sửa thông tin')

  const [loading, setLoading] = useState(false)
  const [createFile, setCreateFile] = useState<string | null>(null)
  const [showHome, setShowHome] = useState<boolean>(false)
  const [showMenu, setShowMenu] = useState<boolean>(false)

  const nav = useNavigate()
  const { id } = useParams()

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm<Category>()

  const fetchCategory = async () => {
    const response = await getCategoryById(String(id))
    if (response && Number(response.status) === HttpStatus.OK) {
      if (response.data) {
        setValue('name', response.data.name)
        setValue('description', response.data.description)
        setValue('status', response.data.status)
        setCreateFile(response.data.image)
        setShowHome(response.data.show_home)
        setShowMenu(response.data.show_menu)
      }
    }
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  const handleEditCategory = async (data: Category) => {
    data.image = createFile as string
    if (showHome) {
      data.show_home = true
    }

    if (showMenu) {
      data.show_menu = true
    }

    try {
      setLoading(true)
      const response = await updateCategory(String(id), data)
      if (response && response.status === HttpStatus.OK) {
        showToast(response.message, 'success')
        nav('/post-catalogue')
      }
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className='grid grid-cols-1 md:grid-cols-4 md:gap-5' onSubmit={handleSubmit(handleEditCategory)}>
      {loading ? <LoadingPage /> : null}
      <div className='col-span-3'>
        <Card className='mt-5'>
          <CardHeader className='flex-row items-center justify-between border-b mb-5'>
            <CardTitle className='font-medium'>Chỉnh sửa thông tin</CardTitle>
          </CardHeader>

          <CardContent className=''>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-3'>
              <div className='col-span-2'>
                <div className='form-group mb-3'>
                  <label className='text-sm font-medium mb-1 block'>Tên danh mục sản phẩm</label>
                  <Input
                    type='text'
                    placeholder='Nhập tên danh mục sản phẩm'
                    {...register('name', { required: 'Tên danh mục sản phẩm không được để trống' })}
                  />
                  {errors.name && <p className='text-red-500 text-xs mt-1'>{errors.name.message}</p>}
                </div>
              </div>

              <div className='col-span-2 md:col-span-1'>
                <div className='form-group mb-3'>
                  <div className='flex items-center space-x-2'>
                    <Checkbox
                      id='show_menu'
                      checked={showMenu}
                      onCheckedChange={(value) => setShowMenu(value as boolean)}
                    />
                    <label
                      htmlFor='show_menu'
                      className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                    >
                      Hiển thị trên menu
                    </label>
                  </div>
                  {errors.show_menu && <p className='text-red-500 text-xs mt-1'>{errors.show_menu.message}</p>}
                </div>
              </div>

              <div className='col-span-2 md:col-span-1'>
                <div className='form-group mb-3'>
                  <div className='flex items-center space-x-2'>
                    <Checkbox
                      id='show_home'
                      checked={showHome}
                      onCheckedChange={(value) => setShowHome(value as boolean)}
                    />
                    <label
                      htmlFor='show_home'
                      className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                    >
                      Hiển thị trên trang chủ
                    </label>
                  </div>

                  {errors.show_home && <p className='text-red-500 text-xs mt-1'>{errors.show_home.message}</p>}
                </div>
              </div>

              <div className='col-span-2'>
                <div className='form-group mb-3'>
                  <label className='text-sm font-medium mb-1 block'>Mô tả</label>
                  <textarea
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                    placeholder='Nhập mô tả'
                    {...register('description')}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className='col-span-1'>
        <ReturnGroup link='/post-catalogue' type='edit' />

        <Card className='mt-5'>
          <CardHeader className='flex-row items-center justify-between border-b mb-5'>
            <CardTitle className='font-medium'>Trạng thái</CardTitle>
          </CardHeader>

          <CardContent>
            <Controller
              name='status'
              control={control}
              defaultValue=''
              rules={{ required: 'Vui lòng chọn trạng thái' }}
              render={({ field }) => (
                <ShadSelect onValueChange={(value) => field.onChange(value)} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder='Chọn trạng thái' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ActiveStatus.ACTIVE}>Đang hoạt động</SelectItem>
                    <SelectItem value={ActiveStatus.INACTIVE}>Không hoạt động</SelectItem>
                  </SelectContent>
                </ShadSelect>
              )}
            />
            {errors.status && <span className='text-red-500 text-sm'>{errors.status.message}</span>}
          </CardContent>
        </Card>

        <Card className='mt-5'>
          <CardHeader className='flex-row items-center justify-between border-b mb-5'>
            <CardTitle className='font-medium'>Ảnh đại diện</CardTitle>
          </CardHeader>

          <CardContent className=''>
            <ImageCustom
              setCreateFile={(url: string) => {
                setCreateFile(url as string)
              }}
              image={createFile as string}
            />
          </CardContent>
        </Card>
      </div>
    </form>
  )
}

export default EditCategory