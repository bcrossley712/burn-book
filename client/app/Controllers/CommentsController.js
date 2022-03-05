import { getCommentForm } from "../../Components/CommentForm.js";
import { ProxyState } from "../AppState.js";
import { commentsService } from "../Services/CommentsService.js";
import { logger } from "../Utils/Logger.js";

async function _getAllComments() {
  try {
    await commentsService.getAllComments()
  } catch (error) {
    logger.error(error.message)
  }
}

function _drawComments() {
  let template = ""
  ProxyState.comments.forEach(c => template += c.Template)
  document.getElementById("comments").innerHTML = template
}
export class CommentsController {
  constructor() {
    // ProxyState.on('comments', _drawComments)
    _getAllComments()
  }

  async handleSubmit(id) {
    try {
      window.event.preventDefault()
      let form = window.event.target
      console.log(form)
      let rawData = {
        // @ts-ignore
        description: form.description.value,
        postId: id
      }

      await commentsService.createComment(rawData)

      form.reset()
    } catch (error) {

    }
  }

  async createComment(id) {
    document.getElementById('modal-body-slot').innerHTML = getCommentForm(id)
    let modal = document.getElementById('create-post')
    // @ts-ignore
    bootstrap.Modal.getOrCreateInstance(modal).toggle()
  }
}
