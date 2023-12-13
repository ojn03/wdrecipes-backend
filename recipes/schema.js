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

		likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
		createdAt: {
			type: Date,
			default: Date.now()
		},
		comments: [
			{
				text: { type: String, trim: true },
				author: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
				createdAt: {
					type: Date,
					default: Date.now()
				}
			}
		],
	},
	{ collection: "recipes" }
);
export default recipeSchema;
