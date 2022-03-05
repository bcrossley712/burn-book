import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
export const PostSchema = new Schema(
  {
    imgUrl: { type: String },
    description: { type: String, required: true },
    archive: { type: Boolean, default: false },
    dislikeCount: { type: Number },
    likeCount: { type: Number },
    creatorId: { type: ObjectId, required: true, ref: 'Profile' }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)