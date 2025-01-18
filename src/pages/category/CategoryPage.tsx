import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { DataTable } from '@/components/datatable/Table'
import { useQuery } from '@tanstack/react-query'
import useDocumentTitle from '@/hooks/useDocumentTItle'
import Loader from '@/layouts/Loader'
import { PostCatalogue } from '@/types/PostCatalogue'
import { getAllCategories } from '@/services/CategoryService'
import { categoryColumns } from './CategoryColumns'

const CategoryPage = () => {
  useDocumentTitle('Quản lý danh mục sản phẩm')

  const {
    data: categories = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories
  })

  if (error) {
    return <>Error</>
  }

  const safePostCatalogues = categories as PostCatalogue[]
  return (
    <>
      <Card className='mt-5'>
        <CardHeader className='flex-row items-center justify-between border-b mb-5'>
          <CardTitle className='font-medium'>Danh sách danh mục sản phẩm</CardTitle>
          <Button className='space-y-0'>
            <Link to='/post-catalogue/create'>Thêm mới</Link>
          </Button>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <div>Error</div>
          ) : (
            <DataTable columns={categoryColumns} data={safePostCatalogues} />
          )}
        </CardContent>
      </Card>
    </>
  )
}

export default CategoryPage
