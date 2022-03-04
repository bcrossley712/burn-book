import { dbContext } from "../db/DbContext"

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
  async edit(id, body) {
    return 'Need to do this'
  }
  async archive(commentId, userId) {
    return "Need to do"
  }

}

export const commentsService = new CommentsService()