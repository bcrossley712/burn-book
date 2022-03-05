import { Comment } from "../app/Models/Comment.js";

export function getCommentForm(postId) {
  return `
  <form action="" onsubmit="app.commentsController.handleSubmit('${postId}')">
        <div class="mb-3 col-12">
          <label for="" class="form-label">Description</label>
          <input maxlength="50" required type="text" class="form-control" name="description" id="description"
            aria-describedby="helpId" placeholder="Description..." value="">
        </div>
        <button class="btn btn-success">Post</button>
      </form>
  
  
  `
}