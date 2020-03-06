'use strict'

const Users = use("App/Models/User");

class UserController {
    async store({ request }) {
        const user = Users.create(request.all());

        return user
    }
}

module.exports = UserController
