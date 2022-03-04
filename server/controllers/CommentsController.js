import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService";
import BaseController from "../utils/BaseController";

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
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
      const comments = await commentsService.getAll(req.query)
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }
  async getOne(req, res, next) {
    try {
      const comment = await commentsService.getOne(req.params.id)
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }
  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const comment = await commentsService.create(req.body)
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }
  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const update = await commentsService.edit(req.params.id, req.body)
      return res.send(update)
    } catch (error) {
      next(error)
    }
  }
  async archive(req, res, next) {
    try {
      const commentId = req.params.id
      const userId = req.userInfo.id
      const message = await commentsService.archive(commentId, userId)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }
}