// controllers/favoritesController.js
const pool = require("../db");

exports.getFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    const favorites = await pool.query(
      "SELECT * FROM favorites WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );

    res.json(favorites.rows.map(fav => fav.recipe_data));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.addFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { recipe } = req.body;

    await pool.query(
      `INSERT INTO favorites (user_id, recipe_data)
       VALUES ($1, $2)
       ON CONFLICT (user_id, (recipe_data->>'id'))
       DO NOTHING`,
      [userId, JSON.stringify(recipe)]
    );

    res.status(201).json({ message: "Recipe added to favorites" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { recipeId } = req.params;

    const deletedFavorite = await pool.query(
      "DELETE FROM favorites WHERE user_id = $1 AND recipe_data->>'id' = $2 RETURNING *",
      [userId, recipeId]
    );

    if (deletedFavorite.rows.length === 0) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    res.json({ message: "Recipe removed from favorites" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};