import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		first: String,
		last: String,
		
		// email: String,
		// dob: Date,
		likedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "recipes" }], // use $addToSet to add to arrays to avoid duplicates
		followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
		following: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],

		createdAt: {
			type: Date,
			default: Date.now()
		},
	},
	{ collection: "users" }
);
export default userSchema;
