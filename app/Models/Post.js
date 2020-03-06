'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {

    static get hidden() {
        return ['created_at', 'updated_at']
    }

    user() {
        return this.belongsTo('App/Models/User');
    }
}

module.exports = Post
