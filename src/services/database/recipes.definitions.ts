export interface Recipe {
  title: string;
  mealType: MealTypes;
  cookTime: number; // in hours
  ingredients: Ingredient[];
  instructions: string[];
}

export interface Ingredient {
  name: string;
  amount: number;
  measurementType: MeasurementTypes;
  extraInformation?: string;
}

export enum MealTypes {
  breakfast = "Breakfast",
  snack = "Snack",
  entree = "Entree",
  side = "Side Dish",
  dessert = "Dessert"
}

export enum MeasurementTypes {
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
