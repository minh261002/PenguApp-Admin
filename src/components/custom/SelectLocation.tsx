import Select from 'react-select'
import { Controller } from 'react-hook-form'
import { Input } from '../ui/input'

interface SelectLocationProps {
  control: any
  register: any
  errors: any
  provinces: any
  districts: any
  wards: any
  handleOnChangeProvince: any
  handleOnChangeDistrict: any
}

const SelectLocation = ({
  control,
  register,
  errors,
  provinces,
  districts,
  wards,
  handleOnChangeProvince,
  handleOnChangeDistrict
}: SelectLocationProps) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
      <div className='col-span-3 md:col-span-1'>
        <label className='block text-sm font-light mb-2'>Tỉnh/Thành phố</label>
        <Controller
          name='province_id'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <Select
              options={provinces.map((province: any) => ({
                value: province.code,
                label: province.name_with_type
              }))}
              placeholder='Chọn Tỉnh/Thành phố'
              onChange={(newValue) => {
                const value = newValue as { value: string } | null
                field.onChange(value?.value || '')
                handleOnChangeProvince(value?.value || '')
              }}
            />
          )}
        />
      </div>

      <div className='col-span-3 md:col-span-1'>
        <label className='block text-sm font-light mb-2'>Quận/Huyện</label>
        <Controller
          name='district_id'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <Select
              options={districts.map((district: any) => ({
                value: district.code,
                label: district.name_with_type
              }))}
              placeholder='Chọn Quận/Huyện'
              onChange={(newValue: { value: string } | null) => {
                field.onChange(newValue?.value || '')
                handleOnChangeDistrict(newValue?.value || '')
              }}
            />
          )}
        />
      </div>

      <div className='col-span-3 md:col-span-1'>
        <label className='block text-sm font-light mb-2'>Phường/Xã</label>
        <Controller
          name='ward_id'
          control={control}
          render={({ field }) => (
            <Select
              className=''
              options={wards.map((ward: any) => ({
                value: ward.code,
                label: ward.name_with_type
              }))}
              placeholder='Chọn Phường/Xã'
              onChange={(newValue) => {
                const value = newValue as { value: string } | null
                field.onChange(value?.value || '')
              }}
            />
          )}
        />
      </div>

      <div className='col-span-3'>
        <label className='block text-sm font-light mb-2'>Địa chỉ</label>
        <Input className='duration-200' {...register('address')} />
        {errors.address && <span className='text-red-500 text-sm'>{errors.address.message}</span>}
      </div>
    </div>
  )
}

export default SelectLocation
