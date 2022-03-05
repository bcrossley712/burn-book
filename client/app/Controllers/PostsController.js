import { getPostForm } from "../../Components/PostForm.js"
import { ProxyState } from "../AppState.js"
import { postsService } from "../Services/PostsService.js"
import { logger } from "../Utils/Logger.js"
import { Pop } from "../Utils/Pop.js"

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
        ProxyState.on("comments", _drawPosts)
        _getAllPosts()
        document.getElementById('modal-body-slot').innerHTML = getPostForm()
    }

    async handleSubmit(id) {
        try {
            window.event.preventDefault()
            let form = window.event.target
            let rawData = {
                // @ts-ignore
                imgUrl: form.imgUrl.value,
                // @ts-ignore
                description: form.description.value
            }
            if (!id) {
                await postsService.createPost(rawData)
                logger.log('create post to service')

            } else {
                await postsService.editPost(id, rawData)
            }
            let modal = document.getElementById("create-post")
            // @ts-ignore
            form.reset()
            // @ts-ignore
            bootstrap.Modal.getOrCreateInstance(modal).hide()

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

    editPost(id) {
        const post = ProxyState.posts.find(p => p.id == id)
        document.getElementById('modal-body-slot').innerHTML = getPostForm(post)
        let modal = document.getElementById('create-post')
        // @ts-ignore
        bootstrap.Modal.getOrCreateInstance(modal).toggle()
    }

}