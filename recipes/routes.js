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

	//maybe separate comments into separate routes
	const findRecipeById = async (req, res) => {
		const recipe = await dao.findRecipeById(req.params.recipeId);
		res.json(recipe);
	};
	const addComment = async (req, res) => {
		const { recipeId } = req.params;
		const { text, author } = req.body;
		const status = await dao.addComment(recipeId, text, author);
		res.json(status);
	};

	const updateComment = async (req, res) => {
		const { recipeId, commentId } = req.params;
		const { comment } = req.body;
		const status = await dao.updateComment(recipeId, commentId, comment);
		res.json(status);
	};

	const deleteComment = async (req, res) => {
		const { recipeId, commentId } = req.params;
		const status = await dao.deleteComment(recipeId, commentId);
		res.json(status);
	};
	const addLike = async (req, res) => {
		const { recipeId } = req.params;
		const userId = "6578fd6df3d299e33a36c73f"; //req.session.currentUser;
		const status = await dao.addLike(recipeId, userId);
		res.json(status);
	};
	const deleteLike = async (req, res) => {
		const { recipeId } = req.params;
		const userId = "6578fd6df3d299e33a36c73f"; //req.session.currentUser;
		const status = await dao.deleteLike(recipeId, userId);
		res.json(status);
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
	app.delete("/api/recipes/:recipeId/comments/:commentId", deleteComment);
	app.post("/api/recipes/:recipeId/likes", addLike);
	app.delete("/api/recipes/:recipeId/likes", deleteLike);
	app.delete("/api/recipes/:recipeId", deleteRecipe);
	// app.put("/api/recipes/:recipeId/comments/:commentId", updateComment);
}
