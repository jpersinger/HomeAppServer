const { RECIPES } = require("./constants");
import BlueBirdPromise from "bluebird";
import DatabaseHandler from "../";

interface Recipe {
  title: string;
  mealType: MealTypes;
  cookTime: number; // in hours
  ingredients: Ingredient[];
  instructions: string[];
}

interface Ingredient {
  name: string;
  amount: number;
  measurementType: MeasurementTypes;
  extraInformation?: string;
}

enum MealTypes {
  breakfast = "Breakfast",
  snack = "Snack",
  entree = "Entree",
  side = "Side Dish",
  dessert = "Dessert"
}

enum MeasurementTypes {
  unit = "unit",
  pinch = "pinch", // about 1/8 tsp
  dash = "dash", // about 1/8 tsp
  tsp = "tsp",
  tbsp = "tbsp",
  oz = "oz",
  floz = "floz",
  cup = "cup",
  pint = "pint",
  quart = "quart",
  gallon = "gallon",
  liter = "liter",
  pound = "pound",
  milliliter = "mL"
}

interface ExportReturns {
  addRecipe: (recipe: Recipe) => void;
  getRecipes: Function;
}

const exportReturns: ExportReturns = {
  addRecipe: (recipe: Recipe): void => {},
  getRecipes: () => {}
};

const cleanRecipeData = (recipeData: any): any => {
  return JSON.parse(recipeData);
};

exportReturns.addRecipe = (recipe: Recipe) => {
  DatabaseHandler.setHashValue(RECIPES, recipe.title, JSON.stringify(recipe));
};

exportReturns.getRecipes = (): BlueBirdPromise<any[]> =>
  DatabaseHandler.getHashValues(RECIPES);

module.exports = exportReturns;
