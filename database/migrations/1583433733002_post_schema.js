'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostSchema extends Schema {
    up() {
        this.create('posts', (table) => {
            table.increments()
            table.string('title')
            table.string('cover')
            table.string('slug')
            table.text('post')
            table.integer('status').default(0)
            table.integer('user_id').unsigned().references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table.timestamps()
        })
    }

    down() {
        this.drop('posts')
    }
}

module.exports = PostSchema
