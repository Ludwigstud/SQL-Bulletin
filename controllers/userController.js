import { createUser, getUserChannels } from "../models/userModel.js";

export const addUser = async (req, res) => {
	const { name, email } = req.body;
	try {
		const user = await createUser(name, email);
		res.json(user);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const listUserChannels = async (req, res) => {
	const user_id = req.params.id;
	try {
		const channels = await getUserChannels(user_id);
		res.json(channels);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
