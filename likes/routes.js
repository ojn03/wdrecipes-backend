import * as dao from "./dao.js";
export default function LikeRoutes(app) {
	const findAllLikes = async (req, res) => {
		const likes = await dao.findAllLikes();
		res.json(likes);
	}; //

	const findLikeById = async (req, res) => {
		const { likeId } = req.params;
		const like = await dao.findLikeById(likeId);
		res.json(like);
	}; //

	const findLikesByAuthorId = async (req, res) => {
		const { authorId } = req.params;
		const likes = await dao.findLikesByAuthorId(authorId);
		res.json(likes);
	}; //

	const findLikesByRecipeId = async (req, res) => {
		const { recipeId } = req.params;
		const likes = await dao.findLikesByRecipeId(recipeId);
		res.json(likes);
	}; //

	const addLike = async (req, res) => {
		const { recipeId } = req.params;
		const { text, authorId } = req.body;
		const like = { text, authorId, recipeId };
		const status = await dao.addLike(like);
		res.json(status);
	}; //

	const deleteLike = async (req, res) => {
		const { likeId } = req.params;
		const status = await dao.deleteLike(likeId);
		res.json(status);
	}; //

	const deleteLikesByAuthorId = async (req, res) => {
		const { authorId } = req.params;
		const status = await dao.deleteLikesByAuthorId(authorId);
		res.json(status);
	};

	const deleteLikesByRecipeId = async (req, res) => {
		const { recipeId } = req.params;
		const status = await dao.deleteLikesByRecipeId(recipeId);
		res.json(status);
	};

	app.get("/api/likes", findAllLikes);
	app.get("/api/likes/:likeId", findLikeById);
	app.get("/api/likes/author/:authorId", findLikesByAuthorId);

	app.post("/api/likes/recipe/:recipeId", findLikesByRecipeId);
	app.post("/api/likes/", addLike);

	app.delete("/api/likes/:likeId", deleteLike);
	app.delete("/api/likes/author/:authorId", deleteLikesByAuthorId);
	app.delete("/api/likes/recipe/:recipeId", deleteLikesByRecipeId);
}
