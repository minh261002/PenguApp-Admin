import '@ckbox/components/dist/styles/ckbox.css'

import { CKBox } from '@ckbox/core'
import { useState } from 'react'

type ImageCustomProps = {
  setCreateFile?: (url: string) => void
  image?: string | string[]
  mobileImage?: string
  setMobileImage?: (url: string) => void
  type?: string
  clasName?: string
}

const ImageCustom = ({ setCreateFile, image, setMobileImage, mobileImage, type, clasName }: ImageCustomProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const url = import.meta.env.VITE_CKBOX_LICENSE_KEY

  return (
    <div className='z-1'>
      <div
        className='relative w-full h-full cursor-pointer'
        onClick={() => {
          setOpen(true)
        }}
      >
        {image ? (
          <img src={Array.isArray(image) ? image[0] : image} alt='image' className='w-full h-auto object-cover' />
        ) : (
          type !== 'mobile' && (
            <div className='border-dashed border-2 border-gray-300 h-auto p-4 flex items-center justify-center'>
              <span className='text-gray-500'>Chọn ảnh</span>
            </div>
          )
        )}

        {type === 'mobile' && (
          <div className='absolute w-full top-0 right-0 bg-white '>
            {mobileImage ? (
              <img src={mobileImage} alt='mobile' className={`w-full h-auto object-cover ${clasName}`} />
            ) : (
              <div className='border-dashed border-2 border-gray-300 h-auto p-4 flex items-center justify-center'>
                <span className='text-gray-500'>Chọn ảnh</span>
              </div>
            )}
          </div>
        )}
      </div>

      <CKBox
        dialog={{
          open: open,
          width: '100%',
          onClose: () => {
            setOpen(false)
          }
        }}
        assets={{
          onChoose: (assets: any) => {
            assets.forEach(({ data }: { data: { url: string } }) => {
              if (type === 'mobile') {
                setMobileImage && setMobileImage(data?.url as string)
              } else {
                setCreateFile && setCreateFile(data?.url as string)
              }

              setOpen(false)
            })
          }
        }}
        tokenUrl={url}
      />
    </div>
  )
}

export default ImageCustom
