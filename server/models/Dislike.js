import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const DislikeSchema = new Schema({
  dislike: { type: Boolean },
  creatorId: { type: ObjectId, ref: 'Profile', required: true },
  postId: { type: ObjectId, ref: 'Post', required: true }
},
  { timestamps: true, toJSON: { virtuals: true } }
)

DislikeSchema.virtual('post', {
  localField: 'postId',
  foreignField: '_id',
  ref: 'Post',
  justOne: true
})
