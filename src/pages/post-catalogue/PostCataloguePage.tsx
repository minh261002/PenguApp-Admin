import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { DataTable } from '@/components/datatable/Table'
import { useQuery } from '@tanstack/react-query'
import useDocumentTitle from '@/hooks/useDocumentTItle'
import Loader from '@/layouts/Loader'
import { postCatalogueColumns } from './PostCatalogueColumns'
import { PostCatalogue } from '@/types/PostCatalogue'
import { getAllPostCatalogues } from '@/services/PostCatalogueService'

const PostCataloguePage = () => {
  useDocumentTitle('Quản lý chuyên mục bài viết')

  const {
    data: postCatalogues = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['postCatalogues'],
    queryFn: getAllPostCatalogues
  })

  if (error) {
    return <>Error</>
  }

  const safePostCatalogues = postCatalogues as PostCatalogue[]
  return (
    <>
      <Card className='mt-5'>
        <CardHeader className='flex-row items-center justify-between border-b mb-5'>
          <CardTitle className='font-medium'>Danh sách chuyên mục bài viết</CardTitle>
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
            <DataTable columns={postCatalogueColumns} data={safePostCatalogues} />
          )}
        </CardContent>
      </Card>
    </>
  )
}

export default PostCataloguePage
