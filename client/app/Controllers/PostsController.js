import { ProxyState } from "../AppState.js"
import { postsService } from "../Services/PostsService.js"
import { logger } from "../Utils/Logger.js"

async function _getAllPosts() {
    try {
        await postsService.getAllPosts()
    } catch (error) {
        logger.error(error.message)
    }
}

function _drawPosts() {
    let template = ""
    ProxyState.posts.forEach(p => template += p.Template)
    document.getElementById('posts').innerHTML = template
}

export class PostsController {


    constructor() {

        ProxyState.on("posts", _drawPosts)
        _getAllPosts()
    }

    async createPost() {
        try {
            window.event.preventDefault()
            let form = window.event.target
            let rawData = {
                // @ts-ignore
                imgUrl: form.imgUrl.value,
                // @ts-ignore
                description: form.description.value
            }
            await postsService.createPost(rawData)
            let modal = document.getElementById("create-post")
            // form.reset()

        } catch (error) {

        }
    }
    async deletePost(id) {
        try {
            await postsService.deletePost(id)
        } catch (error) {
            logger.error(error.message)
        }
    }

    async editPost(id) {
        try {
            let rawData = {}
            await postsService.editPost(id, rawData)
        } catch (error) {
            logger.error(error.message)
        }
    }

}