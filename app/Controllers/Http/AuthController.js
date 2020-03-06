"use strict";
const Users = use("App/Models/User");

class AuthController {
    async register({ request }) {
        const data = request.only(["email", "password", "name"]);

        const user = await Users.create(data);

        return user;
    }

    async authenticate({ request, auth }) {
        const { email, password } = request.all();

        const jwt = await auth.attempt(email, password);

        return jwt;
    }

    async getUser({ auth }) {
        try {
            return await auth.getUser();
        } catch (erro) {
            console.log(erro);
            const error = {
                erro: true,
                message: "Token inválido, ou não encontrado",
                logTrace: erro
            };
            return error;
        }
    }
}

module.exports = AuthController;