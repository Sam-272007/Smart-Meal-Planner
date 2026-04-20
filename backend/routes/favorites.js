// routes/favorites.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getFavorites,
  addFavorite,
  removeFavorite
} = require("../controllers/favoritesController");

// All routes require authentication
router.use(auth);

// GET /api/favorites
router.get("/", getFavorites);

// POST /api/favorites
router.post("/", addFavorite);

// DELETE /api/favorites/:recipeId
router.delete("/:recipeId", removeFavorite);

module.exports = router;