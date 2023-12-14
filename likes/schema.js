import mongoose from "mongoose";
const likeSchema = new mongoose.Schema(
	{
		authorId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true
		},
		recipeId: { type: String, required: true },
		createdAt: {
			type: Date,
			default: Date.now()
		}
	},
	{ collection: "Like", 
	// _id: { recipeId: 1, authorId: 1 }
 }
);


const model = mongoose.model("Like", likeSchema);
export default model;
