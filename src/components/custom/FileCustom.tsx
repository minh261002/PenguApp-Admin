import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

interface FileCustomProps {
  files: File[]
  setFiles: React.Dispatch<React.SetStateAction<File[]>>
  multiple?: boolean
  url?: string
}

const FileCustom = ({ files, setFiles, multiple = false, url }: FileCustomProps) => {
  const filePreview = url
    ? [
        {
          source: url,
          options: {
            type: 'remote'
          }
        } as any
      ]
    : []

  return (
    <FilePond
      files={files.length > 0 ? files : filePreview}
      onupdatefiles={(fileItems) => {
        const newFiles = fileItems.map((fileItem) => fileItem.file as File)
        setFiles(newFiles)
      }}
      allowImagePreview
      allowImageExifOrientation
      allowMultiple={multiple}
      maxFiles={multiple ? 5 : 1}
      labelIdle="Drag & Drop your files or <span class='filepond--label-action'>Browse</span>"
    />
  )
}

export default FileCustom
