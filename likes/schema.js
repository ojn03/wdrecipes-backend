import mongoose from "mongoose";
const likeSchema = new mongoose.Schema(
	{
		text: { type: String, trim: true },
		//todo ref to chef users only
		author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		recipe: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" },
		createdAt: {
			type: Date,
			default: Date.now()
		}
	},
	{ collection: "Like" }
);

const model = mongoose.model("Like", likeSchema);
export default model;