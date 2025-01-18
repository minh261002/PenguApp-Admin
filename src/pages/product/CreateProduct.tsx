import useDocumentTitle from '@/hooks/useDocumentTItle'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Controller, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import ReturnGroup from '@/components/custom/ReturnGroup'
import LoadingPage from '@/layouts/LoadingPage'
import { HttpStatus } from '@/constants/httpStatus'
import { showToast } from '@/helpers/toastHelper'
import { useNavigate } from 'react-router-dom'
import ImageCustom from '@/components/custom/ImageCustom'
import { Select as ShadSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ActiveStatus } from '@/constants/enum'
import { Category } from '@/types/Category'
import TextareaCustom from '@/components/custom/Textarea'
import ImageMultiple from '@/components/custom/ImageMultiple'
import { getAllCategories } from '@/services/CategoryService'
import { Product } from '@/types/Product'
import { createProduct } from '@/services/ProductService'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

const CreateProduct = () => {
  useDocumentTitle('Thêm sản phẩm mới')

  const [loading, setLoading] = useState(false)
  const [createFile, setCreateFile] = useState<string | null>(null)
  const [gallery, setGallery] = useState<string[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [description, setDescription] = useState<string>('')

  const nav = useNavigate()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<Product>()

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories()
      if (response) {
        setCategories(response)
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleCreateProduct = async (data: Product) => {
    data.image = createFile as string
    data.description = description
    data.gallery = gallery

    try {
      setLoading(true)
      const response = await createProduct(data)
      if (response && response.status === HttpStatus.CREATED) {
        showToast(response.message, 'success')
        nav('/product')
      }
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className='grid grid-cols-1 md:grid-cols-4 md:gap-5' onSubmit={handleSubmit(handleCreateProduct)}>
      {loading ? <LoadingPage /> : null}
      <div className='col-span-3'>
        <Card className='mt-5'>
          <CardHeader className='flex-row items-center justify-between border-b mb-5'>
            <CardTitle className='font-medium'>Thêm sản phẩm mới</CardTitle>
          </CardHeader>

          <CardContent className=''>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-3'>
              <div className='col-span-2'>
                <div className='form-group mb-3'>
                  <label className='text-sm font-medium mb-1 block'>Tên sản phẩm</label>
                  <Input
                    type='text'
                    placeholder='Nhập tên sản phẩm'
                    {...register('name', { required: 'Tên sản phẩm không được để trống' })}
                  />
                  {errors.name && <p className='text-red-500 text-xs mt-1'>{errors.name.message}</p>}
                </div>
              </div>

              <div className='col-span-2'>
                <div className='form-group mb-3'>
                  <label className='text-sm font-medium mb-1 block'>Mô tả</label>
                  <TextareaCustom data={description || ''} setValue={setDescription} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='mt-5'>
          <CardHeader className='flex-row items-center justify-between border-b mb-5'>
            <CardTitle className='font-medium'>Chi tiết sản phẩm</CardTitle>
          </CardHeader>

          <CardContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant='outline'>Show Dialog</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account and remove your data from
                    our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>

        <ImageMultiple setGalleryImages={setGallery} Gallery={gallery} />
      </div>

      <div className='col-span-1'>
        <ReturnGroup link='/product' type='create' />

        <Card className='mt-5'>
          <CardHeader className='flex-row items-center justify-between border-b mb-5'>
            <CardTitle className='font-medium'>Danh mục</CardTitle>
          </CardHeader>

          <CardContent>
            <Controller
              name='category_id'
              control={control}
              defaultValue=''
              rules={{ required: 'Vui lòng chọn danh mục' }}
              render={({ field }) => (
                <ShadSelect onValueChange={(value) => field.onChange(value)} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder='Chọn danh mục' />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </ShadSelect>
              )}
            />
            {errors.category_id && <span className='text-red-500 text-sm'>{errors.category_id.message}</span>}
          </CardContent>
        </Card>

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

export default CreateProduct
