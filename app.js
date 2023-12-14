import UserRoutes from "./users/routes.js";
import LikeRoutes from "./likes/routes.js";
// import RecipeRoutes from "./recipes/routes.js";
import CommentRoutes from "./comments/routes.js";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import session from "express-session";
import express from "express";

const CONNECTION_STRING =
	process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/wdrecipes";
mongoose.connect(CONNECTION_STRING);
const PORT = process.env.PORT || 4000;
const app = express();
app.use(
	cors({
		credentials: true,
		origin: process.env.FRONTEND_URL
	})
);
const sessionOptions = {
	secret: "any string",
	resave: false,
	saveUninitialized: false
};
if (process.env.NODE_ENV !== "development") {
	sessionOptions.proxy = true;
	sessionOptions.cookie = {
		sameSite: "none",
		secure: true
	};
}
app.use(session(sessionOptions));
app.use(express.json());
app.get("/", (req, res) => res.send("Hello World!"));
UserRoutes(app);
LikeRoutes(app);
CommentRoutes(app);

// RecipeRoutes(app);

app.listen(PORT);
