import { Auth0Provider } from "@bcwdev/auth0provider";
import { dislikesService } from "../services/DislikesService";
import BaseController from "../utils/BaseController";

export class DislikesController extends BaseController {
  constructor() {
    super('api/dislikes')
    this.router
      .get('', this.getAll)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.remove)

  }
  async getAll(req, res, next) {
    try {
      const dislikes = await dislikesService.getAll(req.query)
      return res.send(dislikes)
    } catch (error) {
      next(error)
    }
  }
  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const dislike = await dislikesService.create(req.body)
      return res.send(dislike)
    } catch (error) {
      next(error)
    }
  }
  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const dislikeId = req.params.id
      const update = await dislikesService.edit(dislikeId, req.body)
      return res.send(update)
    } catch (error) {
      next(error)
    }
  }
  async remove(req, res, next) {
    try {
      const userId = req.userInfo.id
      const dislikeId = req.params.id
      const message = await dislikesService.remove(userId, dislikeId)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }
}