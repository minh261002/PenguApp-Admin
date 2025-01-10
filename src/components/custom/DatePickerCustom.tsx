import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'
import { vi } from 'date-fns/locale/vi'
registerLocale('vi', vi)

interface DatePickerProps {
  selected: Date | null
  onChange: (date: Date) => void
  setBirthday?: (date: Date | null) => void
}
const DatePickerCustom = ({ selected, onChange }: DatePickerProps) => {
  return (
    <DatePicker
      selected={selected}
      onChange={(date) => date && onChange(date)}
      dateFormat='dd/MM/yyyy'
      showTimeSelect
      locale={vi}
      className='flex h-10 w-full rounded-sm border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm duration-300'
    />
  )
}

export default DatePickerCustom
