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
}

const FileCustom = ({ files, setFiles, multiple = false }: FileCustomProps) => {
  return (
    <div>
      <FilePond
        files={files}
        onupdatefiles={(fileItems) => {
          const newFiles = fileItems.map((fileItem) => fileItem.file as File)
          setFiles(newFiles as File[])
        }}
        allowMultiple={multiple}
        maxFiles={multiple ? 5 : 1}
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        allowImagePreview
        allowImageExifOrientation
      />
    </div>
  )
}

export default FileCustom
