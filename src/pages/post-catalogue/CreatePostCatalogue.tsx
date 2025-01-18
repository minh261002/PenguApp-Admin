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
import { PostCatalogue } from '@/types/PostCatalogue'
import { createPostCatalogue, getAllPostCatalogues } from '@/services/PostCatalogueService'
import Select from 'react-select'

const CreatePostCatalogue = () => {
  useDocumentTitle('Thêm chuyên mục bài viết mới')

  const [loading, setLoading] = useState(false)
  const [createFile, setCreateFile] = useState<string | null>(null)
  const [catalogues, setCatalogues] = useState<PostCatalogue[]>([])

  const nav = useNavigate()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<PostCatalogue>()

  const fetchPostCatalogues = async () => {
    const catalogues = await getAllPostCatalogues()
    if (catalogues) {
      setCatalogues(catalogues)
    }
  }

  useEffect(() => {
    fetchPostCatalogues()
  }, [])

  const handleCreatePostCatalogue = async (data: PostCatalogue) => {
    data.image = createFile as string

    try {
      setLoading(true)
      const response = await createPostCatalogue(data)
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
    <form className='grid grid-cols-1 md:grid-cols-4 md:gap-5' onSubmit={handleSubmit(handleCreatePostCatalogue)}>
      {loading ? <LoadingPage /> : null}
      <div className='col-span-3'>
        <Card className='mt-5'>
          <CardHeader className='flex-row items-center justify-between border-b mb-5'>
            <CardTitle className='font-medium'>Thêm chuyên mục bài viết mới</CardTitle>
          </CardHeader>

          <CardContent className=''>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-3'>
              <div className='col-span-2 md:col-span-1'>
                <div className='form-group mb-3'>
                  <label className='text-sm font-medium mb-1 block'>Tên chuyên mục bài viết</label>
                  <Input
                    type='text'
                    placeholder='Nhập tên chuyên mục bài viết'
                    {...register('name', { required: 'Tên chuyên mục bài viết không được để trống' })}
                  />
                  {errors.name && <p className='text-red-500 text-xs mt-1'>{errors.name.message}</p>}
                </div>
              </div>

              <div className='col-span-2 md:col-span-1'>
                <div className='form-group mb-3'>
                  <div className='col-span-1 mb-3 '>
                    <label className='text-sm font-medium mb-1 block'>Chuyên mục cha</label>
                    <Controller
                      name='parent'
                      control={control}
                      render={({ field }) => (
                        <Select
                          className=''
                          options={catalogues.map((catalogue) => ({
                            value: catalogue._id,
                            label: catalogue.name
                          }))}
                          placeholder='Chọn chuyên mục cha'
                          onChange={(value) => field.onChange(value?.value)}
                        />
                      )}
                    />
                  </div>
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
        <ReturnGroup link='/user' type='create' />

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

export default CreatePostCatalogue
