import mongoose from "mongoose";
const RecipeSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		description: String,
		last: String,
		ingredients: [
			{
				name: String,
				quantity: Number
			}
		],

		likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }] // use $addToSet to add to this array to avoid duplicates
	},
	{ collection: "users" }
);
export default userSchema;
