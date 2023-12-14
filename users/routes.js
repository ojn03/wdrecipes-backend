import * as dao from "./dao.js";

function UserRoutes(app) {
	const addChef = async (req, res) => {
		try {
			const user = await dao.addChef(req.body);
			res.json(user);
		} catch (error) {
			res.status(500).send(error);
		}
	};
	const addBasicUser = async (req, res) => {
		try {
			const user = await dao.addBasicUser(req.body);
			res.json(user);
		} catch (error) {
			res.status(500).send(error);
		}
	};
	const deleteUser = async (req, res) => {
		try {
			const status = await dao.deleteUser(req.params.userId);
			res.json(status);
		} catch (error) {
			res.status(500).send(error);
		}
	};
	const findAllUsers = async (req, res) => {
		try {
			const users = await dao.findAllUsers();
			res.json(users);
		} catch (error) {
			res.status(500).send(error);
		}
	};
	const findAllChefs = async (req, res) => {
		try {
			const chefs = await dao.findAllChefs();
			res.json(chefs);
		} catch (error) {
			res.status(500).send(error);
		}
	};
	const findAllBasicUsers = async (req, res) => {
		try {
			const basicUsers = await dao.findAllBasicUsers();
			res.json(basicUsers);
		} catch (error) {
			res.status(500).send(error);
		}
	};

	const findUserById = async (req, res) => {
		try {
			const user = await dao.findUserById(req.params.userId);
			res.json(user);
		} catch (error) {
			res.status(500).send(error);
		}
	};
	const updateUser = async (req, res) => {
		try {
			const { userId } = req.params;
			const status = await dao.updateUser(userId, req.body);
			const currentUser = await dao.findUserById(userId);
			req.session["currentUser"] = currentUser;
			res.json(status);
		} catch (error) {
			res.status(500).send(error);
		}
	};

	const updateChef = async (req, res) => {
		try {
			const { chefId } = req.params;
			const status = await dao.updateChef(chefId, req.body);
			res.json(status);
		} catch (error) {
			res.status(500).send(error);
		}
	};

	const updateBasicUser = async (req, res) => {
		try {
			const { basicUserId } = req.params;
			const status = await dao.updateBasicUser(basicUserId, req.body);
			res.json(status);
		} catch (error) {
			res.status(500).send(error);
		}
	};

	const signup = async (req, res) => {
		try {
			const user = await dao.findUserByUsername(req.body.username);
			if (user) {
				res.status(400).json({ message: "Username already taken" });
			}

			const { type } = req.body;
			if (type === "chef") {
				const chef = await dao.addChef(req.body);
				req.session["currentUser"] = chef;
				res.json(chef);
			} else {
				const basic = await dao.addBasicUser(req.body);
				req.session["currentUser"] = basic;
				res.json(basic);
			}
		} catch (error) {
			res.status(500).send(error);
		}
	};

	const signin = async (req, res) => {
		try {
			const { username, password } = req.body;
			const currentUser = await dao.findUserByCredentials(username, password);
			if (!currentUser) {
				res.status(400).json({ message: "Invalid credentials" });
			} else {
				req.session["currentUser"] = currentUser;
				res.json(currentUser);
			}
		} catch (error) {
			res.status(500).send(error);
		}
	};
	const signout = (req, res) => {
		try {
			req.session.destroy();
			res.json(200);
		} catch (error) {
			res.status(500).send(error);
		}
	};
	const account = async (req, res) => {
		try {
			res.json(req.session["currentUser"]);
		} catch (error) {
			res.status(500).send(error);
		}
	};
	const follow = async (req, res) => {
		try {
			const { userId } = req.params;
			const currentUser = { _id: "657ab7496cd755a74d001dad" }; //req.session;
			// console.log(currentUser);
			const status = await dao.follow(currentUser._id, userId);

			// add to following
			res.json(status);
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	};
	const unfollow = async (req, res) => {
		try {
			const { userId } = req.params;
			const { currentUser } = req.session;

			const status = await dao.unfollow(currentUser._id, userId);
			// remove from following
			res.json(status);
		} catch (error) {
			res.status(500).send(error);
		}
	};

	const findFollowing = async (req, res) => {
		try {
			const { userId } = req.params;
			const users = await dao.findAllFollowing(userId);
			res.json(users);
		} catch (error) {
			res.status(500).send(error);
		}
	};
	const findFollowers = async (req, res) => {
		try {
			const { userId } = req.params;
			const users = await dao.findAllFollowers(userId);
			res.json(users);
		} catch (error) {
			res.status(500).send(error);
		}
	};

	app.post("/api/users/chef", addChef);
	app.post("/api/users/basicUser", addBasicUser);
	app.get("/api/users", findAllUsers);
	app.get("/api/users/chef", findAllChefs);
	app.get("/api/users/basicUser", findAllBasicUsers);
	app.get("/api/users/:userId", findUserById);
	app.put("/api/users/:userId", updateUser);
	app.put("/api/users/chef/:chefId", updateChef);
	app.put("/api/users/basicUser/:basicUserId", updateBasicUser);
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
