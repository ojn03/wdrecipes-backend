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

		// can only follow Chefs
		following: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chef" }]
	},
	baseOptions
);

const UserModel = mongoose.model("User", baseUserSchema);

const BasicUser = UserModel.discriminator(
	"Basic",
	new mongoose.Schema({ experience: { type: Number, required: true } })
);

const Chef = UserModel.discriminator(
	"Chef",
	new mongoose.Schema({
		restaurant: { type: String, required: true },
		followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
	})
);

export { UserModel, BasicUser, Chef };
