import { ProxyState } from "../AppState.js"
import { Post } from "../Models/Post.js"
import { logger } from "../Utils/Logger.js"
import { api } from "./AxiosService.js"

class PostsService {

  async getAllPosts() {
    const res = await api.get('api/posts')
    logger.log("POSTS", res.data)
    const posts = res.data.map(p => new Post(p))
    ProxyState.posts = posts
  }
  async createPost(rawData) {
    const res = await api.post('api/posts', rawData)
    logger.log(res.data)
    const post = new Post(res.data)
    ProxyState.posts = [post, ...ProxyState.posts]
  }
}

export const postsService = new PostsService()