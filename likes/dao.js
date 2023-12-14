import model from "./schema.js";

export const addLike = (like) => model.create(like); //
export const findAllLikes = () => model.find(); //
export const findLikeById = (likeId) => model.findById(likeId);//
export const findLikesByAuthorId = (authorId) => model.find({ authorId });//
export const findLikesByRecipeId = (recipeId) => model.find({ recipeId });//
export const deleteLike = (likeId) => model.deleteOne({ _id: likeId });//

export const deleteLikesByAuthorId = (authorId) =>
	model.deleteMany({ authorId });
export const deleteLikesByRecipeId = (recipeId) =>
	model.deleteMany({ recipeId });
