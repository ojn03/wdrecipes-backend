import model from "./model.js";

export const createRecipe = (recipe) => model.create(recipe);
export const findAllRecipes = () => model.find();
export const findRecipeById = (recipeId) => model.findById(recipeId);
export const findRecipeByName = (name) => model.find({ name });
export const deleteRecipe = (recipeId) => model.deleteOne({ _id: recipeId });
export const addComment = (recipeId, comment) => {
	model.updateOne({ _id: recipeId }, { $push: { comments: comment } });
};
export const deleteComment = (recipeId, commentId) => {
	model.updateOne(
		{ _id: recipeId },
		{ $pull: { comments: { _id: commentId } } }
	);
};
export const updateComment = (recipeId, commentId, comment) => {
    model.updateOne(
        { _id: recipeId, "comments._id": commentId },
        { $set: { "comments.$": comment } }
    );
};

export const addLike = (recipeId, userId) => {
	model.updateOne({ _id: recipeId }, { $addToSet: { likes: userId } });
};
export const deleteLike = (recipeId, userId) => {
	model.updateOne({ _id: recipeId }, { $pull: { likes: userId } });
};
