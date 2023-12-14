import * as dao from "./dao.js";
export default function LikeRoutes(app) {

	const findAllLikes = async (req, res) => {
		try {
			const likes = await dao.findAllLikes();
			res.json(likes);
		} catch (error) {
			res.status(500).send(error);
		}
	}; 

	const findLikeById = async (req, res) => {
		try {
			const { likeId } = req.params;
			const like = await dao.findLikeById(likeId);
			res.json(like);
		} catch (error) {
			res.status(500).send(error);
		}
	}; //

	const findLikesByAuthorId = async (req, res) => {
		try {
			const { authorId } = req.params;
			const likes = await dao.findLikesByAuthorId(authorId);
			res.json(likes);
		} catch (error) {
			res.status(500).send(error);
		}
	}; //

	const findLikesByRecipeId = async (req, res) => {
		try {
			const { recipeId } = req.params;
			const likes = await dao.findLikesByRecipeId(recipeId);
			res.json(likes);
		} catch (error) {
			res.status(500).send(error);
		}
	}; //

	const addLike = async (req, res) => {
		try {
			const { recipeId, authorId } = req.body;
			const like = { text, authorId, recipeId };
			const status = await dao.addLike(like);
			res.json(status);
		} catch (error) {
			res.status(500).send(error);
		}
	}; 

	const deleteLike = async (req, res) => {
		try {
			const { likeId } = req.params;
			const status = await dao.deleteLike(likeId);
			res.json(status);
		} catch (error) {
			res.status(500).send(error);
		}
	}; //

	const deleteLikesByAuthorId = async (req, res) => {
		try {
			const { authorId } = req.params;
			const status = await dao.deleteLikesByAuthorId(authorId);
			res.json(status);
		} catch (error) {
			res.status(500).send(error);
		}
	};

	const deleteLikesByRecipeId = async (req, res) => {
		try {
			const { recipeId } = req.params;
			const status = await dao.deleteLikesByRecipeId(recipeId);
			res.json(status);
		} catch (error) {
			res.status(500).send(error);
		}
	};

	app.get("/api/likes", findAllLikes);
	app.get("/api/likes/:likeId", findLikeById);
	app.get("/api/likes/author/:authorId", findLikesByAuthorId);
    app.get("/api/likes/recipe/:recipeId", findLikesByRecipeId);
	
    app.post("/api/likes/", addLike);

	app.delete("/api/likes/:likeId", deleteLike);
	app.delete("/api/likes/author/:authorId", deleteLikesByAuthorId);
	app.delete("/api/likes/recipe/:recipeId", deleteLikesByRecipeId);
}
