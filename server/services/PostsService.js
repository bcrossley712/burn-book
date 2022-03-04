import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"

class PostsService {

  async getAll(query = {}) {
    const posts = await dbContext.Posts.find(query)
    return posts
  }
  async getOne(id) {
    const post = await dbContext.Posts.findById(id)
    return post
  }
  async create(body) {
    const post = await dbContext.Posts.create(body)
    return post
  }
  async edit(id, update) {
    const original = await dbContext.Posts.findById(id)
    if (original.creatorId.toString() !== update.creatorId) {
      throw new Forbidden("not allowed to edit post")
    }
    original.imgUrl = update.imgUrl ? update.imgUrl : original.imgUrl
    original.description = update.description ? update.description : original.description

    await original.save()

    return original
  }
  async archive(postId, userId) {
    const original = await dbContext.Posts.findById(postId)
    if (original.creatorId.toString() !== userId) {
      throw new Forbidden("not allowed to delete post")
    }
    original.archive = !original.archive
    await original.save()
    return original
  }


}
export const postsService = new PostsService()