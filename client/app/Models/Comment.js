export class Comment {
  constructor(data) {
    this.id = data.id
    this.description = data.description
    this.postId = data.postId
  }

  get Template() {
    return `
    <h2>${this.description}</h2>
    `
  }
}