// routes/mealPlans.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { getMealPlans, addMeal, removeMeal } = require("../controllers/mealPlanController");

// All routes require authentication
router.use(auth);

// GET /api/meal-plans
router.get("/", getMealPlans);

// POST /api/meal-plans
router.post("/", addMeal);

// DELETE /api/meal-plans/:day/:mealType
router.delete("/:day/:mealType", removeMeal);

module.exports = router;