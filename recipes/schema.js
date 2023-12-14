import mongoose from "mongoose";
const recipeSchema = new mongoose.Schema(
	{
		apiID: String
	},
	{ collection: "Recipe" }
);


const model = mongoose.model("Recipe", recipeSchema);
export default model;
// comments: [
// 	{
// 		text: { type: String, trim: true },
// 		recipe:{	type: mongoose.Schema.Types.ObjectId, ref: "recipes" },
// 		author: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
// 		createdAt: {
// 			type: Date,
// 			default: Date.now()
// 		}
// 	}
// ]

//todo add likes shema
