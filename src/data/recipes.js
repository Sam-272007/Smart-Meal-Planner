export const recipes = [
  {
    id: "r1",
    title: "Avocado Chicken Salad",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400",
    prepTime: "15 min",
    calories: 450,
    diets: ["keto", "gluten-free", "dairy-free"],
    ingredients: [
      { name: "Chicken breast", amount: 200, unit: "g", category: "Meat" },
      { name: "Avocado", amount: 1, unit: "pc", category: "Produce" },
      { name: "Olive oil", amount: 1, unit: "tbsp", category: "Pantry" },
      { name: "Lemon juice", amount: 1, unit: "tbsp", category: "Pantry" }
    ],
    instructions: "Grill chicken, slice avocado, and mix with oil and lemon."
  },
  {
    id: "r2",
    title: "Vegan Lentil Curry",
    image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=400",
    prepTime: "30 min",
    calories: 380,
    diets: ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    ingredients: [
      { name: "Lentils", amount: 1, unit: "cup", category: "Pantry" },
      { name: "Coconut milk", amount: 1, unit: "can", category: "Pantry" },
      { name: "Curry powder", amount: 2, unit: "tbsp", category: "Pantry" },
      { name: "Spinach", amount: 2, unit: "cups", category: "Produce" }
    ],
    instructions: "Simmer lentils with coconut milk and curry. Stir in spinach at the end."
  },
  {
    id: "r3",
    title: "Keto Beef Stir-fry",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=400",
    prepTime: "20 min",
    calories: 520,
    diets: ["keto", "gluten-free", "dairy-free"],
    ingredients: [
      { name: "Beef strips", amount: 250, unit: "g", category: "Meat" },
      { name: "Broccoli", amount: 1, unit: "cup", category: "Produce" },
      { name: "Soy sauce (GF)", amount: 2, unit: "tbsp", category: "Pantry" },
      { name: "Sesame oil", amount: 1, unit: "tbsp", category: "Pantry" }
    ],
    instructions: "Stir fry beef and broccoli in sesame oil and soy sauce."
  },
  {
    id: "r4",
    title: "Overnight Oats",
    image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&q=80&w=400",
    prepTime: "5 min",
    calories: 320,
    diets: ["vegetarian", "vegan", "dairy-free"],
    ingredients: [
      { name: "Rolled oats", amount: 0.5, unit: "cup", category: "Pantry" },
      { name: "Almond milk", amount: 1, unit: "cup", category: "Dairy/Alt" },
      { name: "Chia seeds", amount: 1, unit: "tbsp", category: "Pantry" },
      { name: "Maple syrup", amount: 1, unit: "tbsp", category: "Pantry" }
    ],
    instructions: "Mix all ingredients and leave in fridge overnight."
  },
  {
    id: "r5",
    title: "Mediterranean Quinoa Bowl",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400",
    prepTime: "25 min",
    calories: 410,
    diets: ["vegetarian", "gluten-free"],
    ingredients: [
      { name: "Quinoa", amount: 0.5, unit: "cup", category: "Pantry" },
      { name: "Cherry tomatoes", amount: 1, unit: "cup", category: "Produce" },
      { name: "Feta cheese", amount: 50, unit: "g", category: "Dairy/Alt" },
      { name: "Cucumber", amount: 0.5, unit: "pc", category: "Produce" }
    ],
    instructions: "Cook quinoa and top with chopped veggies and feta."
  },
  {
    id: "r6",
    title: "Baked Salmon with Asparagus",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=400",
    prepTime: "25 min",
    calories: 480,
    diets: ["keto", "gluten-free", "pescatarian"],
    ingredients: [
      { name: "Salmon fillet", amount: 200, unit: "g", category: "Meat/Seafood" },
      { name: "Asparagus", amount: 1, unit: "bunch", category: "Produce" },
      { name: "Olive oil", amount: 1, unit: "tbsp", category: "Pantry" },
      { name: "Lemon", amount: 0.5, unit: "pc", category: "Produce" }
    ],
    instructions: "Bake salmon and asparagus at 400F for 15-20 mins."
  },
  {
    id: "r7",
    title: "Classic Pancakes",
    image: "https://images.unsplash.com/photo-1528207776546-384cb1119b90?auto=format&fit=crop&q=80&w=400",
    prepTime: "20 min",
    calories: 550,
    diets: ["vegetarian"],
    ingredients: [
      { name: "Flour", amount: 1, unit: "cup", category: "Pantry" },
      { name: "Milk", amount: 1, unit: "cup", category: "Dairy/Alt" },
      { name: "Egg", amount: 1, unit: "pc", category: "Dairy/Alt" },
      { name: "Butter", amount: 2, unit: "tbsp", category: "Dairy/Alt" }
    ],
    instructions: "Whisk ingredients and pour onto a hot griddle."
  },
  {
    id: "r8",
    title: "Tofu Scramble",
    image: "https://images.unsplash.com/photo-1601614457492-4afc28c89c89?auto=format&fit=crop&q=80&w=400",
    prepTime: "10 min",
    calories: 250,
    diets: ["vegan", "vegetarian", "gluten-free", "dairy-free", "keto"],
    ingredients: [
      { name: "Firm tofu", amount: 1, unit: "block", category: "Produce" },
      { name: "Turmeric", amount: 1, unit: "tsp", category: "Pantry" },
      { name: "Nutritional yeast", amount: 2, unit: "tbsp", category: "Pantry" },
      { name: "Black salt", amount: 0.5, unit: "tsp", category: "Pantry" }
    ],
    instructions: "Crumble tofu and sauté with spices until hot."
  }
];

export const DIET_OPTIONS = [
  { id: "vegan", label: "Vegan" },
  { id: "vegetarian", label: "Vegetarian" },
  { id: "keto", label: "Keto" },
  { id: "gluten-free", label: "Gluten Free" },
  { id: "dairy-free", label: "Dairy Free" },
  { id: "pescatarian", label: "Pescatarian" }
];
