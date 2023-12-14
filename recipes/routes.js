import * as dao from "./dao.js";
export default function RecipeRoutes(app) {
	const createRecipe = async (req, res) => {
		const recipe = await dao.createRecipe(req.body);
		res.json(recipe);
	};
	const findAllRecipes = async (req, res) => {
		const recipes = await dao.findAllRecipes();
		res.json(recipes);
	};

	const findRecipeById = async (req, res) => {
		const recipe = await dao.findRecipeById(req.params.recipeId);
		res.json(recipe);
	};
	const deleteRecipe = async (req, res) => {
		const { recipeId } = req.params;
		const status = await dao.deleteRecipe(recipeId);
		res.json(status);
	};
	app.post("/api/recipes", createRecipe);
	app.get("/api/recipes", findAllRecipes);
	app.get("/api/recipes/:recipeId", findRecipeById);
	app.post("/api/recipes/:recipeId/comments", addComment);
	app.delete("/api/recipes/:recipeId", deleteRecipe);
	// app.put("/api/recipes/:recipeId/comments/:commentId", updateComment);
}
