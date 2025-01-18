import { useState, useEffect, useRef } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'

import {
  ClassicEditor,
  AccessibilityHelp,
  Autoformat,
  AutoImage,
  Autosave,
  BlockQuote,
  Bold,
  CKBox,
  CKBoxImageEdit,
  CloudServices,
  Code,
  CodeBlock,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  FullPage,
  GeneralHtmlSupport,
  Heading,
  Highlight,
  HtmlComment,
  HtmlEmbed,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  MediaEmbed,
  Paragraph,
  PasteFromOffice,
  PictureEditing,
  RemoveFormat,
  SelectAll,
  ShowBlocks,
  SourceEditing,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextPartLanguage,
  TextTransformation,
  TodoList,
  Underline,
  Undo
} from 'ckeditor5'

import 'ckeditor5/ckeditor5.css'

type Props = {
  setValue: (value: string) => void
  data?: string
}

const TextareaCustom = ({ setValue, data }: Props) => {
  const CKBOX_TOKEN_URL = import.meta.env.VITE_CKBOX_LICENSE_KEY

  const editorContainerRef = useRef(null)
  const editorRef = useRef(null)
  const [isLayoutReady, setIsLayoutReady] = useState(false)

  useEffect(() => {
    setIsLayoutReady(true)

    return () => setIsLayoutReady(false)
  }, [])

  return (
    <div>
      <div className='main-container'>
        <div className='editor-container editor-container_classic-editor' ref={editorContainerRef}>
          <div className='editor-container__editor'>
            <div ref={editorRef}>
              {isLayoutReady && (
                <CKEditor
                  onChange={(_, editor) => {
                    const data = editor.getData()
                    setValue(data)
                  }}
                  data={data || ''}
                  editor={ClassicEditor}
                  config={{
                    licenseKey: import.meta.env.VITE_CKEDITOR_LICENSE_KEY,
                    toolbar: {
                      items: [
                        'undo',
                        'redo',
                        '|',
                        'sourceEditing',
                        'showBlocks',
                        'textPartLanguage',
                        '|',
                        'heading',
                        '|',
                        'fontSize',
                        'fontFamily',
                        'fontColor',
                        'fontBackgroundColor',
                        '|',
                        'bold',
                        'italic',
                        'underline',
                        'strikethrough',
                        'subscript',
                        'superscript',
                        'code',
                        'removeFormat',
                        '|',
                        'specialCharacters',
                        'link',
                        'insertImage',
                        'ckbox',
                        'mediaEmbed',
                        'insertTable',
                        'highlight',
                        'blockQuote',
                        'codeBlock',
                        'htmlEmbed',
                        '|',
                        'bulletedList',
                        'numberedList',
                        'todoList',
                        'outdent',
                        'indent'
                      ],
                      shouldNotGroupWhenFull: true
                    },
                    plugins: [
                      AccessibilityHelp,
                      Autoformat,
                      AutoImage,
                      Autosave,
                      BlockQuote,
                      Bold,
                      CKBox,
                      CKBoxImageEdit,
                      CloudServices,
                      Code,
                      CodeBlock,
                      Essentials,
                      FontBackgroundColor,
                      FontColor,
                      FontFamily,
                      FontSize,
                      FullPage,
                      GeneralHtmlSupport,
                      Heading,
                      Highlight,
                      HtmlComment,
                      HtmlEmbed,
                      ImageBlock,
                      ImageCaption,
                      ImageInline,
                      ImageInsert,
                      ImageInsertViaUrl,
                      ImageResize,
                      ImageStyle,
                      ImageTextAlternative,
                      ImageToolbar,
                      ImageUpload,
                      Indent,
                      IndentBlock,
                      Italic,
                      Link,
                      LinkImage,
                      List,
                      ListProperties,
                      MediaEmbed,
                      Paragraph,
                      PasteFromOffice,
                      PictureEditing,
                      RemoveFormat,
                      SelectAll,
                      ShowBlocks,
                      SourceEditing,
                      SpecialCharacters,
                      SpecialCharactersArrows,
                      SpecialCharactersCurrency,
                      SpecialCharactersEssentials,
                      SpecialCharactersLatin,
                      SpecialCharactersMathematical,
                      SpecialCharactersText,
                      Strikethrough,
                      Subscript,
                      Superscript,
                      Table,
                      TableCaption,
                      TableCellProperties,
                      TableColumnResize,
                      TableProperties,
                      TableToolbar,
                      TextPartLanguage,
                      TextTransformation,
                      TodoList,
                      Underline,
                      Undo
                    ],
                    ckbox: {
                      tokenUrl: CKBOX_TOKEN_URL
                    },
                    fontFamily: {
                      supportAllValues: true
                    },
                    fontSize: {
                      options: [10, 12, 14, 'default', 18, 20, 22],
                      supportAllValues: true
                    },
                    heading: {
                      options: [
                        {
                          model: 'paragraph',
                          title: 'Paragraph',
                          class: 'ck-heading_paragraph'
                        },
                        {
                          model: 'heading1',
                          view: 'h1',
                          title: 'Heading 1',
                          class: 'ck-heading_heading1'
                        },
                        {
                          model: 'heading2',
                          view: 'h2',
                          title: 'Heading 2',
                          class: 'ck-heading_heading2'
                        },
                        {
                          model: 'heading3',
                          view: 'h3',
                          title: 'Heading 3',
                          class: 'ck-heading_heading3'
                        },
                        {
                          model: 'heading4',
                          view: 'h4',
                          title: 'Heading 4',
                          class: 'ck-heading_heading4'
                        },
                        {
                          model: 'heading5',
                          view: 'h5',
                          title: 'Heading 5',
                          class: 'ck-heading_heading5'
                        },
                        {
                          model: 'heading6',
                          view: 'h6',
                          title: 'Heading 6',
                          class: 'ck-heading_heading6'
                        }
                      ]
                    },
                    htmlSupport: {
                      allow: [
                        {
                          name: /^.*$/,
                          styles: true,
                          attributes: true,
                          classes: true
                        }
                      ]
                    },
                    image: {
                      toolbar: [
                        'toggleImageCaption',
                        'imageTextAlternative',
                        '|',
                        'imageStyle:inline',
                        'imageStyle:wrapText',
                        'imageStyle:breakText',
                        '|',
                        'resizeImage',
                        '|',
                        'ckboxImageEdit'
                      ]
                    },
                    link: {
                      addTargetToExternalLinks: true,
                      defaultProtocol: 'https://',
                      decorators: {
                        toggleDownloadable: {
                          mode: 'manual',
                          label: 'Downloadable',
                          attributes: {
                            download: 'file'
                          }
                        }
                      }
                    },
                    list: {
                      properties: {
                        styles: true,
                        startIndex: true,
                        reversed: true
                      }
                    },
                    table: {
                      contentToolbar: [
                        'tableColumn',
                        'tableRow',
                        'mergeTableCells',
                        'tableProperties',
                        'tableCellProperties'
                      ]
                    }
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TextareaCustom
