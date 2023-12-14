import model from "./schema.js";

export const createRecipe = (recipe) => model.create(recipe);
export const findAllRecipes = () => model.find();
export const deleteRecipe = (recipeId) => model.deleteOne({ recipeId });

