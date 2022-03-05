export class Post {
  constructor(data) {
    this.imgUrl = data.imgUrl,
      this.description = data.description,
      this.id = data.creatorId
  }

  get Template() {
    return `
    <img class="img-fluid rounded-top"
      src=${this.imgUrl}
      alt="post image">
    <div class="p-3">
      <p class="small-text">${this.description}</p>
    </div>
    <button class="btn btn-outline-danger d-grid" onclick="app.carsController.dislikePost('${this.id}')"> Ew
      Gross </button>`
  }
}