import * as dao from "./dao.js";
export default function CommentRoutes(app) {

    const findAllComments = async (req, res) => {
        const comments = await dao.findAllComments();
        res.json(comments);
    }//

    const findCommentById = async (req, res) => {
        const { commentId } = req.params;
        const comment = await dao.findCommentById(commentId);
        res.json(comment);
    }//

    const findCommentsByAuthorId = async (req, res) => {
        const { authorId } = req.params;
        const comments = await dao.findCommentsByAuthorId(authorId);
        res.json(comments);
    }//

    const findCommentsByRecipeId = async (req, res) => {
        const { recipeId } = req.params;
        const comments = await dao.findCommentsByRecipeId(recipeId);
        res.json(comments);
    }//

    const addComment = async (req, res) => {
        const { recipeId } = req.params;
        const { text, authorId } = req.body;
        const comment = { text, authorId, recipeId };
        const status = await dao.addComment(comment);
        res.json(status);
    }; //

    const updateComment = async (req, res) => {
        const { commentId } = req.params;
        const { text } = req.body;
        const status = await dao.updateComment( commentId, text);
        res.json(status);
    };//

    const deleteComment = async (req, res) => {
        const { commentId } = req.params;
        const status = await dao.deleteComment(commentId);
        res.json(status);
    };//

    const deleteCommentsByAuthorId = async (req, res) => {
        const { authorId } = req.params;
        const status = await dao.deleteCommentsByAuthorId(authorId);
        res.json(status);
    }

    const deleteCommentsByRecipeId = async (req, res) => {
        const { recipeId } = req.params;
        const status = await dao.deleteCommentsByRecipeId(recipeId);
        res.json(status);
    }

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