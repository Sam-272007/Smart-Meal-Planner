// controllers/pantryController.js
const pool = require("../db");

exports.getPantryItems = async (req, res) => {
  try {
    const userId = req.user.id;
    const pantryItems = await pool.query(
      "SELECT * FROM pantry_items WHERE user_id = $1 ORDER BY category, name",
      [userId]
    );

    res.json(pantryItems.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.addPantryItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, quantity, unit, category } = req.body;

    const newItem = await pool.query(
      `INSERT INTO pantry_items (user_id, name, quantity, unit, category)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [userId, name, quantity, unit, category || 'Other']
    );

    res.status(201).json(newItem.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updatePantryItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { name, quantity, unit, category } = req.body;

    const updatedItem = await pool.query(
      `UPDATE pantry_items
       SET name = $1, quantity = $2, unit = $3, category = $4, updated_at = CURRENT_TIMESTAMP
       WHERE id = $5 AND user_id = $6
       RETURNING *`,
      [name, quantity, unit, category, id, userId]
    );

    if (updatedItem.rows.length === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(updatedItem.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.removePantryItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const deletedItem = await pool.query(
      "DELETE FROM pantry_items WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, userId]
    );

    if (deletedItem.rows.length === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};