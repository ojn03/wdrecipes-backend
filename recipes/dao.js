import mongoose from "mongoose";
import model from "./model.js";

export const createRecipe = (recipe) => model.create(recipe);
export const findAllRecipes = () => model.find();
export const findRecipeById = (recipeId) => model.findById(recipeId);
export const findRecipeByName = (name) => model.find({ name });
export const deleteRecipe = (recipeId) => model.deleteOne({ _id: recipeId });
export const addComment = (recipeId, text, author) => {
	author = new mongoose.Types.ObjectId(author);
	const comment = { text, author };
	model
		.updateOne({ _id: recipeId }, { $push: { comments: comment } })
		.then((error) => console.log(error));
};
export const deleteComment = (recipeId, commentId) => {
	model.updateOne(
		{ _id: recipeId },
		{ $pull: { comments: { _id: commentId } } }
	).then((error) => console.log(error));
};
export const updateComment = (recipeId, commentId, comment) => {
	model.updateOne(
		{ _id: recipeId, "comments._id": commentId },
		{ $set: { "comments.$": comment } }
	).then((error) => console.log(error));
};

export const addLike = (recipeId, userId) => {
    userId = new mongoose.Types.ObjectId(userId);
	model.updateOne({ _id: recipeId }, { $addToSet: { likes: userId } }).then((error) => 
    console.log(error));
};
export const deleteLike = (recipeId, userId) => {
    userId = new mongoose.Types.ObjectId(userId);
    console.log(recipeId, userId);
	model.updateOne({ _id: recipeId }, { $pull: { likes: userId } }).then((error) => console.log(error));
};
