import model from "./schema.js";

export const addComment = (comment) => model.create(comment); //
export const findAllComments = () => model.find(); //
export const findCommentById = (commentId) => model.findById(commentId);//
export const findCommentsByAuthorId = (authorId) => model.find({ authorId });//
export const findCommentsByRecipeId = (recipeId) => model.find({ recipeId });//
export const deleteComment = (commentId) => model.deleteOne({ _id: commentId });//
export const updateComment = (commentId, text) =>
	model.updateOne({ _id: commentId }, { text }).then((error) => console.log(error)); //$where({ _id: commentId }, { $set: comment }); // consider using updateOne instead
export const deleteCommentsByAuthorId = (authorId) =>
	model.deleteMany({ authorId });
export const deleteCommentsByRecipeId = (recipeId) =>
	model.deleteMany({ recipeId });
