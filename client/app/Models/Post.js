export class Post {
  constructor(data) {
    this.imgUrl = data.imgUrl,
      this.description = data.description,
      this.id = data.id
  }

  get Template() {
    return `
    <div class="m-3">
    <i class="mdi mdi-delete selectable" title="Delete" onclick="app.postsController.deletePost('${this.id}')"></i>
    <i class="mdi mdi-account-edit" title="Edit" data-bs-toggle="modal" data-bs-target="#create-post" onclick="app.postsController.editPost('${this.id}')"></i>
    <img class="img-fluid rounded-top"
      src=${this.imgUrl}
      alt="post image">
    <div class="p-3">
      <p class="small-text">${this.description}</p>
    </div>
    <button class="btn btn-outline-danger d-grid" onclick="app.carsController.dislikePost('${this.id}')"> Ew
      Gross </button>
    </div>
      `
  }
}