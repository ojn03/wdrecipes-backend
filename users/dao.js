import model from "./model.js";
export const createUser = (user) => model.create(user);
export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) =>
	model.findOne({ username: username });
export const findUserByCredentials = (username, password) =>
	model.findOne({ username, password });
export const updateUser = (userId, user) =>
	model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });
export const follow = (userId, followId) =>
	model.updateOne({ _id: userId }, { $addToSet: { following: followId } });
export const unfollow = (userId, unfollowId) =>
	model.updateOne({ _id: userId }, { $pull: { following: unfollowId } });
export const likeRecipe = (userId, recipeId) =>
	model.updateOne({ _id: userId }, { $addToSet: { likedRecipes: recipeId } });
export const unlikeRecipe = (userId, recipeId) =>
	model.updateOne({ _id: userId }, { $pull: { likedRecipes: recipeId } });
export const findAllLikedRecipes = (userId) =>
	model
		.findById(userId)
		.populate("likedRecipes")
		.then((user) => user.likedRecipes);
export const findAllFollowing = (userId) =>
	model
		.findById(userId)
		.populate("following")
		.then((user) => user.following);
export const findAllFollowers = (userId) =>
	model
		.findById(userId)
		.populate("followers")
		.then((user) => user.followers);
