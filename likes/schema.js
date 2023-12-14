import mongoose from "mongoose";
const likeSchema = new mongoose.Schema(
	{
		authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		recipeId: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" },
		createdAt: {
			type: Date,
			default: Date.now()
		}
	},
	{ collection: "Like" }
);

const model = mongoose.model("Like", likeSchema);
export default model;