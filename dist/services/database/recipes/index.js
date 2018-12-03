"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { RECIPES } = require("./constants");
const __1 = __importDefault(require("../"));
var MealTypes;
(function (MealTypes) {
    MealTypes["breakfast"] = "Breakfast";
    MealTypes["snack"] = "Snack";
    MealTypes["entree"] = "Entree";
    MealTypes["side"] = "Side Dish";
    MealTypes["dessert"] = "Dessert";
})(MealTypes || (MealTypes = {}));
var MeasurementTypes;
(function (MeasurementTypes) {
    MeasurementTypes["unit"] = "unit";
    MeasurementTypes["pinch"] = "pinch";
    MeasurementTypes["dash"] = "dash";
    MeasurementTypes["tsp"] = "tsp";
    MeasurementTypes["tbsp"] = "tbsp";
    MeasurementTypes["oz"] = "oz";
    MeasurementTypes["floz"] = "floz";
    MeasurementTypes["cup"] = "cup";
    MeasurementTypes["pint"] = "pint";
    MeasurementTypes["quart"] = "quart";
    MeasurementTypes["gallon"] = "gallon";
    MeasurementTypes["liter"] = "liter";
    MeasurementTypes["pound"] = "pound";
    MeasurementTypes["milliliter"] = "mL";
})(MeasurementTypes || (MeasurementTypes = {}));
const exportReturns = {
    addRecipe: (recipe) => { },
    getRecipes: () => { }
};
const cleanRecipeData = (recipeData) => {
    return JSON.parse(recipeData);
};
exportReturns.addRecipe = (recipe) => {
    __1.default.setValue(RECIPES, recipe.title, JSON.stringify(recipe));
};
exportReturns.getRecipes = () => __1.default.getValues(RECIPES, cleanRecipeData);
module.exports = exportReturns;
