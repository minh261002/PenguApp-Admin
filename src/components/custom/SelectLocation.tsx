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
              options={provinces}
              getOptionLabel={(province) => province.name_with_type}
              getOptionValue={(province) => province.code}
              value={provinces.find((province: any) => province.code === field.value) || null}
              placeholder='Chọn Tỉnh/Thành phố'
              onChange={(value) => {
                field.onChange(value?.code)
                handleOnChangeProvince(value?.code)
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
              options={districts}
              getOptionLabel={(district) => district.name_with_type}
              getOptionValue={(district) => district.code}
              value={districts.find((district: any) => district.code === field.value) || null}
              placeholder='Chọn Quận/Huyện'
              onChange={(value) => {
                field.onChange(value?.code)
                handleOnChangeDistrict(value?.code)
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
              options={wards}
              getOptionLabel={(ward) => ward.name_with_type}
              getOptionValue={(ward) => ward.code}
              value={wards.find((ward: any) => ward.code === field.value) || null}
              placeholder='Chọn Phường/Xã'
              onChange={(value) => field.onChange(value?.code)}
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
