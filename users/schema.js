import mongoose from "mongoose";

const baseOptions = {
	discriminatorKey: "type",
	collection: "User"
};

const baseUserSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		first: String,
		last: String,

		// can only follow chefs
		following: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chef" }]
	},
	baseOptions
);

const UserModel = mongoose.model("User", baseUserSchema);

const basicUser = UserModel.discriminator(
	"Basic",
	new mongoose.Schema({ experience: Number })
);

const chef = UserModel.discriminator(
	"Chef",
	new mongoose.Schema({
		restaurant: String,
		followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
	})
);

export  {UserModel, basicUser, chef};


