'use strict'

const Users = use("App/Models/User");
const Posts = use("App/Models/Post");
const Helpers = use('Helpers');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with posts
 */
class PostController {
    /**
     * Show a list of all posts.
     * GET posts
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index() {
        const posts = Posts.query();

        return posts.with('user').fetch();

    }

    /**
     * Render a form to be used for creating a new post.
     * GET posts/create
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async create({ request, response }) {

    }

    /**
     * Create/save a new post.
     * POST posts
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, auth }) {
        const user = await auth.getUser();
        const user_id = user.id;


        const data = request.all()

        const postCreated = await Posts.create({...data, user_id });

        return postCreated;
    }

    /**
     * Display a single post.
     * GET posts/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params }) {
        const Post = await Posts.find(params.id);

        return Post;
    }

    /**
     * Render a form to update an existing post.
     * GET posts/:id/edit
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async edit({ params, request, response, view }) {}

    /**
     * Update post details.
     * PUT or PATCH posts/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request }) {
        const Post = await Posts.find(params.id);

        const data = request.all();

        Post.merge(data)

        await Post.save()

        return Post;
    }

    async Banner({ params, request }) {
        const images = request.file('image', {
            types: ['image'],
            size: '2mb'
        });

        const name = await this.uploadImage(images, params.id);

        return { name };

    }

    uploadImage = async(image, id) => {
        const name = `${Date.now()}.${image.extname}`;

        await image.move(Helpers.tmpPath("uploads"), { name });

        if (!image.moved()) {
            return image.error();
        }

        await Posts.query()
            .where("id", id)
            .update({ cover: name });

        return name;
    };


    /**
     * Delete a post with id.
     * DELETE posts/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, request, response }) {}
}

module.exports = PostController
