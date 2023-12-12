import mongoose from "mongoose";
const recipeSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		description: String,
		ingredients: [
			{
				name: String,
				quantity: Number
			}
		],

		likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }], // use $addToSet to add to this array to avoid duplicates
		comments: [
			{
				
				text: { type: String, trim: true },
				author: { type: mongoose.Schema.Types.ObjectId, ref: "users" }
			}
		]
	},
	{ collection: "recipes" }
);
export default recipeSchema;
