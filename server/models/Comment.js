import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId
export const CommentSchema = new Schema({
  description: { type: String, required: true },
  archive: { type: Boolean, default: false },
  creatorId: { type: ObjectId, ref: 'Profile', required: true },
  postId: { type: ObjectId, ref: 'Post', required: true }
},
  { timestamps: true, toJSON: { virtuals: true } }
)

CommentSchema.virtual('post', {
  localField: 'postId',
  foreignField: '_id',
  ref: 'Post',
  justOne: true
})