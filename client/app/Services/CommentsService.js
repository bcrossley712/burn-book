import { ProxyState } from "../AppState.js"
import { Comment } from "../Models/Comment.js"
import { logger } from "../Utils/Logger.js"
import { api } from "./AxiosService.js"

class CommentsService {
  async createComment(rawData) {
    const res = await api.post('api/comments', rawData)
    logger.log(res.data)
    ProxyState.comments = [...ProxyState.comments, new Comment(res.data)]
  }

  async getAllComments() {
    const res = await api.get('api/comments')
    const comments = res.data.map(c => new Comment(c))
    ProxyState.comments = comments
    logger.log(ProxyState.comments)
  }



}

export const commentsService = new CommentsService()