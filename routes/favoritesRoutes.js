const express = require("express");
const router = express.Router();
const favoritesController = require("../controllers/favoritesController");
const requireAuth = require("../middleware/requireAuth");

// show favorites page
router.get("/favorites", requireAuth, (req, res) =>
    favoritesController.showFavorites(req, res)
);

// search YouTube
router.post("/favorites/search", requireAuth, (req, res) =>
    favoritesController.search(req, res)
);

// add favorite
router.post("/favorites/add", requireAuth, (req, res) =>
    favoritesController.addFavorite(req, res)
);

// remove favorite
router.post("/favorites/remove", requireAuth, (req, res) =>
    favoritesController.removeFavorite(req, res)
);

module.exports = router;
