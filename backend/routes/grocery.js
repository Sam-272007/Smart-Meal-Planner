// routes/grocery.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getGroceryItems,
  addGroceryItem,
  updateGroceryItem,
  togglePurchased,
  removeGroceryItem,
  clearGroceryList
} = require("../controllers/groceryController");

// All routes require authentication
router.use(auth);

// GET /api/grocery
router.get("/", getGroceryItems);

// POST /api/grocery
router.post("/", addGroceryItem);

// PUT /api/grocery/:id
router.put("/:id", updateGroceryItem);

// PATCH /api/grocery/:id/toggle
router.patch("/:id/toggle", togglePurchased);

// DELETE /api/grocery/:id
router.delete("/:id", removeGroceryItem);

// DELETE /api/grocery
router.delete("/", clearGroceryList);

module.exports = router;