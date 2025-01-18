import useDocumentTitle from '@/hooks/useDocumentTItle'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import type { User } from '@/types/User'
import { useForm } from 'react-hook-form'
import DatePickerCustom from '@/components/custom/DatePickerCustom'
import { useEffect, useState } from 'react'
import SelectLocation from '@/components/custom/SelectLocation'
import { getDistricts, getProvinces, getWards } from '@/services/LocationService'
import type { Location } from '@/types/Location'
import ReturnGroup from '@/components/custom/ReturnGroup'
import { EyeIcon, EyeClosedIcon } from 'lucide-react'
import { getUserById, updateUser } from '@/services/UserService'
import LoadingPage from '@/layouts/LoadingPage'
import { HttpStatus } from '@/constants/httpStatus'
import { showToast } from '@/helpers/toastHelper'
import ImageCustom from '@/components/custom/ImageCustom'
import { useParams } from 'react-router-dom'

const EditUser = () => {
  useDocumentTitle('Chỉnh sửa thông tin')
  const { id } = useParams()

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [provinces, setProvinces] = useState<Location[]>([])
  const [districts, setDistricts] = useState<Location[]>([])
  const [wards, setWards] = useState<Location[]>([])
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [createFile, setCreateFile] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors }
  } = useForm<User>()

  const fetchProvinces = async () => {
    const response = await getProvinces()
    setProvinces(response || [])
  }

  const handleOnChangeProvince = async (value: string | undefined) => {
    const response = await getDistricts(value || '')
    setDistricts(response || [])
  }

  const handleOnChangeDistrict = async (value: string | undefined) => {
    const response = await getWards(value || '')
    setWards(response || [])
  }

  const fetchUserData = async () => {
    const response = await getUserById(String(id))
    console.log(response?.data.province_id, response?.data.district_id, response?.data.ward_id)
    if (response && Number(response.status) === HttpStatus.OK) {
      if (response.data) {
        setValue('name', response.data.name)
        setValue('email', response.data.email)
        setValue('phone', response.data.phone)
        setValue('avatar', response.data.avatar)

        setValue('province_id', response.data.province_id)

        const district = await getDistricts(response?.data.province_id)
        setDistricts(district || [])
        setValue('district_id', response?.data.district_id)

        const ward = await getWards(response?.data.district_id)
        setWards(ward || [])
        setValue('ward_id', response?.data.ward_id)

        setValue('address', response.data.address)
        setValue('role', response.data.role)
        setValue('status', response.data.status)

        setValue('reward_point', response.data.reward_point)
        setSelectedDate(response.data.birthday)
        setCreateFile(response.data.avatar)
      }
    }
  }

  useEffect(() => {
    fetchProvinces()
    fetchUserData()
  }, [])

  const handleUpdateUser = async (data: User) => {
    if (selectedDate) {
      data.birthday = selectedDate
    }

    data.avatar = createFile as string

    try {
      setLoading(true)
      const response = await updateUser(String(id), data)
      if (response && response.status === HttpStatus.OK) {
        showToast(response.message, 'success')
      }
    } catch (error) {
      console.log('Create user failed')
    } finally {
      setLoading(false)
    }
  }
  return (
    <form className='grid grid-cols-1 md:grid-cols-4 md:gap-5' onSubmit={handleSubmit(handleUpdateUser)}>
      {loading ? <LoadingPage /> : null}
      <div className='col-span-3'>
        <Card className='mt-5'>
          <CardHeader className='flex-row items-center justify-between border-b mb-5'>
            <CardTitle className='font-medium'>Thêm tài khoản mới</CardTitle>
          </CardHeader>

          <CardContent className=''>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-3'>
              <div className='col-span-2 md:col-span-1'>
                <div className='form-group mb-3'>
                  <label className='text-sm font-medium mb-1 block'>Họ và tên</label>
                  <Input
                    type='text'
                    placeholder='Nhập họ và tên'
                    {...register('name', { required: 'Họ và tên không được để trống' })}
                  />
                  {errors.name && <p className='text-red-500 text-xs mt-1'>{errors.name.message}</p>}
                </div>
              </div>

              <div className='col-span-2 md:col-span-1'>
                <div className='form-group mb-3'>
                  <label className='text-sm font-medium mb-1 block'>Email</label>
                  <Input
                    type='email'
                    placeholder='Nhập email'
                    {...register('email', { required: 'Email không được để trống' })}
                  />
                  {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email.message}</p>}
                </div>
              </div>

              <div className='col-span-2 md:col-span-1'>
                <div className='form-group mb-3'>
                  <label className='text-sm font-medium mb-1 block'>Số điện thoại</label>
                  <Input type='text' placeholder='Nhập số điện thoại' {...register('phone')} />
                </div>
              </div>

              <div className='col-span-2 md:col-span-1'>
                <div className='form-group mb-3'>
                  <label className='text-sm font-medium mb-1 block'>Ngày sinh</label>
                  <DatePickerCustom selected={selectedDate} onChange={setSelectedDate} />
                </div>
              </div>

              <div className='col-span-2 md:col-span-1'>
                <div className='form-group mb-3'>
                  <label className='text-sm font-medium mb-1 block'>Mật khẩu</label>
                  <div className='relative'>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Nhập mật khẩu'
                      {...register('password')}
                    />
                    <button
                      type='button'
                      className='absolute right-2 top-2'
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeClosedIcon size={20} /> : <EyeIcon size={20} />}
                    </button>
                  </div>
                  {errors.password && <p className='text-red-500 text-xs mt-1'>{errors.password.message}</p>}
                </div>
              </div>

              <div className='col-span-2 md:col-span-1'>
                <div className='form-group mb-3'>
                  <label className='text-sm font-medium mb-1 block'>Xác nhận mật khẩu</label>
                  <div className='relative'>
                    <Input type={showConfirmPassword ? 'text' : 'password'} placeholder='Nhập lại mật khẩu' />
                    <button
                      type='button'
                      className='absolute right-2 top-2'
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeClosedIcon size={20} /> : <EyeIcon size={20} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <SelectLocation
              control={control}
              register={register}
              errors={errors}
              provinces={provinces}
              districts={districts}
              wards={wards}
              handleOnChangeProvince={handleOnChangeProvince}
              handleOnChangeDistrict={handleOnChangeDistrict}
            />
          </CardContent>
        </Card>
      </div>

      <div className='col-span-1'>
        <ReturnGroup link='/user' type='edit' />

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

export default EditUser
