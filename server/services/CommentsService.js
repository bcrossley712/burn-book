import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"

class CommentsService {
  async getAll(query = {}) {
    const comments = await dbContext.Comments.find(query)
    return comments
  }
  async getOne(id) {
    const comment = await dbContext.Comments.findById(id)
    return comment
  }
  async create(body) {
    const comment = await dbContext.Comments.create(body)
    return comment
  }
  async edit(commentId, update) {
    const original = await dbContext.Comments.findById(commentId)
    if (original.creatorId.toString() !== update.creatorId) {
      throw new Forbidden('No soup for you!')
    }
    original.description = update.description ? update.description : original.description
    await original.save()
    return original
  }
  async archive(commentId, userId) {
    const original = await dbContext.Comments.findById(commentId)
    if (original.creatorId.toString() !== userId) {
      throw new Forbidden('No soup for you!')
    }
    original.archive = !original.archive
    await original.save()
    return original
  }

}

export const commentsService = new CommentsService()