import { ProxyState } from "../AppState.js"
import { Post } from "../Models/Post.js"
import { logger } from "../Utils/Logger.js"
import { api } from "./AxiosService.js"

class PostsService {


  async getAllPosts() {
    const res = await api.get('api/posts')
    logger.log("POSTS", res.data)
    const posts = res.data.map(p => new Post(p))
    posts.reverse()
    ProxyState.posts = posts
  }
  async createPost(rawData) {
    const res = await api.post('api/posts', rawData)
    logger.log("Create", res.data)
    const post = new Post(res.data)
    ProxyState.posts = [post, ...ProxyState.posts]
  }

  //TODO only non-archives should populate to page
  async deletePost(id) {
    const res = await api.delete('api/posts/' + id)

    logger.log("delete", res.data)
    ProxyState.posts = ProxyState.posts.filter(p => p.id !== id)
  }

  async editPost(id, data) {
    const res = await api.put('api/posts/' + id, data)
    logger.log("editing the post", res.data)
    let postIndex = ProxyState.posts.findIndex(p => p.id == id)
    ProxyState.posts.splice(postIndex, 1, new Post(res.data))
    ProxyState.posts = ProxyState.posts
  }
}

export const postsService = new PostsService()