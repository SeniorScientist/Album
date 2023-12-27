import { Link } from 'react-router-dom'
import Button from '../../components/button/button'
import Label from '../../components/label/label'
import MessageCard from '../../components/message-card/message-card'
import { useCallback, useState } from 'react'
import CloudinaryUploadWidget from '../../components/cloudinary-upload-widget/cloudinary-upload-widget'
import Input from '../../components/input/input'

export default function Upload() {
  const [loading, setLoading] = useState<boolean>(false)

  const handleUploadSuccess = useCallback((info: any) => {
    console.log('Upload success:', info)
  }, [])

  const handleUploadFailure = (error: any) => {
    console.error('Upload error:', error)
  }

  const pictureUploaderOptions = {
    clientAllowedFormats: ['jpg', 'jpeg', 'png', 'gif'], // allowed file formats
    resourceType: 'image', // resource type, either 'image' or 'video'
    cropping: true, // cropping is enabled
    croppingAspectRatio: 1, // square aspect ratio
    croppingShowDimensions: true, // show cropping dimensions
    croppingValidateDimensions: true, // validate image dimensions after cropping
    maxFileSize: 10000000, // max file size in bytes (10 MB)
    folder: 'images', // Cloudinary folder to upload to
    sources: ['local', 'url', 'camera', 'google_drive'], // upload sources, either 'local', 'url', 'camera' or 'google_drive'
  }

  return (
    <>
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm space-y-8">
          <Label>Photo Upload</Label>

          {/* <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}> */}

          {/* {errors.email && <MessageCard message={errors.email.message || ''} type={EMessageTypes.DANGER} />} */}
          <Input
            type="text"
            placeholder="Enter Album Name"
            required />
          <CloudinaryUploadWidget
            cloudName={import.meta.env.VITE_CLOUD_NAME}
            uploadPreset={import.meta.env.VITE_CLD_PRESET_NAME}
            buttonText="Choose Image"
            onUploadSuccess={handleUploadSuccess}
            onUploadFailure={handleUploadFailure}
            options={pictureUploaderOptions}
          />

          {/* </form> */}
        </div >
      </div >
    </>
  )
}