import mongoose from "mongoose";
const commentSchema = new mongoose.Schema(
	{
		text: { type: String, trim: true },
		//todo ref to chef users only
		authorId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Chef",
			required: true
		},
		recipeId: { type: String, required: true },
		createdAt: {
			type: Date,
			default: Date.now()
		}
	},
	{ collection: "Comment" }
);
const model = mongoose.model("Comment", commentSchema);
export default model;
