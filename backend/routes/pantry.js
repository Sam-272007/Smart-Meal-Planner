// routes/pantry.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getPantryItems,
  addPantryItem,
  updatePantryItem,
  removePantryItem
} = require("../controllers/pantryController");

// All routes require authentication
router.use(auth);

// GET /api/pantry
router.get("/", getPantryItems);

// POST /api/pantry
router.post("/", addPantryItem);

// PUT /api/pantry/:id
router.put("/:id", updatePantryItem);

// DELETE /api/pantry/:id
router.delete("/:id", removePantryItem);

module.exports = router;