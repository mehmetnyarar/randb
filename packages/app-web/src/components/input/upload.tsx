import {
  FileType,
  FileUploadLimit,
  getFileUploadAccept,
  getFileUploadFormats
} from '@app/logic'
import { Theme } from '@app/ui'
import { get } from 'lodash'
import React, {
  ChangeEvent,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState
} from 'react'
import { useTranslation } from '~/i18n'
import { getUrl } from '~/utility'
import { DangerButton, PrimaryButton } from '../button'
import { Image } from '../image'

interface Props {
  id?: string
  value?: FileType
  onChange: (file?: File) => void
  limit?: FileUploadLimit
  preview?: 'image' | 'video' | 'document'
  error?: any
}

/**
 * File upload.
 */
export const FileUpload: React.FC<Props> = props => {
  const { t } = useTranslation()
  const { palette } = useContext(Theme)

  const { id = 'file-upload', value, onChange, limit, preview } = props
  const {
    size: { bytes }
  } = limit

  const [error, setError] = useState('')
  const url = useMemo(() => (value ? getUrl(value) : ''), [value])
  const input = useRef<HTMLInputElement>(null)
  const accept = useMemo(() => getFileUploadAccept(limit), [limit])
  const formats = useMemo(() => getFileUploadFormats(limit), [limit])

  const handleBrowse = useCallback(() => input.current?.click(), [])
  const handleDelete = useCallback(() => onChange(), [onChange])
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let file: File | null = null

      const { files } = e.target
      if (files) {
        file = files.item(0)
        if (file && file.size > bytes) {
          setError(t('upload.limit.error.size'))
        }
      }

      onChange(file)
    },
    [t, bytes, onChange]
  )

  return (
    <>
      <section className='file-upload'>
        <div className='file-upload-actions'>
          {value ? (
            <DangerButton width={150} onClick={handleDelete}>
              {t('delete')}
            </DangerButton>
          ) : (
            <PrimaryButton width={150} onClick={handleBrowse}>
              {t('browse')}
            </PrimaryButton>
          )}
        </div>

        {!value && limit && (
          <div className='file-upload-limit'>
            <span>{t('upload.limit.size', { size: limit.size.mb })}</span>
            <span>{t('upload.limit.type', { formats })}</span>
          </div>
        )}

        <input
          id={id}
          ref={input}
          type='file'
          accept={accept}
          onChange={handleChange}
          hidden
        />

        {error && <p className='error'>{error}</p>}
        {value && preview && (
          <aside className='preview'>
            <h4>{t('preview')}</h4>
            <span>{get(value, 'name')}</span>
            <span>{get(value, 'size')}</span>
            {preview === 'image' && <Image src={url} />}
          </aside>
        )}
      </section>

      <style jsx>
        {`
          .file-upload,
          .file-upload-limit,
          .preview {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
          }

          .file-upload-actions {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
          }

          .file-upload-limit {
            font-size: 12px;
            margin-top: 16px;
          }

          .error {
            color: ${palette['text-danger-color']};
            font-size: 12px;
          }

          .preview {
            padding: 16px;
            margin-top: 16px;
            border-radius: 4px;
            border: 1px solid ${palette['border-basic-color-3']};
          }
          .preview h4 {
            margin-bottom: 8px;
          }
        `}
      </style>
    </>
  )
}
