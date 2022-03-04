import { Auth0Provider } from "@bcwdev/auth0provider";
import { postsService } from "../services/PostsService";
import BaseController from "../utils/BaseController";

export class PostsController extends BaseController {
  constructor() {
    super('api/posts')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getOne)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.archive)

  }
  async getAll(req, res, next) {
    try {
      const posts = await postsService.getAll(req.query)
      return res.send(posts)
    } catch (error) {
      next(error)
    }
  }
  async getOne(req, res, next) {
    try {
      const post = await postsService.getOne(req.params.id)
      return res.send(post)
    } catch (error) {
      next(error)
    }
  }
  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const create = await postsService.create(req.body)
      return res.send(create)
    } catch (error) {
      next(error)
    }
  }
  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const edit = await postsService.edit(req.params.id, req.body)
      return res.send(edit)
    } catch (error) {
      next(error)
    }
  }
  async archive(req, res, next) {
    try {
      const userId = req.userInfo.id
      const postId = req.params.id
      const message = await postsService.archive(postId, userId)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }






}