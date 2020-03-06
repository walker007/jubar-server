'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post("/authenticate", "AuthController.authenticate");
Route.get("getPostPicture/:filename", "MediaController.showPostPicture");
Route.get("/getuserinfo", "AuthController.getUser");

Route.group(() => {
    Route.resource("posts", "PostController")
        .apiOnly()
        .except(["destroy"]);
    Route.post('posts/:id/uploadBanner', "PostController.Banner");

}).middleware("auth");
