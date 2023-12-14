import * as dao from "./dao.js";
export default function CommentRoutes(app) {
	const findAllComments = async (req, res) => {
		try {
			const comments = await dao.findAllComments();
			res.json(comments);
		} catch (error) {
			res.status(500).send(error);
		}
	};

	const findCommentById = async (req, res) => {
		try {
			const { commentId } = req.params;
			const comment = await dao.findCommentById(commentId);
			res.json(comment);
		} catch (error) {
			res.status(500).send(error);
		}
	};

	const findCommentsByAuthorId = async (req, res) => {
		try {
			const { authorId } = req.params;
			const comments = await dao.findCommentsByAuthorId(authorId);
			res.json(comments);
		} catch (error) {
			res.status(500).send(error);
		}
	};

	const findCommentsByRecipeId = async (req, res) => {
		try {
			const { recipeId } = req.params;
			const comments = await dao.findCommentsByRecipeId(recipeId);
			res.json(comments);
		} catch (error) {
			res.status(500).send(error);
		}
	};

	const addComment = async (req, res) => {
		try {
			const { text, authorId, recipeId } = req.body;
			const comment = { text, authorId, recipeId };
			const status = await dao.addComment(comment);
			res.json(status);
		} catch (error) {
			res.status(500).send(error);
		}
	};

	const updateComment = async (req, res) => {
		try {
			const { commentId } = req.params;
			const { text } = req.body;
			const status = await dao.updateComment(commentId, text);
			res.json(status);
		} catch (error) {
			res.status(500).send(error);
		}
	};

	const deleteComment = async (req, res) => {
		try {
			const { commentId } = req.params;
			const status = await dao.deleteComment(commentId);
			res.json(status);
		} catch (error) {
			res.status(500).send(error);
		}
	};

	const deleteCommentsByAuthorId = async (req, res) => {
		try {
			const { authorId } = req.params;
			const status = await dao.deleteCommentsByAuthorId(authorId);
			res.json(status);
		} catch (error) {
			res.status(500).send(error);
		}
	};

	const deleteCommentsByRecipeId = async (req, res) => {
		try {
			const { recipeId } = req.params;
			const status = await dao.deleteCommentsByRecipeId(recipeId);
			res.json(status);
		} catch (error) {
			res.status(500).send(error);
		}
	};

	app.get("/api/comments", findAllComments);
	app.get("/api/comments/:commentId", findCommentById);
	app.get("/api/comments/author/:authorId", findCommentsByAuthorId);
	app.post("/api/comments/recipe/:recipeId", findCommentsByRecipeId);

	app.post("/api/comments/", addComment);
	app.put("/api/comments/:commentId", updateComment);
	app.delete("/api/comments/:commentId", deleteComment);
	app.delete("/api/comments/author/:authorId", deleteCommentsByAuthorId);
	app.delete("/api/comments/recipe/:recipeId", deleteCommentsByRecipeId);
}
