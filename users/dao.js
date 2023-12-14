import { UserModel, Chef, BasicUser } from "./schema.js";
// export const addUser = (user) => UserModel.create(user);
export const addChef = (chef) => Chef.create(chef);
export const addBasicUser = (basicUser) => BasicUser.create(basicUser);

export const findAllUsers = () => UserModel.find();
export const findAllChefs = () => Chef.find();
export const findAllBasicUsers = () => BasicUser.find();
import mongoose from "mongoose";

// export const findChefById = (chefId) => Chef.findById(chefId);
// export const findBasicUserById = (basicUserId) =>
// 	BasicUser.findById(basicUserId);

// export const findChefByUsername = (username) => Chef.find({ username });
// export const findBasicUserByUsername = (username) =>
// 	BasicUser.find({ username });

export const updateBasicUser = (basicUserId, basicUser) =>
	BasicUser.updateOne({ _id: basicUserId }, { $set: basicUser }).then((error) => console.log(error));

export const updateChef = (chefId, chef) =>
	Chef.updateOne({ _id: chefId }, { $set: chef }).then((error) => console.log(error));


export const findUserById = (userId) => UserModel.findById(userId);

export const findUserByUsername = (username) =>
	UserModel.findOne({ username: username });

export const findUserByCredentials = (username, password) =>
	UserModel.findOne({ username, password });

export const updateUser = (userId, user) =>
	UserModel.updateOne({ _id: userId }, { $set: user }).then((error) => console.log(error));

//cascade delete all references to user
export const deleteUser = (userId) => UserModel.deleteOne({ _id: userId });

export const follow = (userId, followId) => {
userId = new mongoose.Types.ObjectId(userId);
followId = new mongoose.Types.ObjectId(followId);

	UserModel.updateOne({ _id: userId }, { $addToSet: { following: followId } }).then((error) => console.log(error));;
	Chef.updateOne({ _id: followId }, { $addToSet: { followers: userId } }).then((error) => console.log(error));
};

export const unfollow = (userId, unfollowId) => {
	UserModel.updateOne({ _id: userId }, { $pull: { following: unfollowId } }).then((error) => console.log(error));
	Chef.updateOne({ _id: unfollowId }, { $pull: { followers: userId } }).then((error) => console.log(error));
};

export const findAllFollowing = (userId) =>
	UserModel.findById(userId)
		.populate("following")
		.then((user) => user.following);

export const findAllFollowers = (userId) =>
	Chef.findById(userId)
		.populate("followers")
		.then((user) => user.followers);
