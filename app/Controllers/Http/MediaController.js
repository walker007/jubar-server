"use strict";

const Helpers = use("Helpers");

class MediaController {
    async showPostPicture({ params, response }) {
        return response.download(Helpers.tmpPath(`uploads/${params.filename}`));
    }
}

module.exports = MediaController;
