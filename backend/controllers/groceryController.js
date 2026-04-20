// controllers/groceryController.js
const pool = require("../db");

exports.getGroceryItems = async (req, res) => {
  try {
    const userId = req.user.id;
    const groceryItems = await pool.query(
      "SELECT * FROM grocery_items WHERE user_id = $1 ORDER BY purchased, category, name",
      [userId]
    );

    res.json(groceryItems.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.addGroceryItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, quantity, unit, category } = req.body;

    const newItem = await pool.query(
      `INSERT INTO grocery_items (user_id, name, quantity, unit, category)
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

exports.updateGroceryItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { name, quantity, unit, category, purchased } = req.body;

    const updatedItem = await pool.query(
      `UPDATE grocery_items
       SET name = $1, quantity = $2, unit = $3, category = $4, purchased = $5, updated_at = CURRENT_TIMESTAMP
       WHERE id = $6 AND user_id = $7
       RETURNING *`,
      [name, quantity, unit, category, purchased, id, userId]
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

exports.togglePurchased = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const currentItem = await pool.query(
      "SELECT purchased FROM grocery_items WHERE id = $1 AND user_id = $2",
      [id, userId]
    );

    if (currentItem.rows.length === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    const newPurchasedStatus = !currentItem.rows[0].purchased;

    const updatedItem = await pool.query(
      `UPDATE grocery_items
       SET purchased = $1, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2 AND user_id = $3
       RETURNING *`,
      [newPurchasedStatus, id, userId]
    );

    res.json(updatedItem.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.removeGroceryItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const deletedItem = await pool.query(
      "DELETE FROM grocery_items WHERE id = $1 AND user_id = $2 RETURNING *",
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

exports.clearGroceryList = async (req, res) => {
  try {
    const userId = req.user.id;

    await pool.query(
      "DELETE FROM grocery_items WHERE user_id = $1",
      [userId]
    );

    res.json({ message: "Grocery list cleared successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};