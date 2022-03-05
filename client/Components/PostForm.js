import { Post } from "../app/Models/Post.js";

export function getPostForm(post = {}) {
  const postData = new Post(post)
  return `
<form class="row p-2" onsubmit="app.postsController.handleSubmit('${postData.id}')">
            <h3 class="col-12">Create a Post</h3>

            <div class="mb-3 col-6">
              <label for="" class="form-label">ImgUrl</label>
              <input required type="text" class="form-control" name="imgUrl" id="imgUrl" aria-describedby="helpId"
                placeholder="Image Url" value="${postData.imgUrl}">

            </div>
            <div class="mb-3 col-12">
              <label for="" class="form-label">Description</label>
              <input maxlength="50" required type="text" class="form-control" name="description" id="description"
                aria-describedby="helpId" placeholder="Description..." value="${postData.description}">
            </div>
            <button class="btn btn-info col-3">Create Post</button>
          </form>
`
}