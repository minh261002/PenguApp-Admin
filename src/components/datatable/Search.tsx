import { Table } from '@tanstack/react-table'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

interface DataTableSearchProps<TData> {
  table: Table<TData>
}

export function Search<TData>({ table }: DataTableSearchProps<TData>) {
  const [searchValue, setSearchValue] = useState('')
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    table.setGlobalFilter(e.target.value)
  }

  return (
    <div className='w-[300px]'>
      <Input value={searchValue} onChange={handleSearch} placeholder='Tìm kiếm...' />
    </div>
  )
}
