import * as dao from "./dao.js";

function UserRoutes(app) {
	const addChef = async (req, res) => {
		const user = await dao.addChef(req.body);
		res.json(user);
	};
	const addBasicUser = async (req, res) => {
		const user = await dao.addBasicUser(req.body);
		res.json(user);
	};
	const deleteUser = async (req, res) => {
		const status = await dao.deleteUser(req.params.userId);
		res.json(status);
	};
	const findAllUsers = async (req, res) => {
		const users = await dao.findAllUsers();
		res.json(users);
	};
	const findAllChefs = async (req, res) => {
		const chefs = await dao.findAllChefs();
		res.json(chefs);
	};
	const findAllBasicUsers = async (req, res) => {
		const basicUsers = await dao.findAllBasicUsers();
		res.json(basicUsers);
	};

	const findUserById = async (req, res) => {
		const user = await dao.findUserById(req.params.userId);
		res.json(user);
	};
	const updateUser = async (req, res) => {
		const { userId } = req.params;
		const status = await dao.updateUser(userId, req.body);
		const currentUser = await dao.findUserById(userId);
		req.session["currentUser"] = currentUser;
		res.json(status);
	};
	const signup = async (req, res) => {
		const user = await dao.findUserByUsername(req.body.username);
		if (user) {
			res.status(400).json({ message: "Username already taken" });
		}
		const currentUser = await dao.addUser(req.body);
		req.session["currentUser"] = currentUser;
		res.json(currentUser);
	};
	const signin = async (req, res) => {
		const { username, password } = req.body;
		const currentUser = await dao.findUserByCredentials(username, password);
		req.session["currentUser"] = currentUser;
		res.json(currentUser);
	};
	const signout = (req, res) => {
		req.session.destroy();
		res.json(200);
	};
	const account = async (req, res) => {
		res.json(req.session["currentUser"]);
	};
	const follow = async (req, res) => {
		const { userId } = req.params;
		const { currentUser } = req.session;
		const status = await dao.follow(currentUser._id, userId);
		// add to following
		res.json(status);
	};
	const unfollow = async (req, res) => {
		const { userId } = req.params;
		const { currentUser } = req.session;
		const status = await dao.unfollow(currentUser._id, userId);
		// remove from following
		res.json(status);
	};

	const findFollowing = async (req, res) => {
		const { userId } = req.params;
		const users = await dao.findAllFollowing(userId);
		res.json(users);
	};
	const findFollowers = async (req, res) => {
		const { userId } = req.params;
		const users = await dao.findAllFollowers(userId);
		res.json(users);
	};

	app.post("/api/users/chef", addChef);
	app.post("/api/users/basicUser", addBasicUser);
	app.get("/api/users", findAllUsers); 
	app.get("/api/users/chef", findAllChefs); 
	app.get("/api/users/basicUser", findAllBasicUsers); 
	app.get("/api/users/:userId", findUserById);
	app.put("/api/users/:userId", updateUser); 
	app.delete("/api/users/:userId", deleteUser); 
	app.post("/api/users/signup", signup);
	app.post("/api/users/signin", signin);
	app.post("/api/users/signout", signout);
	app.post("/api/users/account", account);
	app.post("/api/users/:userId/follow", follow);
	app.post("/api/users/:userId/unfollow", unfollow);
	app.get("/api/users/:userId/following", findFollowing);
	app.get("/api/users/:userId/followers", findFollowers);
}
export default UserRoutes;
