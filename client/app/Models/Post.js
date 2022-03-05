import { ProxyState } from "../AppState.js"
import { logger } from "../Utils/Logger.js"

export class Post {
  constructor(data) {
    this.imgUrl = data.imgUrl || ''
    this.description = data.description || ''
    this.id = data.id || ''
  }

  get Template() {
    return `
    <div class="m-3">
    <i class="mdi mdi-delete selectable" title="Delete" onclick="app.postsController.deletePost('${this.id}')"></i>
    <i class="mdi mdi-account-edit" title="Edit" onclick="app.postsController.editPost('${this.id}')"></i>
    <img class="img-fluid rounded-top"
      src=${this.imgUrl}
      alt="post image">
    <div class="p-3">
      <p class="small-text">${this.description}</p>
    </div>
    <button class="btn btn-outline-danger d-grid" onclick="app.carsController.dislikePost('${this.id}')"> Ew
      Gross </button>
    <button class="btn btn-info" onclick="app.commentsController.createComment('${this.id}')">Create Comment</button>
      ${this.commentTemplate}
    </div>
    
      `
  }

  get commentTemplate() {
    let template = ""
    const myComments = ProxyState.comments.filter(c => c.postId == this.id)
    myComments.forEach(t => template += t.Template)
    logger.log(template)
    return template
  }
}