import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"


class DislikesService {
  async getAll(query = {}) {
    const dislikes = await dbContext.Dislikes.find(query).populate('post')
    return dislikes
  }
  async create(body) {
    const dislike = await dbContext.Dislikes.create(body)
    await dislike.populate('post')
    return dislike
  }

  async edit(dislikeId, body) {
    const original = await dbContext.Dislikes.findById(dislikeId)
    if (original.creatorId.toString() !== body.creatorId) {
      throw new Forbidden('naughty naughty')
    }
    original.dislike = body.dislike != null ? body.dislike : original.dislike
    original.save()
    return original
  }
  async remove(userId, dislikeId) {
    const original = await dbContext.Dislikes.findById(dislikeId)
    if (original.creatorId.toString() !== userId) {
      throw new Forbidden('You disgust me')
    }
    original.dislike = null
    original.save()
    return original
  }
}

export const dislikesService = new DislikesService()