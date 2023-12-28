import { model, Schema, Document } from 'mongoose'

export interface AlbumDocument extends Document {
  title: string
  path: string
  is_deleted: boolean
}

const AlbumSchema = new Schema<AlbumDocument>({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  path: {
    type: String,
    unique: true,
    required: true,
    maxlength: 255
  },
  is_deleted: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true
})

export const Album = model<AlbumDocument>('Album', AlbumSchema)