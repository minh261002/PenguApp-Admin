import '@ckbox/components/dist/styles/ckbox.css'
import { CKBox } from '@ckbox/core'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Trash } from 'lucide-react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

type ImageMultipleProps = {
  setGalleryImages: React.Dispatch<React.SetStateAction<string[]>>
  Gallery: string[]
}
type ImageType = { url: string }

const ItemType = {
  IMAGE: 'image'
}

interface DraggableImageProps {
  image: string
  index: number
  moveImage: (fromIndex: number, toIndex: number) => void
  onDelete: () => void
}

const DraggableImage: React.FC<DraggableImageProps> = ({ image, index, moveImage, onDelete }) => {
  const [, ref] = useDrag({
    type: ItemType.IMAGE,
    item: { index }
  })

  const [, drop] = useDrop({
    accept: ItemType.IMAGE,
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveImage(item.index, index)
        item.index = index
      }
    }
  })
  return (
    <div ref={(node) => ref(drop(node))} className='relative w-full h-64 bg-gray-200 rounded-lg'>
      <img className='w-full h-full object-cover rounded-lg' src={image} alt={`Image ${index}`} />
      <div className='absolute top-2 right-2 bg-red-500 p-1 rounded-md'>
        <Trash className='w-4 h-4 text-white cursor-pointer' onClick={onDelete} />
      </div>
    </div>
  )
}

const ImageMultiple: React.FC<ImageMultipleProps> = ({ setGalleryImages, Gallery }) => {
  const [open, setOpen] = useState<boolean>(false)
  const url = import.meta.env.VITE_CKBOX_LICENSE_KEY as string

  const moveImage = (fromIndex: number, toIndex: number) => {
    const updatedImages = [...Gallery]
    const [movedImage] = updatedImages.splice(fromIndex, 1)
    updatedImages.splice(toIndex, 0, movedImage)
    return setGalleryImages(updatedImages)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Card className='mt-5'>
        <CardHeader className='border-b mb-4'>
          <CardTitle className='flex items-center justify-between'>
            Thư viện ảnh
            <span className='font-light text-sm text-blue-600 cursor-pointer' onClick={() => setOpen(true)}>
              Tải lên
            </span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className='flex items-center justify-start w-full'>
            {Gallery.length === 0 ? (
              <label
                onClick={() => setOpen(true)}
                htmlFor='dropzone-file'
                className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50'
              >
                <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                  <img className='mx-auto w-32' src='/empty.png' alt='no data' />
                  <p className='mb-2 text-sm text-gray-500'>
                    <span className='font-semibold'>Chọn ảnh từ hệ thống</span> hoặc kéo thả vào đây
                  </p>
                  <p className='text-xs text-gray-400'>(Hỗ trợ tất cả các định dạng ảnh)</p>
                </div>
              </label>
            ) : (
              <div className='grid grid-cols-3 gap-4'>
                {Gallery.map((image, index) => (
                  <DraggableImage
                    key={index}
                    image={image}
                    index={index}
                    moveImage={moveImage}
                    onDelete={() => setGalleryImages((prev) => prev.filter((_, i) => i !== index))}
                  />
                ))}
              </div>
            )}
          </div>

          <CKBox
            dialog={{
              open: open,
              width: '100%',
              onClose: () => setOpen(false)
            }}
            assets={{
              onChoose: (assets: any) => {
                setGalleryImages((prev) => [...prev, ...assets.map(({ data }: { data: ImageType }) => data.url)])
                setOpen(false)
              }
            }}
            tokenUrl={url}
            theme=''
          />
        </CardContent>
      </Card>
    </DndProvider>
  )
}

export default ImageMultiple
