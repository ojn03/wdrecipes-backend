import mongoose from "mongoose";
const commentScehma = new mongoose.Schema(
	{
		text: { type: String, trim: true },
		//todo ref to chef users only
		author: { type: mongoose.Schema.Types.ObjectId, ref: "Chef" },
		recipe: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" },
		createdAt: {
			type: Date,
			default: Date.now()
		}
	},
	{ collection: "Comment" }
);
