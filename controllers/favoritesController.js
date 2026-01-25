const youtubeService = require("../services/youtubeService");
const favoritesRepo = require("../repositories/favoritesRepository");

class FavoritesController {
    async showFavorites(req, res) {
        const userId = req.session.user.id;

        const favorites = await favoritesRepo.getByUserId(userId);

        res.render("favorites", {
            videos: [],
            favorites,
            query: ""
        });
    }

    async search(req, res) {
        const userId = req.session.user.id;
        const query = req.body.query;

        const videos = await youtubeService.search(query);
        const favorites = await favoritesRepo.getByUserId(userId);

        res.render("favorites", {
            videos,
            favorites,
            query
        });
    }

    async addFavorite(req, res) {
        const userId = req.session.user.id;
        const { videoId, title, thumbnail } = req.body;

        await favoritesRepo.add({
            userId,
            videoId,
            title,
            thumbnail
        });

        res.redirect("/favorites");
    }

    async removeFavorite(req, res) {
        const userId = req.session.user.id;
        const { videoId } = req.body;

        await favoritesRepo.remove({ userId, videoId });

        res.redirect("/favorites");
    }
}

module.exports = new FavoritesController();
