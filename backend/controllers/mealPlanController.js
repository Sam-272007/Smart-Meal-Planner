// controllers/mealPlanController.js
const pool = require("../db");

exports.getMealPlans = async (req, res) => {
  try {
    const userId = req.user.id;
    const mealPlans = await pool.query(
      "SELECT * FROM meal_plans WHERE user_id = $1 ORDER BY day, meal_type",
      [userId]
    );

    // Group by day
    const groupedPlans = mealPlans.rows.reduce((acc, plan) => {
      if (!acc[plan.day]) acc[plan.day] = {};
      acc[plan.day][plan.meal_type] = plan.recipe_data;
      return acc;
    }, {});

    res.json(groupedPlans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.addMeal = async (req, res) => {
  try {
    const userId = req.user.id;
    const { day, mealType, recipe } = req.body;

    await pool.query(
      `INSERT INTO meal_plans (user_id, day, meal_type, recipe_data)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (user_id, day, meal_type)
       DO UPDATE SET recipe_data = EXCLUDED.recipe_data, updated_at = CURRENT_TIMESTAMP`,
      [userId, day, mealType, JSON.stringify(recipe)]
    );

    res.json({ message: "Meal added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.removeMeal = async (req, res) => {
  try {
    const userId = req.user.id;
    const { day, mealType } = req.params;

    await pool.query(
      "DELETE FROM meal_plans WHERE user_id = $1 AND day = $2 AND meal_type = $3",
      [userId, day, mealType]
    );

    res.json({ message: "Meal removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};